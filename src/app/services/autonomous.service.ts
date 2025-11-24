import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Autonomous {
  _id?: string;
  name: string;
  description: string;
  score: number;
  category?: string;
  price?: number;
}

export interface AutonomousListResponse {
  products: Autonomous[];
  total: number;
  page: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root',
})
export class AutonomousService {
  private apiUrl = `${environment.apiUrl}/autonomous`;

  constructor(private http: HttpClient) {}

  // GET /autonomous/all - Listar todos los productos autónomos
  getAllAutonomous(
    page: number = 1,
    limit: number = 20,
    category?: string,
    minPrice?: number,
    maxPrice?: number
  ): Observable<any> {
    // Usar /all que tiene datos reales
    return this.http.get<any>(`${this.apiUrl}/all`);
  }

  // GET /ranking/autonomous/:id - Obtener detalle de autónomo por ID
  getAutonomousById(id: string): Observable<Autonomous> {
    return this.http.get<Autonomous>(`${environment.apiUrl}/ranking/autonomous/${id}`);
  }

  // Métodos para administración (requieren autenticación y permisos)
  createAutonomous(data: Autonomous): Observable<Autonomous> {
    return this.http.post<Autonomous>(this.apiUrl, data);
  }

  updateAutonomous(id: string, data: Partial<Autonomous>): Observable<Autonomous> {
    return this.http.put<Autonomous>(`${this.apiUrl}/${id}`, data);
  }

  deleteAutonomous(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }

  // GET /autonomous/category/:categoria - Por categoría
  getByCategory(categoria: string, page: number = 1, limit: number = 20): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get(`${this.apiUrl}/category/${categoria}`, { params });
  }

  // Método para obtener ranking de autónomos
  getAutonomousRanking(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/ranking/autonomous`);
  }
}
