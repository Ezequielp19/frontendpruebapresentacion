import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface RankingItem {
  position: number;
  id: string;
  name: string;
  rating: number;
  salesCount: number;
  reviewCount: number;
}

export interface RankingResponse {
  ranking: RankingItem[];
  period: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class RankingService {
  private apiUrl = `${environment.apiUrl}/ranking`;

  constructor(private http: HttpClient) {}

  // GET /ranking - Obtener ranking de productos/vendedores/profesionales
  getRanking(
    type: 'products' | 'providers' | 'professionals',
    period: 'week' | 'month' | 'year' | 'all' = 'month',
    category?: string,
    limit: number = 10
  ): Observable<RankingResponse> {
    let params = new HttpParams()
      .set('type', type)
      .set('period', period)
      .set('limit', limit.toString());

    if (category) params = params.set('category', category);

    return this.http.get<RankingResponse>(this.apiUrl, { params });
  }

  // Métodos legacy para compatibilidad
  getRankings(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createRanking(name: string, score: number): Observable<any> {
    return this.http.post<any>(this.apiUrl, { name, score });
  }
}

