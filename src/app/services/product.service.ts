import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/productType`;

  constructor(private http: HttpClient) {}

  // GET /productType - Listar tipos de productos
  getProductTypes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // POST /productType/get_details - Obtener detalles de producto (con auth)
  getProductDetails(productId: string): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers: any = {};

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return this.http.post(`${this.apiUrl}/get_details`, { productId }, { headers });
  }

  // POST /productType/get_all - Obtener todos los productos (con auth)
  getAllProducts(): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers: any = {};

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return this.http.post(`${this.apiUrl}/get_all`, {}, { headers });
  }

  // POST /productType/search - Buscar productos
  searchProducts(query: string, filters?: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/search`, { query, ...filters });
  }

  // POST /productType - Crear producto (auth)
  createProduct(productData: any): Observable<any> {
    return this.http.post(this.apiUrl, productData);
  }

  // POST /productType/product-types - Crear tipo de producto (alias)
  createProductType(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/product-types`, data);
  }

  // PUT /productType/:id - Actualizar producto
  updateProduct(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  // DELETE /productType/:id - Eliminar producto
  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // POST /productType/change_access - Cambiar acceso del producto
  changeProductAccess(productId: string, access: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/change_access`, { productId, access });
  }

  // POST /productType/associate - Asociar producto
  associateProduct(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/associate`, data);
  }

  // PUT /productType/:id/stock - Actualizar stock
  updateStock(id: string, quantity: number, operation: 'add' | 'subtract'): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/stock`, { quantity, operation });
  }

  // GET /productType/:id/stock/history - Historial de stock
  getStockHistory(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/stock/history`);
  }

  // GET /productType/stock/low - Productos con stock bajo
  getLowStockProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/stock/low`);
  }

  // GET /productType/public/seller/:sellerId/:sellerType - Productos de vendedor (PÚBLICO - sin autenticación)
  getPublicProductsBySeller(sellerId: string, sellerType: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/public/seller/${sellerId}/${sellerType}`);
  }

  // Métodos legacy para compatibilidad
  addProduct(productData: any): Observable<any> {
    return this.createProduct(productData);
  }

  addCompleteProduct(productData: any): Observable<any> {
    return this.createProduct(productData);
  }

  // Integración con ranking
  getRankings(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/ranking`);
  }

  createRanking(name: string, score: number): Observable<any> {
    return this.http.post(`${environment.apiUrl}/ranking`, { name, score });
  }
}
