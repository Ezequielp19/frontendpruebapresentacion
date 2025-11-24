import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Professional {
  _id?: string;
  name: string;
  profession: string;
  experience: number;
  score: number;
  category?: string;
  description?: any;
  rating?: number;
  location?: string;
  hourlyRate?: number;
  available?: boolean;
}

export interface ProfessionalListResponse {
  professionals: Professional[];
  total?: number;
  page?: number;
  totalPages?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProfessionalService {
  private apiUrl = `${environment.apiUrl}/professional`;

  constructor(private http: HttpClient) {}

  // GET /professional - Listar servicios profesionales (devuelve array directo)
  getAllProfessionals(
    category?: string,
    rating?: number,
    location?: string,
    available?: boolean
  ): Observable<any> {
    let params = new HttpParams();

    if (category) params = params.set('category', category);
    if (rating !== undefined) params = params.set('rating', rating.toString());
    if (location) params = params.set('location', location);
    if (available !== undefined) params = params.set('available', available.toString());

    return this.http.get<any>(this.apiUrl, { params });
  }

  // GET /ranking/professional/:id - Obtener perfil de profesional por ID
  getProfessionalById(id: string): Observable<Professional> {
    return this.http.get<Professional>(`${environment.apiUrl}/ranking/professional/${id}`);
  }

  // GET /professional/:id/availability - Ver disponibilidad de un profesional
  getProfessionalAvailability(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/availability`);
  }

  // Obtener profesionales por categoría
  getProfessionalsByCategory(category: string): Observable<Professional[]> {
    return this.http.get<Professional[]>(`${this.apiUrl}/category/${category}`);
  }

  // Métodos para administración (requieren autenticación y permisos)
  createProfessional(data: Professional): Observable<Professional> {
    return this.http.post<Professional>(this.apiUrl, data);
  }

  updateProfessional(id: string, data: Partial<Professional>): Observable<Professional> {
    return this.http.put<Professional>(`${this.apiUrl}/${id}`, data);
  }

  deleteProfessional(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}

