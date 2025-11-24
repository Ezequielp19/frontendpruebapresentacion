import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Conversation {
  id: string;
  participants: any[];
  lastMessage: {
    content: string;
    timestamp: string;
    senderId: string;
  };
  unreadCount: number;
  status: string;
}

export interface ConversationsResponse {
  conversations: Conversation[];
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  attachments: string[];
  timestamp: string;
  read: boolean;
}

export interface CreateConversationRequest {
  recipientId: string;
  message: string;
}

export interface SendMessageRequest {
  conversationId: string;
  content: string;
  attachments?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private apiUrl = `${environment.apiUrl}/messages`;

  constructor(private http: HttpClient) { }

  // GET /messages/conversations - Listar conversaciones del usuario
  getConversations(): Observable<ConversationsResponse> {
    return this.http.get<ConversationsResponse>(`${this.apiUrl}/conversations`);
  }

  // GET /messages/:conversationId - Obtener mensajes de una conversación
  getConversationMessages(
    conversationId: string,
    limit: number = 50,
    before?: string
  ): Observable<any> {
    let params = new HttpParams().set('limit', limit.toString());

    if (before) params = params.set('before', before);

    return this.http.get(`${this.apiUrl}/${conversationId}`, { params });
  }

  // GET /messages/unread-count - Contar mensajes no leídos
  getUnreadCount(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.apiUrl}/unread-count`);
  }

  // GET /messages/search - Buscar mensajes
  searchMessages(query: string): Observable<any> {
    const params = new HttpParams().set('q', query);
    return this.http.get(`${this.apiUrl}/search`, { params });
  }

  // POST /messages/send - Enviar mensaje
  sendMessage(data: SendMessageRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/send`, data);
  }

  // PUT /messages/:conversationId/read - Marcar conversación como leída
  markConversationAsRead(conversationId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${conversationId}/read`, {});
  }

  // PUT /messages/:messageId/edit - Editar mensaje
  editMessage(messageId: string, content: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${messageId}/edit`, { content });
  }

  // DELETE /messages/:messageId - Eliminar mensaje
  deleteMessage(messageId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${messageId}`);
  }

  // PUT /messages/:conversationId/archive - Archivar conversación
  archiveConversation(conversationId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${conversationId}/archive`, {});
  }

  // PUT /messages/:conversationId/block - Bloquear conversación
  blockConversation(conversationId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${conversationId}/block`, {});
  }

  // POST /messages/typing - Evento "escribiendo..."
  sendTypingIndicator(conversationId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/typing`, { conversationId });
  }
}
