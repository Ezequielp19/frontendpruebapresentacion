import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface UbicacionResult {
  id: string;
  nombre: string;
  nombreCompleto: string;
  tipo: 'provincia' | 'municipio' | 'localidad';
  provincia?: string;
  departamento?: string;
}

export interface UbicacionesResponse {
  success: boolean;
  resultados: UbicacionResult[];
  total: number;
  query?: string;
}

export interface ProvinciasResponse {
  success: boolean;
  provincias: UbicacionResult[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class UbicacionesService {
  private apiUrl = `${environment.apiUrl}/ubicaciones`;

  constructor(private http: HttpClient) {}

  /**
   * Buscar ubicaciones (provincias, municipios, localidades)
   * @param query Término de búsqueda
   * @param max Cantidad máxima de resultados (default: 10)
   */
  buscarUbicaciones(query: string, max: number = 10): Observable<UbicacionResult[]> {
    if (!query || query.trim().length < 2) {
      return of([]);
    }

    const params = new HttpParams()
      .set('q', query.trim())
      .set('max', max.toString());

    return this.http.get<UbicacionesResponse>(`${this.apiUrl}/search`, { params })
      .pipe(
        map(response => response.resultados || []),
        catchError(error => {
          console.error('Error al buscar ubicaciones:', error);
          return of([]);
        })
      );
  }

  /**
   * Obtener todas las provincias de Argentina
   */
  obtenerProvincias(): Observable<UbicacionResult[]> {
    return this.http.get<ProvinciasResponse>(`${this.apiUrl}/provincias`)
      .pipe(
        map(response => response.provincias || []),
        catchError(error => {
          console.error('Error al obtener provincias:', error);
          return of([]);
        })
      );
  }

  /**
   * Obtener municipios de una provincia
   * @param provincia Nombre de la provincia
   * @param max Cantidad máxima de resultados (default: 50)
   */
  obtenerMunicipios(provincia: string, max: number = 50): Observable<UbicacionResult[]> {
    const params = new HttpParams()
      .set('provincia', provincia)
      .set('max', max.toString());

    return this.http.get<any>(`${this.apiUrl}/municipios`, { params })
      .pipe(
        map(response => response.municipios || []),
        catchError(error => {
          console.error('Error al obtener municipios:', error);
          return of([]);
        })
      );
  }
}
