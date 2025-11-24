import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Vehicle {
  id?: string;
  type: string;
  brand: string;
  model: string;
  year: number;
  licensePlate: string;
  available: boolean;
  pricePerDay?: number;
}

export interface VehiclesListResponse {
  vehicles: Vehicle[];
}

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private apiUrl = `${environment.apiUrl}/vehicle`;

  constructor(private http: HttpClient) {}

  // GET /vehicle - Listar vehículos disponibles (público)
  getVehicles(filters: {
    type?: string;
    brand?: string;
    year?: number;
    available?: boolean;
  } = {}): Observable<VehiclesListResponse> {
    let params = new HttpParams();

    if (filters.type) params = params.set('type', filters.type);
    if (filters.brand) params = params.set('brand', filters.brand);
    if (filters.year) params = params.set('year', filters.year.toString());
    if (filters.available !== undefined) params = params.set('available', filters.available.toString());

    return this.http.get<VehiclesListResponse>(this.apiUrl, { params });
  }

  // GET /vehicles/:id - Obtener detalle de vehículo
  getVehicleById(id: string): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.apiUrl}/${id}`);
  }

  // Métodos para administración (requieren autenticación y permisos)
  createVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.apiUrl, vehicle);
  }

  updateVehicle(id: string, vehicle: Partial<Vehicle>): Observable<Vehicle> {
    return this.http.put<Vehicle>(`${this.apiUrl}/${id}`, vehicle);
  }

  deleteVehicle(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // PATCH /vehicles/:id/driver-status - Actualizar estado de conductor
  updateDriverStatus(id: string, status: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/driver-status`, { status });
  }
}
