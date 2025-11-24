import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SellersCategoryRankedService {

    private readonly apiUrl = environment.apiUrl;


  constructor(private http: HttpClient) { }



  getSellersRanked(categoria: string ): Observable<any[]> {
    const sellers = [
      {
        nombre: 'Fran',
        apellido: 'Perez',
        descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid cumque perspiciatis ipsum suscip',
        rating: '4.5',
        tipoCat: 'Electrodomesticos',
        foto: 'https://data.mothership.tools/mothershiptools-ukprod/wp-content/uploads/2019/01/PressShot.jpg',
      },
      {
        nombre: 'juanita',
        apellido: 'Rodriguez',
        descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid cumque perspiciatis ipsum suscip',
        rating: '4.5',
        tipoCat: 'Electrodomesticos',
        foto: 'https://data.mothership.tools/mothershiptools-ukprod/wp-content/uploads/2019/01/PressShot.jpg',
      },
      {
        nombre: 'Bruno',
        apellido: 'Ruiz',
        descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid cumque perspiciatis ipsum suscip',
        rating: '4.5',
        tipoCat: 'Electrodomesticos',
        foto: 'https://data.mothership.tools/mothershiptools-ukprod/wp-content/uploads/2019/01/PressShot.jpg',
      },
      {
        nombre: 'Fran',
        apellido: 'Perez',
        descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid cumque perspiciatis ipsum suscip',
        rating: '4.5',
        tipoCat: 'Electrodomesticos',
        foto: 'https://data.mothership.tools/mothershiptools-ukprod/wp-content/uploads/2019/01/PressShot.jpg',
      },
      {
        nombre: 'juanita',
        apellido: 'Rodriguez',
        descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid cumque perspiciatis ipsum suscip',
        rating: '4.5',
        tipoCat: 'Electrodomesticos',
        foto: 'https://i.imgur.com/RrKeDv8.jpg',
      },
      {
        nombre: 'Bruno',
        apellido: 'Ruiz',
        descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid cumque perspiciatis ipsum suscip',
        rating: '4.5',
        tipoCat: 'Electrodomesticos',
        foto: 'https://data.mothership.tools/mothershiptools-ukprod/wp-content/uploads/2019/01/PressShot.jpg',
      },
      {
        nombre: 'juan',
        apellido: 'Perez',
        descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid cumque perspiciatis ipsum suscip',
        rating: '4.5',
        tipoCat: 'Electrodomesticos',
        foto: 'https://data.mothership.tools/mothershiptools-ukprod/wp-content/uploads/2019/01/PressShot.jpg',
      },
      {
        nombre: 'Fernanda',
        apellido: 'Paez',
        descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid cumque perspiciatis ipsum suscip',
        rating: '4.5',
        tipoCat: 'Electrodomesticos',
        foto: 'https://i.imgur.com/RrKeDv8.jpg',
      },
      {
        nombre: 'Jose',
        apellido: 'Martinez',
        descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid cumque perspiciatis ipsum suscip',
        rating: '4.5',
        tipoCat: 'Electrodomesticos',
        foto: 'https://data.mothership.tools/mothershiptools-ukprod/wp-content/uploads/2019/01/PressShot.jpg',
      },
      {
        nombre: 'Julieta',
        apellido: 'Rodriguez',
        descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid cumque perspiciatis ipsum suscip',
        rating: '4.5',
        tipoCat: 'Belleza',
        foto: 'https://imgur.com/4M5LpBs.png',
      },
      {
        nombre: 'Martina',
        apellido: 'Lopez',
        descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid cumque perspiciatis ipsum suscip',
        rating: '4.5',
        tipoCat: 'Belleza',
        foto: 'https://i.imgur.com/RrKeDv8.jpg',
      },
      {
        nombre: 'Luana',
        apellido: 'Asensio',
        descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid cumque perspiciatis ipsum suscip',
        rating: '4.5',
        tipoCat: 'Belleza',
        foto: 'https://i.imgur.com/RrKeDv8.jpg',
      },
      {
        nombre: 'Victoria',
        apellido: 'Paz',
        descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid cumque perspiciatis ipsum suscip',
        rating: '4.5',
        tipoCat: 'Belleza',
        foto: 'https://i.imgur.com/o5uMfKo.jpg',
      },
      {
        nombre: 'Luna',
        apellido: 'Hernandez',
        descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid cumque perspiciatis ipsum suscip',
        rating: '4.5',
        tipoCat: 'Belleza',
        foto: 'https://i.imgur.com/RrKeDv8.jpg',
      },
      {
        nombre: 'Aldana',
        apellido: 'Martinez',
        descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid cumque perspiciatis ipsum suscip',
        rating: '4.5',
        tipoCat: 'Belleza',
        foto: 'https://i.imgur.com/Mn9kglf.jpg',
      },
      {
        nombre: 'Gianfranco',
        apellido: 'Rodriguez',
        descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid cumque perspiciatis ipsum suscip',
        rating: '4.5',
        tipoCat: 'Vehiculos',
        foto: 'https://data.mothership.tools/mothershiptools-ukprod/wp-content/uploads/2019/01/PressShot.jpg',
      },
      {
        nombre: 'Charly',
        apellido: 'Alberti',
        descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid cumque perspiciatis ipsum suscip',
        rating: '4.5',
        tipoCat: 'Vehiculos',
        foto: 'https://data.mothership.tools/mothershiptools-ukprod/wp-content/uploads/2019/01/PressShot.jpg',
      },
      {
        nombre: 'Bruno',
        apellido: 'Perez',
        descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid cumque perspiciatis ipsum suscip',
        rating: '4.5',
        tipoCat: 'Vehiculos',
        foto: 'https://data.mothership.tools/mothershiptools-ukprod/wp-content/uploads/2019/01/PressShot.jpg',
      },
      {
        nombre: 'Gianfranco',
        apellido: 'Rodriguez',
        descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid cumque perspiciatis ipsum suscip',
        rating: '4.5',
        tipoCat: 'Vehiculos',
        foto: 'https://data.mothership.tools/mothershiptools-ukprod/wp-content/uploads/2019/01/PressShot.jpg',
      },
      {
        nombre: 'Charly',
        apellido: 'Alberti',
        descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid cumque perspiciatis ipsum suscip',
        rating: '4.5',
        tipoCat: 'Vehiculos',
        foto: 'https://data.mothership.tools/mothershiptools-ukprod/wp-content/uploads/2019/01/PressShot.jpg',
      },
      {
        nombre: 'Bruno',
        apellido: 'Perez',
        descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid cumque perspiciatis ipsum suscip',
        rating: '4.5',
        tipoCat: 'Vehiculos',
        foto: 'https://data.mothership.tools/mothershiptools-ukprod/wp-content/uploads/2019/01/PressShot.jpg',
      },
      {
        nombre: 'juan',
        apellido: 'Rodriguez',
        descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid cumque perspiciatis ipsum suscip',
        rating: '4.5',
        tipoCat: 'Vestimenta',
        foto: 'https://data.mothership.tools/mothershiptools-ukprod/wp-content/uploads/2019/01/PressShot.jpg',
      },
      {
        nombre: 'josefina',
        apellido: 'Gonzalez',
        descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid cumque perspiciatis ipsum suscip',
        rating: '4.5',
        tipoCatRanking: 'Vestimenta',
        foto: 'https://i.imgur.com/Mn9kglf.jpg',
      },
      {
        nombre: 'Salome',
        apellido: 'Perez',
        descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid cumque perspiciatis ipsum suscip',
        rating: '4.5',
        tipoCat: 'Vestimenta',
        foto: 'https://i.imgur.com/Mn9kglf.jpg',
      },
      {
        nombre: 'juan',
        apellido: 'Rodriguez',
        descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid cumque perspiciatis ipsum suscip',
        rating: '4.5',
        tipoCat: 'Vestimenta',
        foto: 'https://data.mothership.tools/mothershiptools-ukprod/wp-content/uploads/2019/01/PressShot.jpg',
      },
      {
        nombre: 'josefina',
        apellido: 'Gonzalez',
        descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid cumque perspiciatis ipsum suscip',
        rating: '4.5',
        tipoCatRanking: 'Vestimenta',
        foto: 'https://i.imgur.com/RCwPA3O.jpg',
      },
      {
        nombre: 'Salome',
        apellido: 'Perez',
        descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid cumque perspiciatis ipsum suscip',
        rating: '4.5',
        tipoCat: 'Vestimenta',
        foto: 'https://i.imgur.com/Mn9kglf.jpg',
      },
      {
        nombre: 'Gianfranco',
        apellido: 'Rodriguez',
        descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid cumque perspiciatis ipsum suscip',
        rating: '4.5',
        tipoCat: 'Vestimenta',
        foto: 'https://data.mothership.tools/mothershiptools-ukprod/wp-content/uploads/2019/01/PressShot.jpg',
      },
      {
        nombre: 'Charly',
        apellido: 'Alberti',
        descripcion: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid cumque perspiciatis ipsum suscip',
        rating: '4.5',
        tipoCat: 'Vestimenta',
        foto: 'https://data.mothership.tools/mothershiptools-ukprod/wp-content/uploads/2019/01/PressShot.jpg',
      },
    ];
    return of(sellers.filter(seller => seller.tipoCat === categoria ))

  }


  // getSellersRanked(categoria: string): Observable<any[]> {
  //   const url = `${this.apiUrl}/sellers/ranked?categoria=${encodeURIComponent(categoria)}`;
  //   return this.http.get<any[]>(url);
  // }

}
