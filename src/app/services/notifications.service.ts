import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  data: any;
  read: boolean;
  createdAt: string;
}

export interface NotificationsResponse {
  notifications: Notification[];
  unreadCount: number;
}

export interface UnreadCountResponse {
  unreadCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private apiUrl = `${environment.apiUrl}/notifications`;

  constructor(private http: HttpClient) { }

  // GET /notifications - Listar notificaciones del usuario
  getNotifications(
    unreadOnly: boolean = false,
    limit: number = 20,
    page: number = 1
  ): Observable<NotificationsResponse> {
    let params = new HttpParams()
      .set('limit', limit.toString())
      .set('page', page.toString());

    if (unreadOnly) params = params.set('unreadOnly', 'true');

    return this.http.get<NotificationsResponse>(this.apiUrl, { params });
  }

  // GET /notifications/unread-count - Obtener contador de no leídas
  getUnreadCount(): Observable<UnreadCountResponse> {
    return this.http.get<UnreadCountResponse>(`${this.apiUrl}/unread-count`);
  }

  // PUT /notifications/:id/read - Marcar notificación como leída
  markAsRead(notificationId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${notificationId}/read`, {});
  }

  // PUT /notifications/read-all - Marcar todas como leídas
  markAllAsRead(): Observable<any> {
    return this.http.put(`${this.apiUrl}/read-all`, {});
  }

  // DELETE /notifications/:id - Eliminar notificación
  deleteNotification(notificationId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${notificationId}`);
  }

  // DELETE /notifications/read - Eliminar todas las notificaciones leídas
  deleteAllRead(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/read`);
  }
}
