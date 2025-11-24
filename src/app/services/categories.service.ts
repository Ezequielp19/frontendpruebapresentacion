import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
  subcategories: Category[];
}

export interface CategoriesResponse {
  categories: Category[];
}

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private apiUrl = `${environment.apiUrl}/categorie`;

  constructor(private http: HttpClient) { }

  // GET /categorie - Listar todas las categorías (público)
  getAllCategories(): Observable<CategoriesResponse> {
    return this.http.get<CategoriesResponse>(this.apiUrl);
  }

  // POST /categorie/get_data - Obtener categorías con autenticación
  getCategoriesAuth(): Observable<CategoriesResponse> {
    return this.http.post<CategoriesResponse>(`${this.apiUrl}/get_data`, {});
  }
}
