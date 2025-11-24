import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../environments/environment';

interface Stream {
  streamId: string;
  roomId: string;
  title: string;
  description?: string;
  status: 'waiting' | 'live' | 'ended';
  quality: string;
  streamer?: {
    userId: string;
    username: string;
    role: string;
  };
  viewerCount?: number;
  tags?: string[];
  category?: string;
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
export class StreamingService {
  private apiUrl = `${environment.apiUrl}/stream`;
  private socket: Socket | null = null;
  private peerConnection: RTCPeerConnection | null = null;
  private localStream: MediaStream | null = null;

  constructor(private http: HttpClient) {}

  // ===== Headers con autenticación =====
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // ===== API REST =====

  createStream(data: CreateStreamData): Observable<any> {
    const token = localStorage.getItem('authToken');
    console.log('🔵 createStream - Token:', token ? token.substring(0, 30) + '...' : 'NO TOKEN');
    console.log('🔵 createStream - Data:', data);

    if (!token) {
      console.error('❌ No hay token para crear stream');
    }

    return this.http.post(this.apiUrl, data, { headers: this.getHeaders() });
  }

  startStream(streamId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${streamId}/start`, {}, { headers: this.getHeaders() });
  }

  endStream(streamId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${streamId}/end`, {}, { headers: this.getHeaders() });
  }

  getStream(streamId: string): Observable<any> {
    // Endpoint público - NO requiere autenticación
    return this.http.get(`${this.apiUrl}/${streamId}`);
  }

  getActiveStreams(params?: any): Observable<any> {
    // Endpoint público - NO requiere autenticación
    // NO enviar headers de autorización para evitar validación innecesaria
    return this.http.get(this.apiUrl, { params });
  }

