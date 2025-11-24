import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface CalculateRequest {
  productId: string;
  planType: string;
  paymentMethod: string;
}

export interface CalculateResponse {
  success: boolean;
  data: {
    basePrice: number;
    discount: number;
    tax: number;
    total: number;
    breakdown: {
      subtotal: number;
      taxAmount: number;
      finalTotal: number;
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  private apiUrl = `${environment.apiUrl}/calculator`;

  constructor(private http: HttpClient) { }

  // POST /calculator - Calcular precio con descuentos/impuestos
  calculate(data: CalculateRequest): Observable<CalculateResponse> {
    return this.http.post<CalculateResponse>(this.apiUrl, data);
  }
}
