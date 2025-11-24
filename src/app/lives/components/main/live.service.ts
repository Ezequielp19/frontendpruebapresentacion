// filepath: c:\Users\Urano\Documents\Test-Lv\FRONT\src\app\lives\components\main\live.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { StreamingService } from '../../../services/streaming.service';

interface StreamResponse {
  streamingUrl: string;
}

interface CreateStreamData {
  title: string;
  description?: string;
  quality?: string;
  isPrivate?: boolean;
  category?: string;
  role?: string;
  product?: string;
  productType?: string;
  productStatus?: string;
  location?: string;
  tags?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class LiveService {
  private apiUrl = environment.apiUrl;
  private currentStreamId: string | null = null;

  constructor(
    private http: HttpClient,
    private streamingService: StreamingService
  ) { }

  // Método legacy para compatibilidad con HLS
  getStreamUrl() {
    return this.http.post<StreamResponse>(`${this.apiUrl}/stream/stream`, {}).pipe(
      tap((response: StreamResponse) => {
        console.log('URL de streaming recibida:', response.streamingUrl);
      })
    );
  }

  // Nuevos métodos para WebRTC Streaming

  /**
   * Crea un nuevo stream en el servidor
   */
  createWebRTCStream(data: CreateStreamData): Observable<any> {
    return this.streamingService.createStream(data).pipe(
      tap((response) => {
        if (response.success && response.stream) {
          this.currentStreamId = response.stream.streamId;
          console.log('Stream WebRTC creado:', this.currentStreamId);
        }
      })
    );
  }

  /**
   * Inicia un stream existente
   */
  startWebRTCStream(streamId: string): Observable<any> {
    return this.streamingService.startStream(streamId);
  }

  /**
   * Finaliza un stream
   */
  endWebRTCStream(streamId: string): Observable<any> {
    return this.streamingService.endStream(streamId).pipe(
      tap(() => {
        this.currentStreamId = null;
      })
    );
  }

  /**
   * Obtiene información de un stream específico
   */
  getStreamInfo(streamId: string): Observable<any> {
    return this.streamingService.getStream(streamId);
  }

  /**
   * Obtiene la lista de streams activos
   */
  getActiveStreams(params?: any): Observable<any> {
    return this.streamingService.getActiveStreams(params);
  }

  /**
   * Obtiene los streams del usuario actual
   */
  getMyStreams(): Observable<any> {
    return this.streamingService.getMyStreams();
  }

  /**
   * Une a un usuario a un stream como viewer
   */
  joinStream(streamId: string): Observable<any> {
    return this.streamingService.joinStream(streamId);
  }

  /**
   * Actualiza información de un stream (UPDATE)
   */
  updateStream(streamId: string, data: any): Observable<any> {
    return this.streamingService.updateStream(streamId, data);
  }

  /**
   * Elimina un stream permanentemente (DELETE)
   */
  deleteStream(streamId: string): Observable<any> {
    return this.streamingService.deleteStream(streamId);
  }

  /**
   * Obtiene la lista de espectadores conectados a un stream
   */
  getStreamViewers(streamId: string): Observable<any> {
    return this.streamingService.getStreamViewers(streamId);
  }

  /**
   * Obtiene el ID del stream actual
   */
  getCurrentStreamId(): string | null {
    return this.currentStreamId;
  }

  /**
   * Establece el ID del stream actual
   */
  setCurrentStreamId(streamId: string): void {
    this.currentStreamId = streamId;
  }

  /**
   * Limpia el ID del stream actual
   */
  clearCurrentStreamId(): void {
    this.currentStreamId = null;
  }

  // Métodos para interactuar con el servicio de streaming directamente
  getStreamingService(): StreamingService {
    return this.streamingService;
  }
}

