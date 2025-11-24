import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Provider {
  id: string;
  businessName: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  logo: string;
  description: string;
  contact: any;
}

export interface ProvidersListResponse {
  providers: Provider[];
}

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {
  private apiUrl = `${environment.apiUrl}/providers`;

  constructor(private http: HttpClient) { }

  // GET /providers - Listar proveedores (público)
  getAllProviders(
    verified?: boolean,
    rating?: number,
    page: number = 1,
    limit: number = 20
  ): Observable<ProvidersListResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (verified !== undefined) params = params.set('verified', verified.toString());
    if (rating) params = params.set('rating', rating.toString());

    return this.http.get<ProvidersListResponse>(this.apiUrl, { params });
  }

  // GET /providers/:id - Obtener detalle de proveedor
  getProviderById(id: string): Observable<Provider> {
    return this.http.get<Provider>(`${this.apiUrl}/${id}`);
  }

  // GET /providers/pending - Proveedores pendientes de aprobación (admin)
  getPendingProviders(): Observable<any> {
    return this.http.get(`${this.apiUrl}/pending`);
  }

  // POST /providers - Crear nuevo proveedor
  createProvider(data: any): Observable<Provider> {
    return this.http.post<Provider>(this.apiUrl, data);
  }

  // PUT /providers/:id - Actualizar proveedor
  updateProvider(id: string, data: Partial<Provider>): Observable<Provider> {
    return this.http.put<Provider>(`${this.apiUrl}/${id}`, data);
  }

  // POST /providers/:providerId/approve - Aprobar proveedor (admin)
  approveProvider(providerId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${providerId}/approve`, {});
  }

  // POST /providers/:providerId/reject - Rechazar proveedor (admin)
  rejectProvider(providerId: string, reason?: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${providerId}/reject`, { reason });
  }

  // GET /providers/:id/products - Productos de un proveedor específico (legacy - no existe en backend)
  getProviderProducts(id: string): Observable<any> {
    // Este endpoint no existe en el backend actual
    // Podría implementarse buscando productos por providerId
    return this.http.get(`${this.apiUrl}/${id}/products`);
  }
}
