import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface WishlistItem {
  productId: string;
  productName: string;
  productImage: string;
  currentPrice: number;
  originalPrice: number;
  addedAt: string;
  priceAlertEnabled: boolean;
  alertThreshold: number;
}

export interface Wishlist {
  userId: string;
  items: WishlistItem[];
}

export interface AddToWishlistRequest {
  productId: string;
  enablePriceAlert?: boolean;
  alertThreshold?: number;
}

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private apiUrl = `${environment.apiUrl}/wishlist`;

  constructor(private http: HttpClient) { }

  // GET /wishlist - Obtener wishlist del usuario
  getWishlist(): Observable<{ success: boolean; wishlist: Wishlist }> {
    return this.http.get<{ success: boolean; wishlist: Wishlist }>(this.apiUrl);
  }

  // POST /wishlist/add - Agregar producto a wishlist
  addToWishlist(data: AddToWishlistRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, data);
  }

  // DELETE /wishlist/remove/:productId - Eliminar producto de wishlist
  removeFromWishlist(productId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove/${productId}`);
  }

  // PUT /wishlist/price-alert/:productId - Actualizar alerta de precio
  updatePriceAlert(productId: string, enabled: boolean, threshold: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/price-alert/${productId}`, { enabled, threshold });
  }

  // DELETE /wishlist/clear - Limpiar toda la wishlist
  clearWishlist(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/clear`);
  }

  // POST /wishlist/move-to-cart - Mover productos de wishlist a carrito
  moveToCart(productIds: string[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/move-to-cart`, { productIds });
  }
}
