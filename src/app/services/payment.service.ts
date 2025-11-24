import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AuthorizePaymentRequest {
  amount: number;
  currency: string;
  paymentMethod: 'paypal' | 'stripe' | 'card';
  orderId: string;
}

export interface CapturePaymentRequest {
  authorizationId: string;
  amount?: number;
}

export interface RefundPaymentRequest {
  paymentId: string;
  amount?: number;
  reason?: string;
}

export interface PaymentMethod {
  id: string;
  type: string;
  name: string;
  enabled: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = `${environment.apiUrl}/payment`;

  constructor(private http: HttpClient) { }

  // POST /payment/authorize - Autorizar pago
  authorizePayment(data: AuthorizePaymentRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/authorize`, data);
  }

  // POST /payment/capture - Capturar pago autorizado
  capturePayment(data: CapturePaymentRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/capture`, data);
  }

  // POST /payment/refund - Procesar reembolso
  refundPayment(data: RefundPaymentRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/refund`, data);
  }

  // GET /payment/methods - Obtener métodos de pago disponibles
  getPaymentMethods(): Observable<{ methods: PaymentMethod[] }> {
    return this.http.get<{ methods: PaymentMethod[] }>(`${this.apiUrl}/methods`);
  }

  // GET /payment/status/:paymentId - Obtener estado de un pago
  getPaymentStatus(paymentId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/status/${paymentId}`);
  }

  // Método legacy para compatibilidad
  processPayment(paymentData: any): Observable<any> {
    return this.authorizePayment(paymentData);
  }
}
