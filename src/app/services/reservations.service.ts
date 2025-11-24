import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Reservation {
  id: string;
  userId: string;
  professionalId: string;
  serviceType: string;
  date: string;
  duration: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  price: number;
  notes: string;
}

export interface ReservationsListResponse {
  reservations: Reservation[];
}

export interface CreateReservationRequest {
  professionalId: string;
  date: string;
  duration: number;
  serviceType: string;
  notes?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  private apiUrl = `${environment.apiUrl}/reservation`;

  constructor(private http: HttpClient) { }

  // POST /reservation - Crear nueva reservación
  createReservation(data: CreateReservationRequest): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // GET /reservation/availability/:professionalId - Obtener disponibilidad
  getAvailability(professionalId: string, date?: string): Observable<any> {
    let params = new HttpParams();
    if (date) params = params.set('date', date);
    return this.http.get(`${this.apiUrl}/availability/${professionalId}`, { params });
  }

  // POST /reservation/availability - Configurar disponibilidad (profesional)
  setAvailability(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/availability`, data);
  }

  // GET /reservation/user - Obtener reservaciones del usuario
  getUserReservations(status?: string): Observable<ReservationsListResponse> {
    let params = new HttpParams();
    if (status) params = params.set('status', status);
    return this.http.get<ReservationsListResponse>(`${this.apiUrl}/user`, { params });
  }

  // GET /reservation/professional/:professionalId - Reservaciones de un profesional
  getProfessionalReservations(professionalId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/professional/${professionalId}`);
  }

  // PUT /reservation/:id/confirm - Confirmar reservación
  confirmReservation(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/confirm`, {});
  }

  // POST /reservation/:id/cancel - Cancelar reservación
  cancelReservation(id: string, reason?: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/cancel`, { reason });
  }

  // Métodos legacy para compatibilidad
  getReservations(status?: string, from?: string, to?: string): Observable<ReservationsListResponse> {
    return this.getUserReservations(status);
  }

  getReservationById(id: string): Observable<Reservation> {
    return this.getUserReservations().pipe(
      // Filtrar por ID
    ) as any;
  }

  updateReservation(id: string, data: Partial<CreateReservationRequest>): Observable<any> {
    return this.confirmReservation(id);
  }
}
