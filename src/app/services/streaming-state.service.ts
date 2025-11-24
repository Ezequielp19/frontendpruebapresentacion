import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface StreamingState {
  isStreaming: boolean;
  streamId?: string;
  viewerCount?: number;
  videoDevices?: MediaDeviceInfo[];
  audioDevices?: MediaDeviceInfo[];
  selectedVideoDevice?: string;
  selectedAudioDevice?: string;
  selectedVideoQuality?: string;
}

@Injectable({
  providedIn: 'root'
})
export class StreamingStateService {
  private streamingStateSubject = new BehaviorSubject<StreamingState>({
    isStreaming: false
  });

  public streamingState$: Observable<StreamingState> = this.streamingStateSubject.asObservable();

  constructor() {
    // Verificar si hay un stream activo al iniciar
    const savedStreamId = localStorage.getItem('activeStreamId');
    if (savedStreamId) {
      this.updateState({ isStreaming: true, streamId: savedStreamId });
    }
  }

  updateState(updates: Partial<StreamingState>): void {
    const currentState = this.streamingStateSubject.value;
    this.streamingStateSubject.next({ ...currentState, ...updates });
  }

  getState(): StreamingState {
    return this.streamingStateSubject.value;
  }

  startStreaming(streamId: string): void {
    localStorage.setItem('activeStreamId', streamId);
    this.updateState({ isStreaming: true, streamId });
  }

  stopStreaming(): void {
    localStorage.removeItem('activeStreamId');
    this.updateState({ isStreaming: false, streamId: undefined });
  }

  updateViewerCount(count: number): void {
    this.updateState({ viewerCount: count });
  }
}


