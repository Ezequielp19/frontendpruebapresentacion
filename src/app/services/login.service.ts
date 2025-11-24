import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    email: string;
    role: string;
    flags: {
      isProvider: boolean;
      isProfessional: boolean;
    };
  };
  message?: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // POST /login
  login(credentials: LoginRequest): Observable<LoginResponse> {
    // Mapear 'password' a 'contraseña' para el backend
    const body = {
      email: credentials.email,
      contraseña: credentials.password
    };
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, body);
  }

  // POST /logout (si existe)
  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {});
  }

  // POST /auth/refresh-token
  refreshToken(refreshToken: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/refresh-token`, { refreshToken });
  }

  // POST /password/forgot
  forgotPassword(data: ForgotPasswordRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/password/forgot`, data);
  }

  // POST /password/reset
  resetPassword(data: ResetPasswordRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/password/reset`, data);
  }
}
