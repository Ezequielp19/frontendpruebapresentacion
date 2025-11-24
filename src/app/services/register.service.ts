import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface RegisterRequest {
  email: string;
  password: string;
  verificationCode: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface RegisterResponse {
  success: boolean;
  message?: string;
  user?: any;
  token?: string;
}

export interface VerificationRequest {
  email: string;
}

export interface VerificationResponse {
  success: boolean;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // POST /code - Solicitar código de registro/verificación
  requestCode(data: VerificationRequest): Observable<VerificationResponse> {
    return this.http.post<VerificationResponse>(`${this.apiUrl}/code`, data);
  }

  // POST /users - Registrar nuevo usuario (verificar endpoint exacto)
  register(userData: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/users`, userData);
  }

  // Método auxiliar para verificar si el email ya existe
  checkEmailExists(email: string): Observable<{ exists: boolean }> {
    return this.http.get<{ exists: boolean }>(`${environment.apiUrl}/users/check-email?email=${email}`);
  }
}
