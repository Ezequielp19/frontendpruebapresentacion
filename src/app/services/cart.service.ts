import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface CartItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  subtotal: number;
  providerId: string;
}

export interface Cart {
  userId: string;
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  lastUpdated: string;
}

export interface AddToCartRequest {
  productId: string;
  quantity: number;
  productData: {
    name: string;
    price: number;
    image: string;
    providerId: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = `${environment.apiUrl}/cart`;

  constructor(private http: HttpClient) { }

  // GET /cart - Obtener carrito del usuario autenticado
  getCart(): Observable<{ success: boolean; cart: Cart }> {
    return this.http.get<{ success: boolean; cart: Cart }>(this.apiUrl);
  }

  // POST /cart/add - Agregar producto al carrito
  addToCart(data: AddToCartRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, data);
  }

  // PUT /cart/update/:productId - Actualizar cantidad de producto en carrito
  updateCartItem(productId: string, quantity: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${productId}`, { quantity });
  }

  // DELETE /cart/remove/:productId - Eliminar producto del carrito
  removeFromCart(productId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove/${productId}`);
  }

  // DELETE /cart/clear - Vaciar todo el carrito
  clearCart(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/clear`);
  }

  // POST /cart/sync - Sincronizar carrito
  syncCart(items: any[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/sync`, { items });
  }

  // POST /cart/validate - Validar disponibilidad de productos en carrito
  validateCart(): Observable<any> {
    return this.http.post(`${this.apiUrl}/validate`, {});
  }
}
