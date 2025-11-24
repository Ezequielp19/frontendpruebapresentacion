import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesLivesService {

  private productos: any = {
    electrodomesticos: [
      { id: 1, nombre: 'Refrigerador', descripcion: 'Frío y moderno', precio: 500 },
      { id: 2, nombre: 'Microondas', descripcion: 'Rápido y práctico', precio: 100 },
      { id: 3, nombre: 'Refrigerador', descripcion: 'Frío y moderno', precio: 500 },
      { id: 4, nombre: 'Microondas', descripcion: 'Rápido y práctico', precio: 100 },
      { id: 5, nombre: 'Refrigerador', descripcion: 'Frío y moderno', precio: 500 },
      { id: 6, nombre: 'Microondas', descripcion: 'Rápido y práctico', precio: 100 },
      { id: 7, nombre: 'Refrigerador', descripcion: 'Frío y moderno', precio: 500 },
      { id: 8, nombre: 'Microondas', descripcion: 'Rápido y práctico', precio: 100 },
      { id: 9, nombre: 'Refrigerador', descripcion: 'Frío y moderno', precio: 500 },
      { id: 10, nombre: 'Refrigerador', descripcion: 'Frío y moderno', precio: 500 },
      { id: 11, nombre: 'Microondas', descripcion: 'Rápido y práctico', precio: 100 },
      { id: 12, nombre: 'Refrigerador', descripcion: 'Frío y moderno', precio: 500 },
    ],
    belleza: [
      { id: 1, nombre: 'Refrigerador', descripcion: 'Frío y moderno', precio: 500 },
      { id: 2, nombre: 'Microondas', descripcion: 'Rápido y práctico', precio: 100 },
      { id: 3, nombre: 'Refrigerador', descripcion: 'Frío y moderno', precio: 500 },
      { id: 4, nombre: 'Microondas', descripcion: 'Rápido y práctico', precio: 100 },
      { id: 5, nombre: 'Refrigerador', descripcion: 'Frío y moderno', precio: 500 },
      { id: 6, nombre: 'Microondas', descripcion: 'Rápido y práctico', precio: 100 },
      { id: 7, nombre: 'Refrigerador', descripcion: 'Frío y moderno', precio: 500 },
      { id: 8, nombre: 'Microondas', descripcion: 'Rápido y práctico', precio: 100 },
      { id: 9, nombre: 'Refrigerador', descripcion: 'Frío y moderno', precio: 500 },
      { id: 10, nombre: 'Refrigerador', descripcion: 'Frío y moderno', precio: 500 },
      { id: 11, nombre: 'Microondas', descripcion: 'Rápido y práctico', precio: 100 },
      { id: 12, nombre: 'Refrigerador', descripcion: 'Frío y moderno', precio: 500 },
    ],
    vestimenta: [
      { id: 1, nombre: 'Refrigerador', descripcion: 'Frío y moderno', precio: 500 },
      { id: 2, nombre: 'Microondas', descripcion: 'Rápido y práctico', precio: 100 },
      { id: 3, nombre: 'Refrigerador', descripcion: 'Frío y moderno', precio: 500 },
      { id: 4, nombre: 'Microondas', descripcion: 'Rápido y práctico', precio: 100 },
      { id: 5, nombre: 'Refrigerador', descripcion: 'Frío y moderno', precio: 500 },
      { id: 6, nombre: 'Microondas', descripcion: 'Rápido y práctico', precio: 100 },
      { id: 7, nombre: 'Refrigerador', descripcion: 'Frío y moderno', precio: 500 },
      { id: 8, nombre: 'Microondas', descripcion: 'Rápido y práctico', precio: 100 },
      { id: 9, nombre: 'Refrigerador', descripcion: 'Frío y moderno', precio: 500 },
      { id: 10, nombre: 'Refrigerador', descripcion: 'Frío y moderno', precio: 500 },
      { id: 11, nombre: 'Microondas', descripcion: 'Rápido y práctico', precio: 100 },
      { id: 12, nombre: 'Refrigerador', descripcion: 'Frío y moderno', precio: 500 },
    ],
    cuidado_personal: [
      { id: 1, nombre: 'Refrigerador', descripcion: 'Frío y moderno', precio: 500 },
      { id: 2, nombre: 'Microondas', descripcion: 'Rápido y práctico', precio: 100 },
      { id: 3, nombre: 'Refrigerador', descripcion: 'Frío y moderno', precio: 500 },
      { id: 4, nombre: 'Microondas', descripcion: 'Rápido y práctico', precio: 100 },
      { id: 5, nombre: 'Refrigerador', descripcion: 'Frío y moderno', precio: 500 },
      { id: 6, nombre: 'Microondas', descripcion: 'Rápido y práctico', precio: 100 },
      { id: 7, nombre: 'Refrigerador', descripcion: 'Frío y moderno', precio: 500 },
      { id: 8, nombre: 'Microondas', descripcion: 'Rápido y práctico', precio: 100 },
      { id: 9, nombre: 'Refrigerador', descripcion: 'Frío y moderno', precio: 500 },
      { id: 10, nombre: 'Refrigerador', descripcion: 'Frío y moderno', precio: 500 },
      { id: 11, nombre: 'Microondas', descripcion: 'Rápido y práctico', precio: 100 },
      { id: 12, nombre: 'Refrigerador', descripcion: 'Frío y moderno', precio: 500 },
    ],
    articulos_hogar: [
      { id: 1, nombre: 'Refrigerador', descripcion: 'Frío y moderno', precio: 500 },
      { id: 2, nombre: 'Microondas', descripcion: 'Rápido y práctico', precio: 100 },
      { id: 3, nombre: 'Refrigerador', descripcion: 'Frío y moderno', precio: 500 },
      { id: 4, nombre: 'Microondas', descripcion: 'Rápido y práctico', precio: 100 },
      { id: 5, nombre: 'Refrigerador', descripcion: 'Frío y moderno', precio: 500 },
      { id: 6, nombre: 'Microondas', descripcion: 'Rápido y práctico', precio: 100 },
      { id: 7, nombre: 'Refrigerador', descripcion: 'Frío y moderno', precio: 500 },
      { id: 8, nombre: 'Microondas', descripcion: 'Rápido y práctico', precio: 100 },
      { id: 9, nombre: 'Refrigerador', descripcion: 'Frío y moderno', precio: 500 },
      { id: 10, nombre: 'Refrigerador', descripcion: 'Frío y moderno', precio: 500 },
      { id: 11, nombre: 'Microondas', descripcion: 'Rápido y práctico', precio: 100 },
      { id: 12, nombre: 'Refrigerador', descripcion: 'Frío y moderno', precio: 500 },
    ],
    calzados: [
      { id: 1, nombre: 'Refrigerador', descripcion: 'Frío y moderno', precio: 500 },
      { id: 2, nombre: 'Microondas', descripcion: 'Rápido y práctico', precio: 100 },
      { id: 3, nombre: 'Refrigerador', descripcion: 'Frío y moderno', precio: 500 },
      { id: 4, nombre: 'Microondas', descripcion: 'Rápido y práctico', precio: 100 },
      { id: 5, nombre: 'Refrigerador', descripcion: 'Frío y moderno', precio: 500 },
      { id: 6, nombre: 'Microondas', descripcion: 'Rápido y práctico', precio: 100 },
      { id: 7, nombre: 'Refrigerador', descripcion: 'Frío y moderno', precio: 500 },
      { id: 8, nombre: 'Microondas', descripcion: 'Rápido y práctico', precio: 100 },
      { id: 9, nombre: 'Refrigerador', descripcion: 'Frío y moderno', precio: 500 },
      { id: 10, nombre: 'Refrigerador', descripcion: 'Frío y moderno', precio: 500 },
      { id: 11, nombre: 'Microondas', descripcion: 'Rápido y práctico', precio: 100 },
      { id: 12, nombre: 'Refrigerador', descripcion: 'Frío y moderno', precio: 500 },
    ],
  };

  constructor() {}

  getVivosPorCategoria(categoria: string): Observable<any[]> {
    return of(this.productos[categoria] || []);
  }
}
