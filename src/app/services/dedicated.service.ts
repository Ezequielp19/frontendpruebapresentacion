import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Dedicated {
  _id?: string;
  name: string;
  description: string;
  score: number;
  category?: string;
  price?: number;
}

export interface DedicatedListResponse {
  products: Dedicated[];
  total: number;
  page: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root',
})
export class DedicatedService {
  private apiUrl = `${environment.apiUrl}/dedicated`;

  constructor(private http: HttpClient) {}

  // GET /dedicated - Listar productos dedicados (devuelve array directo)
  getAllDedicated(
    page: number = 1,
    limit: number = 20,
    category?: string,
    minPrice?: number,
    maxPrice?: number
  ): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (category) params = params.set('category', category);
    if (minPrice !== undefined) params = params.set('minPrice', minPrice.toString());
    if (maxPrice !== undefined) params = params.set('maxPrice', maxPrice.toString());

    return this.http.get<any>(this.apiUrl, { params });
  }

  // GET /ranking/dedicated/:id - Obtener detalle de dedicado por ID
  getDedicatedById(id: string): Observable<Dedicated> {
    return this.http.get<Dedicated>(`${environment.apiUrl}/ranking/dedicated/${id}`);
  }

  // Métodos para administración (requieren autenticación y permisos)
  createDedicated(data: Dedicated): Observable<Dedicated> {
    return this.http.post<Dedicated>(`${this.apiUrl}/crear`, data);
  }

  updateDedicated(id: string, data: Partial<Dedicated>): Observable<Dedicated> {
    return this.http.put<Dedicated>(`${this.apiUrl}/${id}`, data);
  }

  deleteDedicated(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }

  // Método para obtener ranking de dedicados
  getDedicatedRanking(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/ranking/dedicated`);
  }
}

