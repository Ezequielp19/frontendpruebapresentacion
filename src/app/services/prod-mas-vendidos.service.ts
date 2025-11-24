import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdMasVendidosService {

  constructor() { }

  getProducts(categoria:string ):Observable<any[]> {
    const prods = [
      {
        nombre: 'Heladera no-frost gafa',
        precio: '$150000',
        descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid cumque perspiciatis ipsum suscip',
        anio_fabricacion: '2019',
        tipoCat: 'Electrodomesticos',
        foto: 'https://images.fravega.com/f300/2a1c912723f833e77d7a2fb3f7330aac.jpg.webp',
        beneficios: 'Comision por venta - $500 - Comision por reventa - $250'
      },
      {
        nombre: 'Heladera no-frost',
        precio: '$150000',
        descripcion: 'DescripcionLorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid cumque perspiciatis ipsum suscip',
        anio_fabricacion: '2019',
        tipoCat: 'Electrodomesticos',
        foto: 'https://images.fravega.com/f300/9e439ed9953d2477cf1f653e51ae0086.jpg.webp',
        beneficios: 'Comision por venta - $500 - Comision por reventa - $250'
        
      },
      {
        nombre: 'Heladera no-frost',
        precio: '$1500789',
        descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid cumque perspiciatis ipsum suscip',
        anio_fabricacion: '2019',
        tipoCat: 'Electrodomesticos',
        foto: 'https://images.fravega.com/f300/fe05cc96c5804de9affd037fa7ec4ef8.jpg.webp',
        beneficios: 'Comision por venta - $500 - Comision por reventa - $250'
      },
      {
        nombre: 'Lavarropas',
        precio: '$156540',
        descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid cumque perspiciatis ipsum suscip',
        anio_fabricacion: '2019',
        tipoCat: 'Electrodomesticos',
        foto: 'https://images.fravega.com/f300/3bd7a47a4fd847af85a76fc9f772d9b9.jpg.webp',
        beneficios: 'Comision por venta - $500 - Comision por reventa - $250'
      },
      {
        nombre: 'Lavarropas',
        precio: '$156540',
        descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid cumque perspiciatis ipsum suscip',
        anio_fabricacion: '2019',
        tipoCat: 'Electrodomesticos',
        foto: 'https://images.fravega.com/f300/9e37d7bfff241e57a463c4b2e22f6ccc.png.webp',
        beneficios: 'Comision por venta - $500 - Comision por reventa - $250'
      },
      {
        nombre: 'Aire Acondicionado',
        precio: '$158794',
        descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid cumque perspiciatis ipsum suscip',
        anio_fabricacion: '2019',
        tipoCat: 'Electrodomesticos',
        foto: 'https://images.fravega.com/f300/cfe3b94d41bf3a9c03e90e40dda98692.jpg.webp',
        beneficios: 'Comision por venta - $500 - Comision por reventa - $250'
      },
      {
        nombre: 'Aire Acondicionado',
        precio: '$85963',
        descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid cumque perspiciatis ipsum suscip',
        anio_fabricacion: '2019',
        tipoCat: 'Electrodomesticos',
        foto: 'https://images.fravega.com/f300/f0d9f57f6190b0063a5b87e3d5af5567.jpg.webp',
        beneficios: 'Comision por venta - $500 - Comision por reventa - $250'
      },
      
      {
        nombre: 'Notebook Lenovo',
        precio: '$550.000',
        descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid cumque perspiciatis ipsum suscip',
        anio_fabricacion: '2019',
        tipoCat: 'Tecnologia',
        foto: 'https://images.fravega.com/f300/e627e3c948059e31a28d42a2222566bc.jpg.webp',
        beneficios: 'Comision por venta - $500 - Comision por reventa - $250'
      },
      {
        nombre: 'Tablet Lenovo',
        precio: '$279.999',
        descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid cumque perspiciatis ipsum suscip',
        anio_fabricacion: '2019',
        tipoCat: 'Tecnologia',
        foto: 'https://images.fravega.com/f300/087a79b2ee2c1390daa7127c145df902.jpg.webp',
        beneficios: 'Comision por venta - $500 - Comision por reventa - $250'
      },
      {
        nombre: 'Notebook Asus',
        precio: '$550.000',
        descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid cumque perspiciatis ipsum suscip',
        anio_fabricacion: '2019',
        tipoCat: 'Tecnologia',
        foto: 'https://images.fravega.com/f300/bd2bbd37eea0a9cdd95e99e1c10dc441.jpg.webp',
        beneficios: 'Comision por venta - $500 - Comision por reventa - $250'
      },
      {
        nombre: 'Tablet Lenovo',
        precio: '$279.999',
        descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid cumque perspiciatis ipsum suscip',
        anio_fabricacion: '2019',
        tipoCat: 'Tecnologia',
        foto: 'https://images.fravega.com/f300/087a79b2ee2c1390daa7127c145df902.jpg.webp',
        beneficios: 'Comision por venta - $500 - Comision por reventa - $250'
      },
      {
        nombre: 'Joystick PS5 Negro',
        precio: '$550.000',
        descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid cumque perspiciatis ipsum suscip',
        anio_fabricacion: '2019',
        tipoCat: 'Tecnologia',
        foto: 'https://images.fravega.com/f300/910b9ddb4459c05b1584d93bd3df9f54.jpg.webp',
        beneficios: 'Comision por venta - $500 - Comision por reventa - $250'
      },
      {
        nombre: 'PlayStation 5 Slim',
        precio: '$279.999',
        descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid cumque perspiciatis ipsum suscip',
        anio_fabricacion: '2019',
        tipoCat: 'Tecnologia',
        foto: 'https://images.fravega.com/f300/924c7609c8d2373697adeb13938c4677.jpg.webp',
        beneficios: 'Comision por venta - $500 - Comision por reventa - $250'
      },
      {
        nombre: 'Canastos x3 gris',
        precio: '$75000',
        descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid cumque perspiciatis ipsum suscip',
        anio_fabricacion: '2019',
        tipoCat: 'Casa',
        foto: 'https://images.fravega.com/f300/1fe67c13c1879088d2ef16e8c129be28.png.webp',
        beneficios: 'Comision por venta - $500 - Comision por reventa - $250'
      },
      {
        nombre: 'Dispensador de jabon',
        precio: '$55000',
        descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid cumque perspiciatis ipsum suscip',
        anio_fabricacion: '2019',
        tipoCat: 'Casa',
        foto: 'https://images.fravega.com/f300/101c98a69bcce2c64e6da4a5ea133bfe.jpg.webp',
        beneficios: 'Comision por venta - $500 - Comision por reventa - $250'
      },
      {
        nombre: 'Canasto para ropa',
        precio: '$75000',
        descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid cumque perspiciatis ipsum suscip',
        anio_fabricacion: '2019',
        tipoCat: 'Casa',
        foto: 'https://images.fravega.com/f300/a5de15524d2634ff8fef9c3435a48df9.jpg.webp',
        beneficios: 'Comision por venta - $500 - Comision por reventa - $250'
      },
      {
        nombre: 'Planta Artificial',
        precio: '$55000',
        descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid cumque perspiciatis ipsum suscip',
        anio_fabricacion: '2019',
        tipoCat: 'Casa',
        foto: 'https://images.fravega.com/f300/2664403f22381c1a53ad7c4cd84716ee.jpg.webp',
        beneficios: 'Comision por venta - $500 - Comision por reventa - $250'
      },
      {
        nombre: 'Cortina Tropical',
        precio: '$24900',
        descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid cumque perspiciatis ipsum suscip',
        anio_fabricacion: '2019',
        tipoCat: 'Casa',
        foto: 'https://images.fravega.com/f300/0df45c8405b2e0d6c9d206f96a5fd328.jpg.webp',
        beneficios: 'Comision por venta - $500 - Comision por reventa - $250'
      },
      {
        nombre: 'Cortina Tropical',
        precio: '$24900',
        descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid cumque perspiciatis ipsum suscip',
        anio_fabricacion: '2019',
        tipoCat: 'Casa',
        foto: 'https://images.fravega.com/f300/0df45c8405b2e0d6c9d206f96a5fd328.jpg.webp',
        beneficios: 'Comision por venta - $500 - Comision por reventa - $250'
      },
    ];
    return of(prods.filter(prod => prod.tipoCat === categoria) )
  }





}
