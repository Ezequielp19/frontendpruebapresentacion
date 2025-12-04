import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LiveService } from '../main/live.service';
import Swal from 'sweetalert2';

interface ChatMessage {
  user: string;
  text: string;
  time: string;
  avatar: string;
  userId?: string;
  username?: string;
  message?: string;
  timestamp?: string;
}

interface Product {
  id: string;
  image: string;
  title: string;
  price: string;
  badge: string;
}

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit, OnDestroy {
  @ViewChild('remoteVideo') remoteVideo!: ElementRef<HTMLVideoElement>;

  streamId = '';
  stream: any = null;
  viewerCount = 0;
  messages: ChatMessage[] = [];
  newComment = '';
  isLoading = true;
  streamEnded = false;

  // Control de roles y permisos
  currentUserId: string = '';
  currentUserRole: string = '';
  isStreamOwner: boolean = false;
  canManageStream: boolean = false;
  showControlPanel: boolean = false;

  private streamingService: any;

  // Datos para productos (se pueden cargar desde el backend)
  additionalProducts: Product[] = [
    { id: 'camisa-cuadrille-1', image: 'https://i.imgur.com/QpjAiHq.jpg', title: 'Camisa Cuadrille con Botones', price: '$35,000', badge: 'En Venta' },
    { id: 'camisa-cuadrille-2', image: 'https://i.imgur.com/QpjAiHq.jpg', title: 'Camisa Cuadrille con Botones', price: '$35,000', badge: 'En Venta' },
    { id: 'camisa-cuadrille-3', image: 'https://i.imgur.com/QpjAiHq.jpg', title: 'Camisa Cuadrille con Botones', price: '$35,000', badge: 'En Venta' },
    { id: 'camisa-cuadrille-4', image: 'https://i.imgur.com/QpjAiHq.jpg', title: 'Camisa Cuadrille con Botones', price: '$35,000', badge: 'En Venta' }
  ];

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private liveService: LiveService
  ) {
    this.streamingService = this.liveService.getStreamingService();
  }

  ngOnInit(): void {
    // Obtener streamId de la ruta
    this.streamId = this.route.snapshot.params['streamId'];

    if (!this.streamId) {
      Swal.fire('Error', 'ID de stream no válido', 'error');
      this.router.navigate(['/dashboard-live']);
      return;
    }

    this.loadStream();
  }

  ngOnDestroy(): void {
    this.leaveStream();
  }

  loadStream(): void {
    this.isLoading = true;

    // Obtener datos del usuario actual
    this.currentUserId = localStorage.getItem('userId') || '';
    this.currentUserRole = localStorage.getItem('role') || '';

    console.log('🔍 Cargando stream:', this.streamId);

    this.liveService.getStreamInfo(this.streamId).subscribe({
      next: (response) => {
        console.log('✅ Stream cargado:', response);

        if (response.success) {
          this.stream = response.stream;

          // Verificar permisos de usuario
          const streamOwnerId = this.stream.userId || this.stream.user?._id || this.stream.createdBy;
          this.isStreamOwner = this.currentUserId === streamOwnerId;

          // Roles que pueden gestionar streams (owner, admin, moderator)
          this.canManageStream = this.isStreamOwner ||
                                this.currentUserRole === 'admin' ||
                                this.currentUserRole === 'moderator';

          console.log('👤 Usuario actual:', this.currentUserId);
          console.log('👨‍💼 Creador del stream:', streamOwnerId);
          console.log('🔑 Es dueño:', this.isStreamOwner);
          console.log('⚙️ Puede gestionar:', this.canManageStream);
          console.log('🎭 Rol:', this.currentUserRole);

          // Verificar que el stream esté realmente en vivo
          if (!this.isActuallyLive(this.stream)) {
            Swal.fire('Stream no disponible', 'Esta transmisión no está activa o ya finalizó', 'info');
            this.streamEnded = true;
            this.isLoading = false;
            return;
          }

          this.joinStream();
        } else {
          this.handleStreamError('Stream no encontrado');
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('❌ Error al cargar stream:', error);

        // Si es 404, el stream no existe
        if (error.status === 404) {
          this.handleStreamError('Stream no encontrado');
        }
        // Si es 403, no tienes permiso
        else if (error.status === 403) {
          Swal.fire('Acceso Denegado', 'No tienes permiso para ver este stream', 'error');
          this.router.navigate(['/dashboard-live']);
        }
        // Otros errores
        else {
          this.handleStreamError('Error al cargar el stream');
        }

        this.isLoading = false;
      }
    });
  }

  async joinStream(): Promise<void> {
    try {
      const userId = localStorage.getItem('userId') || `guest_${Date.now()}`;
      const username = localStorage.getItem('username') || 'Invitado';

      // 1. Validar acceso al stream (si no eres el creador)
      // Si eres el creador, tienes acceso automático
      const isCreator = this.stream?.userId === userId || this.stream?.user?._id === userId;

      if (!isCreator) {
        try {
          await this.liveService.joinStream(this.streamId).toPromise();
        } catch (error: any) {
          console.error('Error al validar acceso:', error);
          if (error.status === 403) {
            Swal.fire('Acceso Denegado', 'No tienes permiso para ver este stream', 'error');
            this.router.navigate(['/dashboard-live']);
            return;
          }
          // Si es otro error, continuar (permitir acceso)
          console.log('Continuando sin validación de acceso...');
        }
      } else {
        console.log('Eres el creador del stream, acceso automático');
      }

      // 2. Conectar Socket.IO
      this.streamingService.connectSocket();
      this.setupSocketListeners();

      // 3. Unirse a la sala del stream
      this.streamingService.joinStreamRoom(
        this.streamId,
        userId,
        username,
        'viewer'
      );

      // 4. Configurar WebRTC para recibir el stream
      await this.streamingService.initWebRTC();

      // Esperar a que el video element esté disponible
      setTimeout(async () => {
        if (this.remoteVideo && this.remoteVideo.nativeElement) {
          await this.streamingService.joinAsViewer(
            this.streamId,
            this.remoteVideo.nativeElement
          );
        }
      }, 100);

    } catch (error) {
      console.error('Error al unirse al stream:', error);
      Swal.fire('Error', 'No se pudo conectar al stream', 'error');
      this.router.navigate(['/dashboard-live']);
    }
  }

  leaveStream(): void {
    if (this.streamId) {
      const userId = localStorage.getItem('userId') || `guest_${Date.now()}`;
      this.streamingService.leaveStreamRoom(this.streamId, userId);
    }

    this.streamingService.closeWebRTC();
    this.streamingService.disconnectSocket();
  }

  setupSocketListeners(): void {
    // Viewers que se unen/salen
    this.streamingService.onViewerJoined((data: any) => {
      this.viewerCount = data.viewerCount;
    });

    this.streamingService.onViewerLeft((data: any) => {
      this.viewerCount = data.viewerCount;
    });

    // Mensajes del chat
    this.streamingService.onChatMessage((data: any) => {
      this.messages.push({
        user: data.username || data.user,
        text: data.message || data.text,
        time: 'ahora',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        userId: data.userId,
        username: data.username,
        message: data.message,
        timestamp: data.timestamp
      });

      // Auto-scroll al último mensaje
      setTimeout(() => this.scrollToBottom(), 100);
    });

    // Stream finalizado
    this.streamingService.onStreamEnded((data: any) => {
      this.streamEnded = true;
      Swal.fire({
        title: 'Stream finalizado',
        text: 'La transmisión ha terminado',
        icon: 'info',
        confirmButtonText: 'Volver al listado'
      }).then(() => {
        this.router.navigate(['/dashboard-live']);
      });
    });

    // Escuchar ofertas WebRTC del streamer
    this.streamingService.onWebRTCOffer(async (data: any) => {
      try {
        await this.streamingService.handleOffer(
          data.offer,
          this.streamId,
          data.from
        );
      } catch (error) {
        console.error('Error al manejar offer:', error);
      }
    });

    // Escuchar ICE candidates
    this.streamingService.onWebRTCIceCandidate(async (data: any) => {
      try {
        await this.streamingService.handleIceCandidate(data.candidate);
      } catch (error) {
        console.error('Error al manejar ICE candidate:', error);
      }
    });
  }

  sendComment(): void {
    if (this.newComment.trim() && this.stream && !this.streamEnded) {
      this.streamingService.sendChatMessage(
        this.streamId,
        this.newComment.trim()
      );
      this.newComment = '';
    }
  }

  scrollToBottom(): void {
    try {
      const chatContainer = document.querySelector('.comments-list');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    } catch (error) {
      console.error('Error al hacer scroll:', error);
    }
  }

  // ========== MÉTODOS CRUD ==========

  /**
   * Alternar visibilidad del panel de control
   */
  toggleControlPanel(): void {
    this.showControlPanel = !this.showControlPanel;
  }

  /**
   * Finalizar stream (DELETE)
   */
  async endStream(): Promise<void> {
    if (!this.canManageStream) {
      Swal.fire('Sin Permisos', 'No tienes permiso para finalizar este stream', 'error');
      return;
    }

    const result = await Swal.fire({
      title: '¿Finalizar Transmisión?',
      text: 'Esta acción terminará el stream para todos los espectadores',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, finalizar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    });

    if (result.isConfirmed) {
      try {
        this.liveService.endWebRTCStream(this.streamId).subscribe({
          next: (response) => {
            console.log('✅ Stream finalizado:', response);

            // Notificar via Socket.IO
            this.streamingService.stopBroadcastEvent(this.streamId);

            Swal.fire({
              title: '¡Stream Finalizado!',
              html: `
                <p><strong>Duración:</strong> ${Math.floor((response.stream?.duration || 0) / 60)} minutos</p>
                <p><strong>Espectadores totales:</strong> ${response.stream?.viewerCount || 0}</p>
                <p><strong>Pico de espectadores:</strong> ${response.stream?.peakViewers || 0}</p>
              `,
              icon: 'success',
              confirmButtonText: 'Entendido'
            }).then(() => {
              this.router.navigate(['/dashboard-live']);
            });
          },
          error: (error) => {
            console.error('❌ Error al finalizar stream:', error);
            Swal.fire('Error', 'No se pudo finalizar el stream', 'error');
          }
        });
      } catch (error) {
        console.error('Error:', error);
        Swal.fire('Error', 'Ocurrió un error al finalizar', 'error');
      }
    }
  }

  /**
   * Editar información del stream (UPDATE)
   */
  async editStream(): Promise<void> {
    if (!this.canManageStream) {
      Swal.fire('Sin Permisos', 'No tienes permiso para editar este stream', 'error');
      return;
    }

    const { value: formValues } = await Swal.fire({
      title: 'Editar Transmisión',
      html: `
        <input id="swal-title" class="swal2-input" placeholder="Título" value="${this.stream.title || ''}">
        <textarea id="swal-description" class="swal2-input" placeholder="Descripción">${this.stream.description || ''}</textarea>
        <select id="swal-category" class="swal2-input">
          <option value="general" ${this.stream.category === 'general' ? 'selected' : ''}>General</option>
          <option value="tecnologia" ${this.stream.category === 'tecnologia' ? 'selected' : ''}>Tecnología</option>
          <option value="moda" ${this.stream.category === 'moda' ? 'selected' : ''}>Moda</option>
          <option value="educacion" ${this.stream.category === 'educacion' ? 'selected' : ''}>Educación</option>
          <option value="entretenimiento" ${this.stream.category === 'entretenimiento' ? 'selected' : ''}>Entretenimiento</option>
        </select>
        <input id="swal-tags" class="swal2-input" placeholder="Tags (separados por coma)" value="${(this.stream.tags || []).join(', ')}">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Guardar Cambios',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const title = (document.getElementById('swal-title') as HTMLInputElement).value;
        const description = (document.getElementById('swal-description') as HTMLTextAreaElement).value;
        const category = (document.getElementById('swal-category') as HTMLSelectElement).value;
        const tagsInput = (document.getElementById('swal-tags') as HTMLInputElement).value;

        if (!title.trim()) {
          Swal.showValidationMessage('El título es requerido');
          return false;
        }

        return {
          title: title.trim(),
          description: description.trim(),
          category,
          tags: tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
        };
      }
    });

    if (formValues) {
      try {
        this.liveService.updateStream(this.streamId, formValues).subscribe({
          next: (response) => {
            console.log('✅ Stream actualizado:', response);

            // Actualizar datos locales
            this.stream = { ...this.stream, ...formValues };

            Swal.fire('¡Actualizado!', 'Los cambios se guardaron correctamente', 'success');
          },
          error: (error) => {
            console.error('❌ Error al actualizar stream:', error);
            Swal.fire('Error', 'No se pudieron guardar los cambios', 'error');
          }
        });
      } catch (error) {
        console.error('Error:', error);
        Swal.fire('Error', 'Ocurrió un error al actualizar', 'error');
      }
    }
  }

  /**
   * Eliminar stream permanentemente (DELETE)
   */
  async deleteStream(): Promise<void> {
    if (!this.isStreamOwner && this.currentUserRole !== 'admin') {
      Swal.fire('Sin Permisos', 'Solo el creador o un administrador pueden eliminar este stream', 'error');
      return;
    }

    const result = await Swal.fire({
      title: '¿Eliminar Stream?',
      html: `
        <p>Esta acción eliminará permanentemente:</p>
        <ul style="text-align: left; margin: 20px auto; max-width: 300px;">
          <li>La transmisión y sus datos</li>
          <li>El historial de chat</li>
          <li>Las estadísticas de viewers</li>
        </ul>
        <p><strong>⚠️ Esta acción no se puede deshacer</strong></p>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      input: 'checkbox',
      inputPlaceholder: 'Confirmo que quiero eliminar este stream'
    });

    if (result.isConfirmed && result.value) {
      try {
        this.liveService.deleteStream(this.streamId).subscribe({
          next: (response) => {
            console.log('✅ Stream eliminado:', response);

            Swal.fire({
              title: '¡Eliminado!',
              text: 'El stream ha sido eliminado permanentemente',
              icon: 'success',
              timer: 2000,
              showConfirmButton: false
            }).then(() => {
              this.router.navigate(['/dashboard-live']);
            });
          },
          error: (error) => {
            console.error('❌ Error al eliminar stream:', error);
            Swal.fire('Error', 'No se pudo eliminar el stream', 'error');
          }
        });
      } catch (error) {
        console.error('Error:', error);
        Swal.fire('Error', 'Ocurrió un error al eliminar', 'error');
      }
    } else if (result.isConfirmed && !result.value) {
      Swal.fire('Acción Cancelada', 'Debes confirmar la eliminación', 'info');
    }
  }

  /**
   * Gestionar espectadores (banear, kickear, etc.)
   */
  async manageViewers(): Promise<void> {
    if (!this.canManageStream) {
      Swal.fire('Sin Permisos', 'No tienes permiso para gestionar espectadores', 'error');
      return;
    }

    // Obtener lista de espectadores conectados
    this.liveService.getStreamViewers(this.streamId).subscribe({
      next: (response) => {
        const viewers = response.viewers || [];

        if (viewers.length === 0) {
          Swal.fire('Sin Espectadores', 'No hay espectadores conectados en este momento', 'info');
          return;
        }

        // Crear HTML con la lista de viewers
        const viewersHTML = viewers.map((viewer: any) => `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px solid #eee;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <img src="${viewer.avatar || 'https://i.imgur.com/EnANUqj.jpg'}"
                   style="width: 40px; height: 40px; border-radius: 50%;" />
              <div style="text-align: left;">
                <strong>${viewer.username}</strong>
                <br>
                <small style="color: #666;">${viewer.role || 'viewer'}</small>
              </div>
            </div>
            <button class="swal2-confirm swal2-styled"
                    onclick="window.kickViewer('${viewer.userId}')"
                    style="padding: 5px 15px; font-size: 12px;">
              Expulsar
            </button>
          </div>
        `).join('');

        Swal.fire({
          title: `Espectadores (${viewers.length})`,
          html: `
            <div style="max-height: 400px; overflow-y: auto;">
              ${viewersHTML}
            </div>
          `,
          width: 600,
          showCloseButton: true,
          showConfirmButton: false
        });
      },
      error: (error) => {
        console.error('Error al cargar viewers:', error);
        Swal.fire('Error', 'No se pudo cargar la lista de espectadores', 'error');
      }
    });
  }

  /**
   * Expulsar un espectador específico
   */
  kickViewer(viewerId: string): void {
    if (!this.canManageStream) return;

    this.streamingService.kickViewer(this.streamId, viewerId);
    Swal.fire('Expulsado', 'El espectador ha sido expulsado del stream', 'success');
  }

  /**
   * Calcula la duración del stream desde que inició
   */
  getStreamDuration(): string {
    if (!this.stream || !this.stream.startedAt) {
      return '0m';
    }

    const startTime = new Date(this.stream.startedAt).getTime();
    const now = new Date().getTime();
    const diffMs = now - startTime;

    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const remainingMins = diffMins % 60;

    if (diffHours > 0) {
      return `${diffHours}h ${remainingMins}m`;
    }
    return `${diffMins}m`;
  }

  handleStreamError(message: string): void {
    Swal.fire('Error', message, 'error');
    this.router.navigate(['/dashboard-live']);
  }

  addBuy(): void {
    this.router.navigate(['/buy-prod']);
  }

  addFriend(): void {
    Swal.fire('Solicitud de amistad enviada', '', 'success');
  }

  /**
   * Valida si un stream realmente está en vivo
   * Verifica múltiples condiciones para asegurar que el stream esté activo
   */
  isActuallyLive(stream: any): boolean {
    if (!stream) {
      console.log('❌ isActuallyLive: stream es null/undefined');
      return false;
    }

    console.log('🔍 Validando stream:', {
      streamId: stream.streamId || stream._id,
      status: stream.status,
      endedAt: stream.endedAt,
      startedAt: stream.startedAt
    });

    // PRIMERO: Si tiene endedAt, definitivamente no está en vivo
    if (stream.endedAt) {
      const endedDate = new Date(stream.endedAt);
      const now = new Date();
      // Si endedAt es válido y es anterior a ahora, no está en vivo
      if (!isNaN(endedDate.getTime())) {
        if (endedDate.getTime() < now.getTime()) {
          console.log('❌ Stream tiene endedAt en el pasado:', endedDate, 'vs ahora:', now);
          return false;
        }
        // Si endedAt es en el futuro, algo está mal pero lo consideramos finalizado
        if (endedDate.getTime() > now.getTime()) {
          console.log('⚠️ Stream tiene endedAt en el futuro, considerando finalizado');
          return false;
        }
      }
    }

    // SEGUNDO: El status debe ser 'live' o 'active'
    if (stream.status !== 'live' && stream.status !== 'active') {
      console.log('❌ Stream status no es "live" o "active":', stream.status);
      return false;
    }

    // TERCERO: Si tiene startedAt, verificar que no sea demasiado antiguo (más de 24 horas)
    // Un stream que empezó hace más de 24 horas sin endedAt probablemente está huérfano
    if (stream.startedAt && !stream.endedAt) {
      const startedDate = new Date(stream.startedAt);
      const now = new Date();
      if (!isNaN(startedDate.getTime())) {
        const diffHours = (now.getTime() - startedDate.getTime()) / (1000 * 60 * 60);
        if (diffHours > 24) {
          console.log('⚠️ Stream empezó hace más de 24 horas sin endedAt, considerando finalizado:', diffHours, 'horas');
          return false;
        }
      }
    }

    // Si pasa todas las validaciones, está en vivo
    console.log('✅ Stream está realmente en vivo');
    return true;
  }

  /**
   * Método para verificar si un stream debe mostrarse como en vivo
   * Siempre valida usando isActuallyLive para asegurar que realmente esté en vivo
   */
  isStreamLive(stream: any): boolean {
    if (!stream) {
      return false;
    }
    
    // Siempre validar realmente si está en vivo, no confiar solo en el status
    const result = this.isActuallyLive(stream);
    console.log('🎯 isStreamLive resultado:', result, 'para stream:', stream.streamId || stream._id);
    return result;
  }

  /**
   * Getter para verificar si el stream actual está en vivo
   * Útil para usar en el template
   */
  get isCurrentStreamLive(): boolean {
    return this.isStreamLive(this.stream);
  }

  /**
   * Navegar al perfil del streamer
   */
  goToProfile(): void {
    if (!this.stream) {
      // Si no hay stream, navegar a preview-profile sin parámetros
      this.router.navigate(['/preview-profile']);
      return;
    }

    // Obtener el ID del streamer de diferentes posibles ubicaciones
    const streamerId = this.stream.streamer?._id || 
                       this.stream.streamer?.id || 
                       this.stream.userId || 
                       this.stream.user?._id || 
                       this.stream.createdBy;

    if (!streamerId) {
      // Si no hay ID del streamer (usuario estático), navegar a preview-profile sin parámetros
      this.router.navigate(['/preview-profile']);
      return;
    }

    // Navegar a preview-profile con el ID del streamer
    this.router.navigate(['/preview-profile'], {
      queryParams: {
        id: streamerId,
        type: 'user' // Tipo por defecto, se puede ajustar según la lógica del negocio
      }
    });
  }
}
