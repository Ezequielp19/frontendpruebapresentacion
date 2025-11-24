import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebrtcService {

  private socket!: Socket;
  private localStream: MediaStream | null = null;
  private peerConnection!: RTCPeerConnection;
  private config: RTCConfiguration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };


  constructor() {
    this.socket = io('http://27017:5000');
    this.peerConnection = new RTCPeerConnection(this.config);

    this.socket.on('offer', async (offer: RTCSessionDescriptionInit) => {
      await this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await this.peerConnection.createAnswer();
      await this.peerConnection.setLocalDescription(answer);
      this.socket.emit('answer', answer);
    });

    this.socket.on('answer', async (answer: RTCSessionDescriptionInit) => {
      await this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    });

    this.socket.on('candidate', (candidate: RTCIceCandidateInit) => {
      this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    });

    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.socket.emit('candidate', event.candidate);
      }
    };

    this.peerConnection.ontrack = (event) => {
      const remoteVideo = document.getElementById('remoteVideo') as HTMLVideoElement;
      if (remoteVideo) {
        remoteVideo.srcObject = event.streams[0];
      }
    };
  }

  async startStreaming() {
    try {

      this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      this.localStream.getTracks().forEach(track => {
        this.peerConnection.addTrack(track, this.localStream!);
      });
      const offer = await this.peerConnection.createOffer();
      await this.peerConnection.setLocalDescription(offer);
      this.socket.emit('offer', offer);
      const localVideo = document.getElementById('localVideo') as HTMLVideoElement;
      if (localVideo) {
        localVideo.srcObject = this.localStream;
      }

    } catch (error) {
      if(error === 'NotFoundError' || error === 'DevicesNotFoundError') {
        console.error("El dispositivo solicitado no se encontró.");
        alert("No se encontró la cámara o el micrófono. Por favor, verifica que estén conectados y configurados correctamente.");  
      }else{
        console.error("Error al acceder al dispositivo:", error);

      }
    }

  }
}

