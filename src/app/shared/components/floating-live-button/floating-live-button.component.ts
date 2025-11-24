import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { StreamingStateService } from 'src/app/services/streaming-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-floating-live-button',
  templateUrl: './floating-live-button.component.html',
  styleUrls: ['./floating-live-button.component.scss']
})
export class FloatingLiveButtonComponent implements OnInit, OnDestroy {
  isStreaming = false;
  showMenu = false;
  viewerCount = 0;
  streamId?: string;
  
  // Configuración de dispositivos
  videoDevices: MediaDeviceInfo[] = [];
  audioDevices: MediaDeviceInfo[] = [];
  selectedVideoDevice = '';
  selectedAudioDevice = '';
  selectedVideoQuality = '720p';


  private subscriptions = new Subscription();

  constructor(
    private streamingStateService: StreamingStateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Suscribirse al estado de transmisión
    this.subscriptions.add(
      this.streamingStateService.streamingState$.subscribe(state => {
        this.isStreaming = state.isStreaming;
        this.viewerCount = state.viewerCount || 0;
        this.streamId = state.streamId;
        
        if (state.videoDevices) {
          this.videoDevices = state.videoDevices;
        }
        if (state.audioDevices) {
          this.audioDevices = state.audioDevices;
        }
        if (state.selectedVideoDevice) {
          this.selectedVideoDevice = state.selectedVideoDevice;
        }
        if (state.selectedAudioDevice) {
          this.selectedAudioDevice = state.selectedAudioDevice;
        }
        if (state.selectedVideoQuality) {
          this.selectedVideoQuality = state.selectedVideoQuality;
        }
      })
    );

    // Cargar dispositivos disponibles
    this.loadMediaDevices();
    this.loadSavedSettings();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  closeMenu(): void {
    this.showMenu = false;
  }

  goToLive(): void {
    this.router.navigate(['/live']);
    this.closeMenu();
  }

  async stopStreaming(): Promise<void> {
    if (this.streamId) {
      try {
        // Disparar evento para que el componente de live detenga el stream
        window.dispatchEvent(new CustomEvent('stopStreaming', { 
          detail: { streamId: this.streamId } 
        }));
        this.streamingStateService.stopStreaming();
        this.closeMenu();
        this.router.navigate(['/live']);
      } catch (error) {
        console.error('Error al detener transmisión:', error);
      }
    }
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

      // Actualizar estado global
      this.streamingStateService.updateState({
        videoDevices: this.videoDevices,
        audioDevices: this.audioDevices
      });
    } catch (error) {
      console.error('Error al cargar dispositivos:', error);
    }
  }

  loadSavedSettings(): void {
    const savedVideoDevice = localStorage.getItem('preferredVideoDevice');
    const savedAudioDevice = localStorage.getItem('preferredAudioDevice');
    const savedQuality = localStorage.getItem('preferredVideoQuality');

    if (savedVideoDevice) {
      this.selectedVideoDevice = savedVideoDevice;
    }
    if (savedAudioDevice) {
      this.selectedAudioDevice = savedAudioDevice;
    }
    if (savedQuality) {
      this.selectedVideoQuality = savedQuality;
    }
  }

  async changeVideoDevice(): Promise<void> {
    localStorage.setItem('preferredVideoDevice', this.selectedVideoDevice);
    this.streamingStateService.updateState({ selectedVideoDevice: this.selectedVideoDevice });
    // Notificar al componente de live para que reinicie el stream
    window.dispatchEvent(new CustomEvent('videoDeviceChanged', { 
      detail: { deviceId: this.selectedVideoDevice } 
    }));
  }

  async changeAudioDevice(): Promise<void> {
    localStorage.setItem('preferredAudioDevice', this.selectedAudioDevice);
    this.streamingStateService.updateState({ selectedAudioDevice: this.selectedAudioDevice });
    // Notificar al componente de live para que reinicie el stream
    window.dispatchEvent(new CustomEvent('audioDeviceChanged', { 
      detail: { deviceId: this.selectedAudioDevice } 
    }));
  }

  async changeVideoQuality(): Promise<void> {
    localStorage.setItem('preferredVideoQuality', this.selectedVideoQuality);
    this.streamingStateService.updateState({ selectedVideoQuality: this.selectedVideoQuality });
    // Notificar al componente de live para que reinicie el stream
    window.dispatchEvent(new CustomEvent('videoQualityChanged', { 
      detail: { quality: this.selectedVideoQuality } 
    }));
  }

}

