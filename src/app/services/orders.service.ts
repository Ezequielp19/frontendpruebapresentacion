import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Order {
  orderNumber: string;
  userId: string;
  items: any[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: any;
  paymentInfo: any;
  createdAt: string;
}

export interface OrderListResponse {
  orders: Order[];
  total: number;
  page: number;
  totalPages: number;
}

export interface CreateOrderRequest {
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
}

export interface ShippingCalculateRequest {
  destination: {
    zipCode: string;
    country: string;
  };
  items: any[];
}

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl = `${environment.apiUrl}/order`;

  constructor(private http: HttpClient) { }

  // GET /order - Listar órdenes del usuario
  getOrders(
    status?: string,
    page: number = 1,
    limit: number = 20
  ): Observable<OrderListResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (status) params = params.set('status', status);

    return this.http.get<OrderListResponse>(this.apiUrl, { params });
  }

  // GET /order/:orderId - Obtener detalle de una orden específica
  getOrderById(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${orderId}`);
  }

  // POST /order/create - Crear nueva orden desde el carrito
  createOrder(data: CreateOrderRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, data);
  }

  // POST /order/:orderId/cancel - Cancelar una orden
  cancelOrder(orderId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${orderId}/cancel`, {});
  }

  // POST /order/calculate-shipping - Calcular costo de envío
  calculateShipping(data: ShippingCalculateRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/calculate-shipping`, data);
  }

  // POST /order/validate-stock - Validar stock disponible
  validateStock(): Observable<any> {
    return this.http.post(`${this.apiUrl}/validate-stock`, {});
  }

  // PUT /order/:orderId/status - Actualizar estado de la orden (admin)
  updateOrderStatus(orderId: string, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${orderId}/status`, { status });
  }

  // PUT /order/:orderId/tracking - Actualizar tracking de envío
  updateTracking(orderId: string, trackingNumber: string, carrier: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${orderId}/tracking`, { trackingNumber, carrier });
  }
}
