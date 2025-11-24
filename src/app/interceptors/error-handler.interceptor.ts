import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AlertasService } from '../services/alertas.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(
    private alertasService: AlertasService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      // Reintentar automáticamente en caso de error de red (máximo 2 reintentos)
      retry({
        count: 1,
        delay: (error) => {
          // Solo reintentar en errores de red (0, 408, 502, 503, 504)
          if (error.status === 0 || error.status === 408 ||
              error.status === 502 || error.status === 503 ||
              error.status === 504) {
            return throwError(() => error);
          }
          // No reintentar otros errores
          throw error;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        let showAlert = true;

        if (error.error instanceof ErrorEvent) {
          // Error del lado del cliente
          errorMessage = `Error del cliente: ${error.error.message}`;
          console.error('Error del cliente:', error.error);
        } else {
          // Error del lado del servidor
          switch (error.status) {
            case 0:
              errorMessage = 'No se pudo conectar con el servidor. Verifica tu conexión a internet.';
              console.error('Error de conexión:', error);
              break;

            case 400:
              // Bad Request - Errores de validación
              errorMessage = error.error?.message || 'Datos inválidos. Por favor verifica la información enviada.';
              console.warn('Error de validación (400):', error.error);

              // Mostrar detalles de validación si existen
              if (error.error?.errors && Array.isArray(error.error.errors)) {
                const validationErrors = error.error.errors.map((e: any) => e.message || e).join('\n');
                errorMessage = `Errores de validación:\n${validationErrors}`;
              }
              break;

            case 401:
              // Unauthorized - Token inválido o expirado
              console.warn('🔴 ERROR 401 - URL:', error.url);

              // NO desconectar, NO limpiar localStorage, NO mostrar alerta
              // Solo logging para debugging
              console.warn('⚠️ Error 401 ignorado - Usuario mantiene sesión');
              showAlert = false;
              errorMessage = '';
              break;

            case 403:
              // Forbidden - Sin permisos
              console.warn('🔴 ERROR 403 Forbidden - URL:', error.url);
              console.warn('Detalle:', error.error);

              // NO mostrar alerta genérica, el backend ya envía su propio mensaje de error
              // que será manejado por el componente específico
              showAlert = false;
              errorMessage = '';
              break;

            case 404:
              // Not Found
              errorMessage = error.error?.message || 'El recurso solicitado no fue encontrado.';
              console.warn('Recurso no encontrado (404):', error.url);
              showAlert = false; // No mostrar alerta para 404, puede ser esperado
              break;

            case 409:
              // Conflict - Duplicado
              errorMessage = error.error?.message || 'El recurso ya existe.';
              console.warn('Conflicto (409):', error.error);
              break;

            case 422:
              // Unprocessable Entity
              errorMessage = error.error?.message || 'Los datos proporcionados no son válidos.';
              console.warn('Error de procesamiento (422):', error.error);
              break;

            case 429:
              // Too Many Requests
              errorMessage = 'Demasiadas solicitudes. Por favor espera un momento e intenta nuevamente.';
              console.warn('Límite de solicitudes excedido (429)');
              break;

            case 500:
              // Internal Server Error
              errorMessage = error.error?.message || 'Error interno del servidor. Por favor intenta más tarde.';
              console.error('Error del servidor (500):', error.error);
              break;

            case 502:
            case 503:
            case 504:
              // Bad Gateway, Service Unavailable, Gateway Timeout
              errorMessage = 'El servidor no está disponible temporalmente. Por favor intenta más tarde.';
              console.error('Error de servidor no disponible:', error.status);
              break;

            default:
              errorMessage = `Error inesperado: ${error.status}. ${error.error?.message || error.message}`;
              console.error('Error no manejado:', error);
          }
        }

        // Mostrar alerta solo si es necesario
        if (showAlert && errorMessage) {
          this.alertasService.showError('Error', errorMessage);
        }

        // Re-lanzar el error con información estructurada
        return throwError(() => ({
          status: error.status,
          message: errorMessage,
          originalError: error,
          validationErrors: error.error?.errors || null
        }));
      })
    );
  }
}
