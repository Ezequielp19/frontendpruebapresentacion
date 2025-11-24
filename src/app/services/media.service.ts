import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface UploadResponse {
  success: boolean;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private apiUrl = `${environment.apiUrl}/media-upload`;

  constructor(private http: HttpClient) { }

  // POST /media-upload/upload/image - Subir una imagen
  uploadImage(file: File): Observable<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<UploadResponse>(`${this.apiUrl}/upload/image`, formData);
  }

  // POST /media-upload/upload/images - Subir múltiples imágenes
  uploadImages(files: File[]): Observable<UploadResponse> {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    return this.http.post<UploadResponse>(`${this.apiUrl}/upload/images`, formData);
  }

  // POST /media-upload/upload/video - Subir video
  uploadVideo(file: File): Observable<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<UploadResponse>(`${this.apiUrl}/upload/video`, formData);
  }

  // POST /media-upload/optimize - Optimizar imagen
  optimizeImage(file: File): Observable<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<UploadResponse>(`${this.apiUrl}/optimize`, formData);
  }

  // POST /media-upload/thumbnail - Generar thumbnail
  generateThumbnail(file: File, width?: number, height?: number): Observable<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    if (width) formData.append('width', width.toString());
    if (height) formData.append('height', height.toString());
    return this.http.post<UploadResponse>(`${this.apiUrl}/thumbnail`, formData);
  }

  // POST /media-upload/convert-webp - Convertir a WebP
  convertToWebP(file: File): Observable<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<UploadResponse>(`${this.apiUrl}/convert-webp`, formData);
  }

  // POST /media-upload/compress - Comprimir imagen
  compressImage(file: File, quality?: number): Observable<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    if (quality) formData.append('quality', quality.toString());
    return this.http.post<UploadResponse>(`${this.apiUrl}/compress`, formData);
  }

  // GET /media-upload/info/:filename - Obtener información de archivo
  getFileInfo(filename: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/info/${filename}`);
  }

  // DELETE /media-upload/:filename - Eliminar archivo
  deleteFile(filename: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${filename}`);
  }

  // Métodos legacy/alias para compatibilidad
  uploadProductImage(file: File): Observable<UploadResponse> {
    return this.uploadImage(file);
  }

  uploadAvatar(file: File): Observable<UploadResponse> {
    return this.uploadImage(file);
  }

  uploadReviewImage(file: File): Observable<UploadResponse> {
    return this.uploadImage(file);
  }
}
