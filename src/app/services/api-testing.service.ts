import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface TestResult {
  service: string;
  endpoint: string;
  method: string;
  status: 'success' | 'error' | 'warning';
  message: string;
  requiresAuth: boolean;
  statusCode?: number;
  error?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ApiTestingService {
  private apiUrl = environment.apiUrl;
  private testResults: TestResult[] = [];
  private authToken: string | null = null;

  constructor(private http: HttpClient) {}

  // Método principal para ejecutar todos los tests
  runAllTests(): Observable<TestResult[]> {
    this.testResults = [];
    console.log('🚀 Iniciando testing completo de API...\n');

    return new Observable(observer => {
      // Fase 1: Tests de endpoints públicos
      console.log('📋 Fase 1: Testing endpoints públicos...');
      this.testPublicEndpoints().subscribe({
        next: (publicResults) => {
          this.testResults.push(...publicResults);
          console.log(`✅ Fase 1 completada: ${publicResults.length} tests\n`);

          // Fase 2: Autenticación
          console.log('🔐 Fase 2: Testing autenticación...');
          this.testAuthentication().subscribe({
            next: (authResults) => {
              this.testResults.push(...authResults);
              console.log(`✅ Fase 2 completada: ${authResults.length} tests\n`);

              // Fase 3: Tests con autenticación
              if (this.authToken) {
                console.log('🔒 Fase 3: Testing endpoints autenticados...');
                this.testAuthenticatedEndpoints().subscribe({
                  next: (authEndpointResults) => {
                    this.testResults.push(...authEndpointResults);
                    console.log(`✅ Fase 3 completada: ${authEndpointResults.length} tests\n`);

                    observer.next(this.testResults);
                    observer.complete();
                  },
                  error: (err) => observer.error(err)
                });
              } else {
                console.log('⚠️ Fase 3 omitida: no hay autenticación\n');
                observer.next(this.testResults);
                observer.complete();
              }
            },
            error: (err) => observer.error(err)
          });
        },
        error: (err) => observer.error(err)
      });
    });
  }

  // Tests de endpoints públicos (no requieren autenticación)
  private testPublicEndpoints(): Observable<TestResult[]> {
    const tests: Observable<TestResult>[] = [];

    // === HEALTH CHECKS (sin /api) ===
    tests.push(this.testEndpoint('Health Check', 'http://localhost:3000/health', 'GET', false));
    tests.push(this.testEndpoint('Health Live', 'http://localhost:3000/health/live', 'GET', false));
    tests.push(this.testEndpoint('Health Ready', 'http://localhost:3000/health/ready', 'GET', false));

    // === CATEGORÍAS ===
    tests.push(this.testEndpoint('Categories - All', '/categorie', 'GET', false));

    // === BÚSQUEDA GLOBAL ===
    tests.push(this.testEndpoint('Search - Global', '/search?q=laptop&type=all&page=1&limit=20', 'GET', false));
    tests.push(this.testEndpoint('Search - Autocomplete', '/search/autocomplete?q=lap&limit=10', 'GET', false));
    tests.push(this.testEndpoint('Search - Popular', '/search/popular?limit=10', 'GET', false));
    tests.push(this.testEndpoint('Search - Top Professionals', '/search/top-professionals?limit=10', 'GET', false));

    // === REVIEWS PÚBLICOS ===
    tests.push(this.testEndpoint('Reviews - All', '/reviews?page=1&limit=20', 'GET', false));

    // === PROFESIONALES ===
    tests.push(this.testEndpoint('Professionals - All', '/professional', 'GET', false));

    // === VEHÍCULOS ===
    tests.push(this.testEndpoint('Vehicles - All', '/vehicle/vehicles', 'GET', false));

    // === PRODUCTOS DEDICADOS ===
    tests.push(this.testEndpoint('Dedicated - All', '/dedicated', 'GET', false));

    // === RANKING ===
    tests.push(this.testEndpoint('Ranking - All', '/ranking', 'GET', false));

    // === PROVEEDORES ===
    tests.push(this.testEndpoint('Providers - Register', '/providers', 'GET', false));

    // === SUSCRIPCIONES ===
    tests.push(this.testEndpoint('Subscription - Plans', '/subscription/plans', 'GET', false));

    // === STREAMING ===
    tests.push(this.testEndpoint('Stream - Active', '/stream?status=live&limit=10', 'GET', false));

    // === FACTURACIÓN ===
    tests.push(this.testEndpoint('Billing - Health', '/billing/health', 'GET', false));

    return forkJoin(tests);
  }

  // Tests de autenticación
  private testAuthentication(): Observable<TestResult[]> {
    const tests: Observable<TestResult>[] = [];

    // Test 1: Solicitar código de registro
    const requestCodeTest = this.http.post(`${this.apiUrl}/users/register_request`, {
      email: 'testapi@example.com',
      nombre: 'Usuario Test API'
    }).pipe(
      map(response => ({
        service: 'Auth',
        endpoint: '/users/register_request',
        method: 'POST',
        status: 'success' as const,
        message: 'Código de registro solicitado',
        requiresAuth: false,
        statusCode: 200
      })),
      catchError(error => of({
        service: 'Auth',
        endpoint: '/users/register_request',
        method: 'POST',
        status: 'warning' as const,
        message: `Advertencia: ${error.error?.message || error.message}`,
        requiresAuth: false,
        statusCode: error.status,
        error: error
      }))
    );
    tests.push(requestCodeTest);

    // Test 2: Login con credenciales
    const loginTest = this.http.post<any>(`${this.apiUrl}/login`, {
      email: 'admin@example.com',
      contraseña: 'Admin123!'
    }).pipe(
      map(response => {
        // Intentar obtener el token de diferentes ubicaciones
        const token = response.accessToken || response.data?.token || response.token;
        if (token) {
          this.authToken = token;
          localStorage.setItem('authToken', token);
          console.log('✅ Token obtenido y guardado');
        }
        return {
          service: 'Auth',
          endpoint: '/login',
          method: 'POST',
          status: 'success' as const,
          message: token ? 'Login exitoso - Token obtenido' : 'Login exitoso sin token',
          requiresAuth: false,
          statusCode: 200
        };
      }),
      catchError(error => of({
        service: 'Auth',
        endpoint: '/login',
        method: 'POST',
        status: 'error' as const,
        message: `Error: ${error.error?.message || error.message}`,
        requiresAuth: false,
        statusCode: error.status,
        error: error
      }))
    );
    tests.push(loginTest);

    // Test 3: Validar código (requiere código válido)
    const validateCodeTest = this.http.post(`${this.apiUrl}/code/validate`, {
      code: '000000'
    }).pipe(
      map(response => ({
        service: 'Auth',
        endpoint: '/code/validate',
        method: 'POST',
        status: 'success' as const,
        message: 'Validación de código exitosa',
        requiresAuth: true,
        statusCode: 200
      })),
      catchError(error => of({
        service: 'Auth',
        endpoint: '/code/validate',
        method: 'POST',
        status: 'warning' as const,
        message: `Código inválido o expirado`,
        requiresAuth: true,
        statusCode: error.status,
        error: error
      }))
    );
    tests.push(validateCodeTest);

    // Test 4: Forgot Password
    const forgotPasswordTest = this.http.post(`${this.apiUrl}/password/forgot`, {
      email: 'testapi@example.com'
    }).pipe(
      map(response => ({
        service: 'Auth',
        endpoint: '/password/forgot',
        method: 'POST',
        status: 'success' as const,
        message: 'Email de recuperación enviado',
        requiresAuth: false,
        statusCode: 200
      })),
      catchError(error => of({
        service: 'Auth',
        endpoint: '/password/forgot',
        method: 'POST',
        status: 'warning' as const,
        message: `Advertencia: ${error.error?.message || error.message}`,
        requiresAuth: false,
        statusCode: error.status,
        error: error
      }))
    );
    tests.push(forgotPasswordTest);

    return forkJoin(tests);
  }

  // Tests de endpoints que requieren autenticación
  private testAuthenticatedEndpoints(): Observable<TestResult[]> {
    if (!this.authToken) {
      return of([{
        service: 'Auth',
        endpoint: 'N/A',
        method: 'N/A',
        status: 'error',
        message: 'No hay token de autenticación',
        requiresAuth: true
      }]);
    }

    const tests: Observable<TestResult>[] = [];

    console.log('🔒 Ejecutando tests autenticados con token:', this.authToken.substring(0, 20) + '...');

    // === USUARIOS ===
    tests.push(this.testEndpoint('Users - Get Data', '/users/get_data', 'GET', true));
    tests.push(this.testEndpoint('Users - Profile', '/users/profile', 'GET', true));

    // === CATEGORÍAS PROTEGIDAS ===
    tests.push(this.testEndpoint('Categories - Protected', '/categorie/get_data', 'POST', true));

    // === CARRITO ===
    tests.push(this.testEndpoint('Cart - Get', '/cart', 'GET', true));

    // === WISHLIST ===
    tests.push(this.testEndpoint('Wishlist - Get', '/wishlist', 'GET', true));

    // === NOTIFICACIONES ===
    tests.push(this.testEndpoint('Notifications - All', '/notifications?page=1&limit=10', 'GET', true));
    tests.push(this.testEndpoint('Notifications - Unread Count', '/notifications/unread-count', 'GET', true));

    // === MENSAJERÍA ===
    tests.push(this.testEndpoint('Messages - Conversations', '/messages/conversations?page=1&limit=20', 'GET', true));
    tests.push(this.testEndpoint('Messages - Unread Count', '/messages/unread-count', 'GET', true));

    // === RESERVAS ===
    tests.push(this.testEndpoint('Reservations - User', '/reservation/user?page=1&limit=10', 'GET', true));

    // === MEDIA ===
    tests.push(this.testEndpoint('Media - Info', '/media-upload/info/test.jpg', 'GET', true));

    // === VEHÍCULOS PROTEGIDOS ===
    tests.push(this.testEndpoint('Vehicles - By ID', '/vehicle/vehicles/test-id', 'GET', true));

    // === PROFESIONALES PROTEGIDOS ===
    tests.push(this.testEndpoint('Professional - Create', '/professional/crear', 'POST', true));

    // === PRODUCTOS AUTÓNOMOS ===
    tests.push(this.testEndpoint('Autonomous - All', '/autonomous/all', 'GET', true));
    tests.push(this.testEndpoint('Autonomous - Ranking', '/autonomous', 'GET', true));

    // === TIPOS DE PRODUCTO ===
    tests.push(this.testEndpoint('ProductType - All', '/productType', 'GET', true));

    // === PAGOS ===
    tests.push(this.testEndpoint('Payment - Methods', '/payment/methods', 'GET', true));

    // === ÓRDENES ===
    tests.push(this.testEndpoint('Orders - User', '/order?status=pending&page=1&limit=10', 'GET', true));

    // === SUSCRIPCIONES ===
    tests.push(this.testEndpoint('Subscription - Provider', '/subscription/provider/test-id', 'GET', true));

    // === PROVEEDORES ===
    tests.push(this.testEndpoint('Providers - All', '/providers', 'GET', true));
    tests.push(this.testEndpoint('Providers - Pending', '/providers/pending', 'GET', true));

    // === STREAMING ===
    tests.push(this.testEndpoint('Stream - Create', '/stream', 'POST', true));

    return forkJoin(tests);
  }

  // Método helper para testear un endpoint
  private testEndpoint(
    service: string,
    endpoint: string,
    method: string,
    requiresAuth: boolean
  ): Observable<TestResult> {
    const url = endpoint.startsWith('http') ? endpoint : `${this.apiUrl}${endpoint}`;
    const headers: any = {};

    if (requiresAuth && this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }

    let request: Observable<any>;

    switch (method) {
      case 'GET':
        request = this.http.get(url, { headers, observe: 'response' });
        break;
      case 'POST':
        request = this.http.post(url, {}, { headers, observe: 'response' });
        break;
      case 'PUT':
        request = this.http.put(url, {}, { headers, observe: 'response' });
        break;
      case 'DELETE':
        request = this.http.delete(url, { headers, observe: 'response' });
        break;
      default:
        return of({
          service,
          endpoint,
          method,
          status: 'error',
          message: 'Método HTTP no soportado',
          requiresAuth,
          statusCode: 0
        });
    }

    return request.pipe(
      map(response => ({
        service,
        endpoint,
        method,
        status: 'success' as const,
        message: `OK - ${response.status}`,
        requiresAuth,
        statusCode: response.status
      })),
      catchError(error => {
        const statusCode = error.status || 0;
        let status: 'error' | 'warning' = 'error';
        let message = '';

        if (statusCode === 404) {
          status = 'warning';
          message = 'Endpoint no encontrado (404)';
        } else if (statusCode === 401) {
          status = 'warning';
          message = 'No autorizado - requiere autenticación (401)';
        } else if (statusCode === 403) {
          status = 'warning';
          message = 'Prohibido - sin permisos (403)';
        } else if (statusCode === 400) {
          status = 'warning';
          message = `Bad Request (400): ${error.error?.message || 'Datos inválidos'}`;
        } else if (statusCode === 500) {
          status = 'error';
          message = 'Error del servidor (500)';
        } else if (statusCode === 0) {
          status = 'error';
          message = 'Error de red - Backend no responde';
        } else {
          message = `Error ${statusCode}: ${error.error?.message || error.message}`;
        }

        return of({
          service,
          endpoint,
          method,
          status,
          message,
          requiresAuth,
          statusCode,
          error: error.error
        });
      })
    );
  }

  // Obtener resumen de resultados
  getSummary() {
    const total = this.testResults.length;
    const success = this.testResults.filter(r => r.status === 'success').length;
    const warnings = this.testResults.filter(r => r.status === 'warning').length;
    const errors = this.testResults.filter(r => r.status === 'error').length;
    const successRate = total > 0 ? `${((success / total) * 100).toFixed(1)}%` : '0%';

    return {
      total,
      success,
      warnings,
      errors,
      successRate,
      details: {
        public: this.testResults.filter(r => !r.requiresAuth).length,
        authenticated: this.testResults.filter(r => r.requiresAuth).length
      }
    };
  }
}
