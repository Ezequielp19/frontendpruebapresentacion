import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface PersonalInfo {
  name: string;
  lastName: string;
  dni: string;
  email: string;
  areaCode: string;
  phone: string;
  location: string;
  birthDate: string;
  receiveNews: boolean;
}

export interface VehicleInfo {
  type: string;
  brand: string;
  model: string;
  year: number;
  licensePlate: string;
  color: string;
  kilometers: number;
  blueCard?: File;
  images?: File[];
  receiveNews: boolean;
}

export interface ProfileInfo {
  username: string;
  accountName: string;
  description: string;
  profileImage?: File;
}

export interface AccountInfo {
  email: string;
  phone: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // GET /users/profile - Obtener perfil del usuario autenticado
  getCurrentUserProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/profile`);
  }

  // POST /users/profile/update - Actualizar perfil del usuario
  updateProfile(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/profile/update`, data);
  }

  // POST /users/personal-info - Guardar información personal
  savePersonalInfo(data: PersonalInfo): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/personal-info`, data);
  }

  // PUT /users/account-info - Actualizar información de cuenta
  updateAccountInfo(data: AccountInfo): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/account-info`, data);
  }

  // PUT /users/update-role - Actualizar rol del usuario (admin)
  updateUserRole(role: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/update-role`, { role });
  }

  // PUT /users/edit_user - Editar usuario
  editUser(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/edit_user`, data);
  }

  // DELETE /users/delete_user - Eliminar usuario
  deleteUser(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/delete_user`);
  }

  // GET /users/get_data - Obtener datos del usuario (auth)
  getUserData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/get_data`);
  }

  // GET /users/:userId - Obtener perfil público de un usuario (legacy)
  getUserProfile(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${userId}`);
  }

  // Métodos legacy para compatibilidad
  saveVehicleInfo(data: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/vehicles/vehicles`, data);
  }

  saveProfileInfo(data: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/profile/update`, data);
  }

  // Cambio de contraseña - usar password.routes
  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/password/change`, {
      currentPassword,
      newPassword
    });
  }
}
