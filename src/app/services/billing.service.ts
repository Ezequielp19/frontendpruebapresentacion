import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Invoice {
  id: string;
  userId: string;
  orderId: string;
  invoiceNumber: string;
  date: string;
  amount: number;
  status: string;
  items: any[];
}

export interface CreateInvoiceRequest {
  orderId: string;
  items: any[];
  totalAmount: number;
  customerInfo: any;
}

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  private apiUrl = `${environment.apiUrl}/billing`;

  constructor(private http: HttpClient) { }

  // GET /billing/health - Health check
  healthCheck(): Observable<any> {
    return this.http.get(`${this.apiUrl}/health`);
  }

  // POST /billing/invoices - Crear factura
  createInvoice(data: CreateInvoiceRequest): Observable<Invoice> {
    return this.http.post<Invoice>(`${this.apiUrl}/invoices`, data);
  }

  // GET /billing/invoices/:id - Obtener factura
  getInvoice(invoiceId: string): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.apiUrl}/invoices/${invoiceId}`);
  }

  // GET /billing/invoices/:id/pdf - Obtener PDF de factura
  getInvoicePDF(invoiceId: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/invoices/${invoiceId}/pdf`, {
      responseType: 'blob'
    });
  }

  // GET /billing/invoices/:id/download - Descargar factura
  downloadInvoice(invoiceId: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/invoices/${invoiceId}/download`, {
      responseType: 'blob'
    });
  }
}
