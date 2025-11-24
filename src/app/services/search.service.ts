import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface SearchResult {
  results: any[];
  total: number;
  page: number;
  facets: {
    categories: any[];
    priceRanges: any[];
  };
}

export interface AutocompleteResponse {
  suggestions: string[];
}

export interface PopularSearchesResponse {
  popularSearches: string[];
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = `${environment.apiUrl}/search`;

  constructor(private http: HttpClient) { }

  // GET /search - Búsqueda general de productos
  search(
    query: string,
    category?: string,
    type?: string,
    minPrice?: number,
    maxPrice?: number,
    page: number = 1,
    limit: number = 20
  ): Observable<SearchResult> {
    let params = new HttpParams()
      .set('q', query)
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (category) params = params.set('category', category);
    if (type) params = params.set('type', type);
    if (minPrice !== undefined) params = params.set('minPrice', minPrice.toString());
    if (maxPrice !== undefined) params = params.set('maxPrice', maxPrice.toString());

    return this.http.get<SearchResult>(this.apiUrl, { params });
  }

  // GET /search/autocomplete - Autocompletado de búsqueda
  autocomplete(query: string, limit: number = 10): Observable<AutocompleteResponse> {
    let params = new HttpParams()
      .set('q', query)
      .set('limit', limit.toString());

    return this.http.get<AutocompleteResponse>(`${this.apiUrl}/autocomplete`, { params });
  }

  // GET /search/popular - Búsquedas populares
  getPopularSearches(): Observable<PopularSearchesResponse> {
    return this.http.get<PopularSearchesResponse>(`${this.apiUrl}/popular`);
  }

  // GET /search/top-professionals - Top profesionales (correcto)
  getTopProfessionals(
    category?: string,
    location?: string,
    limit: number = 10
  ): Observable<any> {
    let params = new HttpParams();
    if (category) params = params.set('category', category);
    if (location) params = params.set('location', location);
    if (limit) params = params.set('limit', limit.toString());
    return this.http.get(`${this.apiUrl}/top-professionals`, { params });
  }

  // GET /search/category/:categoryId - Búsqueda por categoría
  searchByCategory(categoryId: string, page: number = 1, limit: number = 20): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get(`${this.apiUrl}/category/${categoryId}`, { params });
  }

  // GET /search/related/:productId - Productos relacionados
  getRelatedProducts(productId: string, limit: number = 10): Observable<any> {
    let params = new HttpParams().set('limit', limit.toString());
    return this.http.get(`${this.apiUrl}/related/${productId}`, { params });
  }

  // Método legacy
  searchProfessionals(category?: string, location?: string, limit: number = 10): Observable<any> {
    return this.getTopProfessionals(category, location, limit);
  }
}