  getMyStreams(params?: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/my/streams`, {
      params,
      headers: this.getHeaders()
    });
  }

  joinStream(streamId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${streamId}/join`, {}, { headers: this.getHeaders() });
  }

  updateStream(streamId: string, data: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${streamId}`, data, { headers: this.getHeaders() });
  }

  deleteStream(streamId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${streamId}`, { headers: this.getHeaders() });
  }

  getStreamViewers(streamId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${streamId}/viewers`, { headers: this.getHeaders() });
  }

  // ===== Socket.IO =====

  connectSocket(): Socket {
    if (!this.socket) {
      this.socket = io(environment.socketUrl, {
        transports: ['websocket', 'polling'],
        path: environment.socketPath,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000
      });

      this.socket.on('connect', () => {
        console.log('Socket.IO conectado:', this.socket?.id);
      });

      this.socket.on('disconnect', () => {
        console.log('Socket.IO desconectado');
      });

      this.socket.on('error', (error: any) => {
        console.error('Socket.IO error:', error);
      });
    }
    return this.socket;
  }

  disconnectSocket(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  getSocket(): Socket | null {
    return this.socket;
  }

  // Eventos de Stream
  joinStreamRoom(streamId: string, userId: string, username: string, role: string): void {
    this.socket?.emit('join-stream', { streamId, userId, username, role });
  }

  leaveStreamRoom(streamId: string, userId: string): void {
    this.socket?.emit('leave-stream', { streamId, userId });
  }

  startBroadcastEvent(streamId: string): void {
    this.socket?.emit('start-broadcast', { streamId });
  }

  stopBroadcastEvent(streamId: string): void {
    this.socket?.emit('stop-broadcast', { streamId });
  }

  kickViewer(streamId: string, viewerId: string): void {
    this.socket?.emit('kick-viewer', { streamId, viewerId });
  }

  // Eventos de Chat
  sendChatMessage(streamId: string, message: string, messageType: string = 'text'): void {
    this.socket?.emit('send-message', { streamId, message, messageType });
  }

  onChatMessage(callback: (data: any) => void): void {
    this.socket?.on('chat-message', callback);
  }

  offChatMessage(): void {
    this.socket?.off('chat-message');
  }

  // Eventos de Viewers
  onViewerJoined(callback: (data: any) => void): void {
    this.socket?.on('viewer-joined', callback);
  }

  onViewerLeft(callback: (data: any) => void): void {
    this.socket?.on('viewer-left', callback);
  }

  offViewerEvents(): void {
    this.socket?.off('viewer-joined');
    this.socket?.off('viewer-left');
  }

  // Eventos de Stream
  onStreamStarted(callback: (data: any) => void): void {
    this.socket?.on('stream-started', callback);
  }

  onStreamEnded(callback: (data: any) => void): void {
    this.socket?.on('stream-ended', callback);
  }

  offStreamEvents(): void {
    this.socket?.off('stream-started');
    this.socket?.off('stream-ended');
  }

  // Eventos WebRTC
  onWebRTCOffer(callback: (data: any) => void): void {
    this.socket?.on('webrtc-offer', callback);
  }

  onWebRTCAnswer(callback: (data: any) => void): void {
    this.socket?.on('webrtc-answer', callback);
  }

  onWebRTCIceCandidate(callback: (data: any) => void): void {
    this.socket?.on('webrtc-ice-candidate', callback);
  }

  offWebRTCEvents(): void {
    this.socket?.off('webrtc-offer');
    this.socket?.off('webrtc-answer');
    this.socket?.off('webrtc-ice-candidate');
  }

  sendWebRTCOffer(streamId: string, offer: RTCSessionDescriptionInit, targetUserId?: string): void {
    this.socket?.emit('webrtc-offer', { streamId, offer, targetUserId });
  }

  sendWebRTCAnswer(streamId: string, answer: RTCSessionDescriptionInit, targetUserId: string): void {
    this.socket?.emit('webrtc-answer', { streamId, answer, targetUserId });
  }

  sendWebRTCIceCandidate(streamId: string, candidate: RTCIceCandidate, targetUserId?: string): void {
    this.socket?.emit('webrtc-ice-candidate', { streamId, candidate, targetUserId });
  }

  // ===== WebRTC =====

  async initWebRTC(): Promise<RTCPeerConnection> {
    if (!this.peerConnection) {
      this.peerConnection = new RTCPeerConnection({
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' },
          { urls: 'stun:stun2.l.google.com:19302' }
        ]
      });

      // Manejar ICE candidates
      this.peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          console.log('Nuevo ICE candidate generado');
        }
      };

      // Manejar cambios de estado de conexión
      this.peerConnection.onconnectionstatechange = () => {
        console.log('Estado de conexión WebRTC:', this.peerConnection?.connectionState);
      };

      // Manejar cambios de estado ICE
      this.peerConnection.oniceconnectionstatechange = () => {
        console.log('Estado de ICE:', this.peerConnection?.iceConnectionState);
      };
    }
    return this.peerConnection;
  }

  async getUserMedia(constraints: MediaStreamConstraints = { video: true, audio: true }): Promise<MediaStream> {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia(constraints);
      return this.localStream;
    } catch (error) {
      console.error('Error al obtener medios:', error);
      throw error;
    }
  }

  async startBroadcasting(
    streamId: string,
    videoElement?: HTMLVideoElement,
    customConstraints?: MediaStreamConstraints
  ): Promise<MediaStream> {
    try {
      // Usar constraints personalizados o valores por defecto
      const constraints = customConstraints || {
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      };

      // Obtener stream de la cámara y micrófono
      const mediaStream = await this.getUserMedia(constraints);

      // Mostrar en el elemento de video local si se proporciona
      if (videoElement) {
        videoElement.srcObject = mediaStream;
      }

      // Inicializar WebRTC si no está inicializado
      if (!this.peerConnection) {
        await this.initWebRTC();
      }

      // Agregar tracks al peer connection
      mediaStream.getTracks().forEach(track => {
        this.peerConnection?.addTrack(track, mediaStream);
      });

      // Configurar el manejador de ICE candidates para este stream
      if (this.peerConnection) {
        this.peerConnection.onicecandidate = (event) => {
          if (event.candidate && this.socket) {
            this.sendWebRTCIceCandidate(streamId, event.candidate);
          }
        };
      }

      console.log('Broadcasting iniciado para stream:', streamId);
      return mediaStream;
    } catch (error) {
      console.error('Error al iniciar broadcast:', error);
      throw error;
    }
  }

  async createOffer(streamId: string): Promise<RTCSessionDescriptionInit | undefined> {
    if (!this.peerConnection) {
      throw new Error('Peer connection no inicializado');
    }

    try {
      const offer = await this.peerConnection.createOffer({
        offerToReceiveAudio: false,
        offerToReceiveVideo: false
      });

      await this.peerConnection.setLocalDescription(offer);

      // Enviar offer via Socket.IO
      this.sendWebRTCOffer(streamId, offer);

      return offer;
    } catch (error) {
      console.error('Error al crear offer:', error);
      throw error;
    }
  }

  async handleOffer(offer: RTCSessionDescriptionInit, streamId: string, fromUserId: string): Promise<void> {
    if (!this.peerConnection) {
      await this.initWebRTC();
    }

    try {
      await this.peerConnection!.setRemoteDescription(new RTCSessionDescription(offer));

      const answer = await this.peerConnection!.createAnswer();
      await this.peerConnection!.setLocalDescription(answer);

      // Enviar answer al streamer
      this.sendWebRTCAnswer(streamId, answer, fromUserId);
    } catch (error) {
      console.error('Error al manejar offer:', error);
      throw error;
    }
  }

  async handleAnswer(answer: RTCSessionDescriptionInit): Promise<void> {
    if (!this.peerConnection) {
      throw new Error('Peer connection no inicializado');
    }

    try {
      await this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    } catch (error) {
      console.error('Error al manejar answer:', error);
      throw error;
    }
  }

  async handleIceCandidate(candidate: RTCIceCandidateInit): Promise<void> {
    if (!this.peerConnection) {
      throw new Error('Peer connection no inicializado');
    }

    try {
      await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (error) {
      console.error('Error al agregar ICE candidate:', error);
      throw error;
    }
  }

  async joinAsViewer(streamId: string, videoElement: HTMLVideoElement): Promise<void> {
    try {
      // Inicializar WebRTC
      await this.initWebRTC();

      // Configurar el manejador para recibir el stream
      if (this.peerConnection) {
        this.peerConnection.ontrack = (event) => {
          console.log('Stream recibido del streamer');
          videoElement.srcObject = event.streams[0];
        };

        // Configurar ICE candidates para este viewer
        this.peerConnection.onicecandidate = (event) => {
          if (event.candidate && this.socket) {
            this.sendWebRTCIceCandidate(streamId, event.candidate);
          }
        };
      }

      console.log('Viewer configurado para stream:', streamId);
    } catch (error) {
      console.error('Error al unirse como viewer:', error);
      throw error;
    }
  }

  stopLocalStream(): void {
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
      this.localStream = null;
    }
  }

  stopBroadcasting(): void {
    // Detener todos los tracks del stream local
    this.stopLocalStream();

    // Remover los senders del peer connection si existe
    if (this.peerConnection) {
      const senders = this.peerConnection.getSenders();
      senders.forEach(sender => {
        if (sender.track) {
          this.peerConnection?.removeTrack(sender);
        }
      });
    }

    console.log('Broadcasting detenido');
  }

  closeWebRTC(): void {
    this.stopLocalStream();

    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = null;
    }
  }

  // Cleanup completo
  cleanup(): void {
    this.closeWebRTC();
    this.disconnectSocket();
  }
}
