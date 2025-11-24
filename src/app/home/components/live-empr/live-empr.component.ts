import { Component, OnInit, OnDestroy } from '@angular/core';
import { StreamingService } from 'src/app/services/streaming.service';
import { Subscription, forkJoin } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-live-empr',
  templateUrl: './live-empr.component.html',
  styleUrls: ['./live-empr.component.scss']
})
export class LiveEmprComponent implements OnInit, OnDestroy {
  liveStreams: any[] = [];
  pastStreams: any[] = [];
  allStreams: any[] = [];
  isLoading = true;
  private subscriptions = new Subscription();

  constructor(
    private streamingService: StreamingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadStreams();
  }

  loadStreams(): void {
    this.isLoading = true;
    
    // Obtener streams en vivo
    const liveStreams$ = this.streamingService.getActiveStreams({ status: 'live', limit: 6 });
    
    // Obtener streams recientes (pasados)
    const pastStreams$ = this.streamingService.getActiveStreams({ status: 'ended', limit: 6 });

    this.subscriptions.add(
      forkJoin([liveStreams$, pastStreams$]).subscribe(
        ([liveResponse, pastResponse]: any[]) => {
          // Procesar streams en vivo - VALIDAR que realmente estén en vivo
          if (liveResponse.success && liveResponse.streams) {
            this.liveStreams = liveResponse.streams
              .filter((s: any) => this.isActuallyLive(s)) // Filtrar solo los que realmente están en vivo
              .map((s: any) => ({ ...s, isLive: true }));
          } else if (Array.isArray(liveResponse)) {
            this.liveStreams = liveResponse
              .filter((s: any) => this.isActuallyLive(s)) // Filtrar solo los que realmente están en vivo
              .map((s: any) => ({ ...s, isLive: true }));
          }

          // Procesar streams pasados
          if (pastResponse.success && pastResponse.streams) {
            this.pastStreams = pastResponse.streams.map((s: any) => ({ ...s, isLive: false }));
          } else if (Array.isArray(pastResponse)) {
            this.pastStreams = pastResponse.map((s: any) => ({ ...s, isLive: false }));
          }

          // Si hay streams marcados como "live" pero que realmente no lo están, moverlos a pastStreams
          if (liveResponse.success && liveResponse.streams) {
            const fakeLiveStreams = liveResponse.streams
              .filter((s: any) => !this.isActuallyLive(s))
              .map((s: any) => ({ ...s, isLive: false }));
            this.pastStreams = [...this.pastStreams, ...fakeLiveStreams];
          } else if (Array.isArray(liveResponse)) {
            const fakeLiveStreams = liveResponse
              .filter((s: any) => !this.isActuallyLive(s))
              .map((s: any) => ({ ...s, isLive: false }));
            this.pastStreams = [...this.pastStreams, ...fakeLiveStreams];
          }

          // Combinar y ordenar: primero los en vivo, luego los pasados
          this.allStreams = [
            ...this.liveStreams.slice(0, 6),
            ...this.pastStreams.slice(0, 6 - this.liveStreams.length)
          ].slice(0, 6);

          this.isLoading = false;
        },
        (error) => {
          console.error('Error al obtener streams:', error);
          // Si falla, intentar solo con streams en vivo
          this.loadLiveStreamsOnly();
        }
      )
    );
  }

  loadLiveStreamsOnly(): void {
    this.subscriptions.add(
      this.streamingService.getActiveStreams({ limit: 6 }).subscribe(
        (response: any) => {
          if (response.success && response.streams) {
            this.allStreams = response.streams.map((s: any) => ({
              ...s,
              isLive: this.isActuallyLive(s) // Validar realmente si está en vivo
            })).slice(0, 6);
          } else if (Array.isArray(response)) {
            this.allStreams = response.map((s: any) => ({
              ...s,
              isLive: this.isActuallyLive(s) // Validar realmente si está en vivo
            })).slice(0, 6);
          }
          this.isLoading = false;
        },
        (error) => {
          console.error('Error al obtener streams:', error);
          this.isLoading = false;
          this.allStreams = [];
        }
      )
    );
  }

  /**
   * Valida si un stream realmente está en vivo
   * Verifica múltiples condiciones para asegurar que el stream esté activo
   */
  isActuallyLive(stream: any): boolean {
    if (!stream) return false;

    // Si tiene endedAt, definitivamente no está en vivo
    if (stream.endedAt) {
      const endedDate = new Date(stream.endedAt);
      const now = new Date();
      // Si endedAt es válido y es anterior a ahora, no está en vivo
      if (!isNaN(endedDate.getTime()) && endedDate.getTime() < now.getTime()) {
        return false;
      }
    }

    // El status debe ser 'live'
    if (stream.status !== 'live') {
      return false;
    }

    // Si tiene startedAt, verificar que sea reciente (no más de 24 horas)
    if (stream.startedAt) {
      const startedDate = new Date(stream.startedAt);
      const now = new Date();
      const diffHours = (now.getTime() - startedDate.getTime()) / (1000 * 60 * 60);
      
      // Si el stream empezó hace más de 24 horas y no tiene endedAt, puede ser un stream huérfano
      // Pero si tiene status 'live' y no tiene endedAt, lo consideramos en vivo
      // (el backend debería manejar esto, pero validamos por seguridad)
    }

    // Si pasa todas las validaciones, está en vivo
    return true;
  }

  /**
   * Método para verificar si un stream debe mostrarse como en vivo
   * Usa isActuallyLive para validación adicional
   */
  isStreamLive(stream: any): boolean {
    if (!stream) return false;
    
    // Si ya tiene isLive marcado, validar que realmente esté en vivo
    if (stream.isLive) {
      return this.isActuallyLive(stream);
    }
    
    // Si no tiene isLive pero tiene status 'live', validar
    if (stream.status === 'live') {
      return this.isActuallyLive(stream);
    }
    
    return false;
  }

  getStreamTime(stream: any): string {
    if (this.isStreamLive(stream)) {
      return 'En vivo ahora';
    }
    
    if (stream.endedAt) {
      const endedDate = new Date(stream.endedAt);
      const now = new Date();
      const diffMs = now.getTime() - endedDate.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      if (diffMins < 1) {
        return 'Finalizó hace un momento';
      } else if (diffMins < 60) {
        return `Finalizó hace ${diffMins} min`;
      } else if (diffHours < 24) {
        return `Finalizó hace ${diffHours} ${diffHours === 1 ? 'hora' : 'horas'}`;
      } else if (diffDays < 7) {
        return `Finalizó hace ${diffDays} ${diffDays === 1 ? 'día' : 'días'}`;
      } else {
        return endedDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
      }
    }
    
    return 'Transmisión finalizada';
  }

  goToStream(stream: any): void {
    if (this.isStreamLive(stream) && stream.streamId) {
      this.router.navigate(['/live/watch', stream.streamId]);
    } else if (stream.streamId) {
      // Para streams pasados, podrías navegar a una página de detalles o historial
      this.router.navigate(['/dashboard-live']);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
