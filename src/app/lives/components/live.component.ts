import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { LiveService } from './main/live.service';
import Hls from 'hls.js';

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
  selector: 'app-live',
  templateUrl: './main/main.component.html',
  styleUrls: ['./main/main.component.scss']
})
export class LiveComponent implements AfterViewInit, OnDestroy {
  @ViewChild('videoPlayer', { static: true }) videoRef!: ElementRef<HTMLVideoElement>;

  // Propiedades necesarias para el template
  isStreaming = false;
  isCreatingStream = false;
  viewerCount = 0;
  newComment = '';

  // Configuración de dispositivos
  showSettingsMenu = false;
  videoDevices: MediaDeviceInfo[] = [];
  audioDevices: MediaDeviceInfo[] = [];
  selectedVideoDevice = '';
  selectedAudioDevice = '';
  selectedVideoQuality = '720p';

  comments: ChatMessage[] = [
    {
      user: 'Usuario 1',
      text: '¡Gran transmisión!',
      time: 'hace 2 min',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
    },
    {
      user: 'Usuario 2',
      text: '¡Me encanta el contenido!',
      time: 'hace 5 min',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
    }
  ];

  // Productos adicionales para mostrar durante la transmisión
  additionalProducts: Product[] = [
    { id: 'camisa-cuadrille-1', image: 'https://i.imgur.com/QpjAiHq.jpg', title: 'Camisa Cuadrille con Botones', price: '$35,000', badge: 'En Venta' },
    { id: 'camisa-casual', image: 'https://i.imgur.com/QpjAiHq.jpg', title: 'Camisa Casual', price: '$25,000', badge: 'En Venta' },
    { id: 'camisa-formal', image: 'https://i.imgur.com/QpjAiHq.jpg', title: 'Camisa Formal', price: '$40,000', badge: 'En Venta' },
    { id: 'camisa-deportiva', image: 'https://i.imgur.com/QpjAiHq.jpg', title: 'Camisa Deportiva', price: '$30,000', badge: 'En Venta' }
  ];

  constructor(private liveService: LiveService) {}

  ngAfterViewInit(): void {
    this.startStreaming();
  }

  ngOnDestroy(): void {
    // Limpieza si es necesario
    this.isStreaming = false;
  }

  startStreaming(): void {
    this.liveService.getStreamUrl().subscribe({
      next: ({ streamingUrl }) => {
        const video = this.videoRef.nativeElement;
        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(streamingUrl);
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            video.play();
            this.isStreaming = true;
          });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = streamingUrl;
          video.addEventListener('loadedmetadata', () => {
            video.play();
            this.isStreaming = true;
          });
        }
      },
      error: (err) => {
        console.error('Error al cargar el stream:', err);
        this.isStreaming = false;
      }
    });
  }

  sendComment(): void {
    if (this.newComment.trim()) {
      const comment: ChatMessage = {
        user: 'Usuario Actual',
        text: this.newComment,
        time: 'Ahora',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
      };

      this.comments.unshift(comment);
      this.newComment = '';

      // TODO: Enviar comentario al backend vía Socket.IO
      // this.socketService.sendComment(comment);
    }
  }

  addBuy(): void {
    // Implementar lógica de compra
    console.log('Función addBuy llamada');
  }

  // Métodos de configuración de dispositivos
  toggleSettingsMenu(event: Event): void {
    event.stopPropagation();
    this.showSettingsMenu = !this.showSettingsMenu;
  }

  closeSettingsMenu(): void {
    this.showSettingsMenu = false;
  }

  async loadMediaDevices(): Promise<void> {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      this.videoDevices = devices.filter(device => device.kind === 'videoinput');
      this.audioDevices = devices.filter(device => device.kind === 'audioinput');

      if (!this.selectedVideoDevice && this.videoDevices.length > 0) {
        this.selectedVideoDevice = this.videoDevices[0].deviceId;
      }

      if (!this.selectedAudioDevice && this.audioDevices.length > 0) {
        this.selectedAudioDevice = this.audioDevices[0].deviceId;
      }
    } catch (error) {
      console.error('Error al cargar dispositivos:', error);
    }
  }

  changeVideoDevice(): void {
    localStorage.setItem('preferredVideoDevice', this.selectedVideoDevice);
  }

  changeAudioDevice(): void {
    localStorage.setItem('preferredAudioDevice', this.selectedAudioDevice);
  }

  changeVideoQuality(): void {
    localStorage.setItem('preferredVideoQuality', this.selectedVideoQuality);
  }
}
