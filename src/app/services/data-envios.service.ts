import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataEnviosService {


  /*
  private vehiculos: any = {
    auto: [
      { modelo: 'Renault kangoo', ubicacion: 'Palermo', disponible: true, localidad: 'caba', icono: '🚗' , icono_ubi: '📌', icono_loc: '📍' },
      { modelo: 'Volkswagen Voyage', ubicacion: 'caballito', disponible: false, localidad: 'caba', icono: '🚗' , icono_loc: '📍'},
      { modelo: 'Renault Alaskan', ubicacion: 'merlo', disponible: true, localidad: 'gba', icono: '🚗' , icono_ubi: '📌' , icono_loc: '📍' },
      { modelo: 'Volkswagen T-cross', ubicacion: 'moron', disponible: false, localidad: 'gba', icono: '🚗' , icono_ubi: '📌' , icono_loc: '📍' }
    ],
    moto: [
      { modelo: 'Zanella ZR', ubicacion: 'lanus', disponible: true, localidad: 'gba' ,icono: '🛵' , icono_ubi: '📌' , icono_loc: '📍' },
      { modelo: 'Zanella ZR', ubicacion: 'moron', disponible: false, localidad: 'gba' ,icono: '🛵' , icono_ubi: '📌' , icono_loc: '📍' },
      { modelo: 'Zanella ZR', ubicacion: 'retiro', disponible: true, localidad: 'caba' ,icono: '🛵' , icono_ubi: '📌' , icono_loc: '📍' }
    ],
    camioneta: [
      { modelo: 'Mercedes Benz Splinter', ubicacion: 'flores', disponible: true, localidad: 'caba' ,icono: '🚐' , icono_ubi: '📌' , icono_loc: '📍' },
      { modelo: 'Mercedes Benz Splinter', ubicacion: 'palermo', disponible: false, localidad: 'caba' ,icono: '🚐' , icono_ubi: '📌' , icono_loc: '📍' }
    ],
    camion: [
      { modelo: 'Iveco 2245', ubicacion: 'avellaneda', disponible: false, localidad: 'gba', icono: '🚚',icono_ubi: '📌' , icono_loc: '📍' },
      { modelo: 'Iveco 2245', ubicacion: 'moron', disponible: true, localidad: 'gba', icono: '🚚', icono_ubi: '📌' , icono_loc: '📍' }
    ]
  };
  */


  private vehiculos: any = [


    { tipo: 'auto', ubicacion: 'Palermo', modelo: 'Toyota', disponible: true, icono: '🚐', icono_ubi: '📌', foto: 'https://img.favpng.com/9/13/3/city-car-volkswagen-voyage-vehicle-png-favpng-CXe6RTtJ8U8kHm4G5Dcis3Sr0.jpg' },
    { tipo: 'auto', ubicacion: 'Recoleta', modelo: 'Toyota', disponible: true, icono: '🚐', icono_ubi: '📌',  foto: 'https://img.favpng.com/9/13/3/city-car-volkswagen-voyage-vehicle-png-favpng-CXe6RTtJ8U8kHm4G5Dcis3Sr0.jpg' },
    { tipo: 'auto', ubicacion: 'Belgrano', modelo: 'Toyota', disponible: true, icono: '🚐', icono_ubi: '📌', foto: 'https://img.favpng.com/9/13/3/city-car-volkswagen-voyage-vehicle-png-favpng-CXe6RTtJ8U8kHm4G5Dcis3Sr0.jpg' },
    { tipo: 'auto', ubicacion: 'San Isidro', modelo: 'Toyota', disponible: true, icono: '🚐', icono_ubi: '📌', foto: 'https://img.favpng.com/9/13/3/city-car-volkswagen-voyage-vehicle-png-favpng-CXe6RTtJ8U8kHm4G5Dcis3Sr0.jpg' },
    { tipo: 'auto', ubicacion: 'Vicente Lopez', modelo: 'Toyota', disponible: true, icono: '🚐', icono_ubi: '📌' , foto: 'https://img.favpng.com/9/13/3/city-car-volkswagen-voyage-vehicle-png-favpng-CXe6RTtJ8U8kHm4G5Dcis3Sr0.jpg' },
    { tipo: 'moto', ubicacion: 'Belgrano', modelo: 'Yamaha', disponible: false, icono: '🛵', icono_ubi: '📌', foto: 'https://th.bing.com/th/id/OIP.u9Qop1_JGxVnTc994HrGOwHaHK?w=207&h=200&c=7&r=0&o=5&pid=1.7' },
    { tipo: 'moto', ubicacion: 'Recoleta', modelo: 'Yamaha', disponible: false, icono: '🛵', icono_ubi: '📌',  foto: 'https://th.bing.com/th/id/OIP.u9Qop1_JGxVnTc994HrGOwHaHK?w=207&h=200&c=7&r=0&o=5&pid=1.7' },
    { tipo: 'moto', ubicacion: 'Belgrano', modelo: 'Yamaha', disponible: false, icono: '🛵', icono_ubi: '📌', foto: 'https://th.bing.com/th/id/OIP.u9Qop1_JGxVnTc994HrGOwHaHK?w=207&h=200&c=7&r=0&o=5&pid=1.7' },
    { tipo: 'camioneta', ubicacion: 'San Isidro', modelo: 'Ford', disponible: true, icono: '🚐', icono_ubi: '📌', foto: 'https://th.bing.com/th/id/R.cf747e57fea521bbc74a87d68c8fcd35?rik=2O76LQY2NK0y1w&pid=ImgRaw&r=0' },
    { tipo: 'camioneta', ubicacion: 'Belgrano', modelo: 'Ford', disponible: true, icono: '🚐', icono_ubi: '📌', foto: 'https://th.bing.com/th/id/R.cf747e57fea521bbc74a87d68c8fcd35?rik=2O76LQY2NK0y1w&pid=ImgRaw&r=0' },
    { tipo: 'camioneta', ubicacion: 'Recoleta', modelo: 'Ford', disponible: true, icono: '🚐', icono_ubi: '📌', foto: 'https://th.bing.com/th/id/R.cf747e57fea521bbc74a87d68c8fcd35?rik=2O76LQY2NK0y1w&pid=ImgRaw&r=0' },
    { tipo: 'camion', ubicacion: 'Tigre', modelo: 'Mercedes', disponible: true, icono: '🚚', icono_ubi: '📌' },
    { tipo: 'camion', ubicacion: 'San Isidro', modelo: 'Mercedes', disponible: true, icono: '🚚', icono_ubi: '📌', foto: 'https://th.bing.com/th/id/OIP.otngoDg2gzgylm5MRr8lCQHaFg?rs=1&pid=ImgDetMain' },
    { tipo: 'camion', ubicacion: 'Recoleta', modelo: 'Mercedes', disponible: true, icono: '🚚', icono_ubi: '📌', foto: 'https://th.bing.com/th/id/OIP.otngoDg2gzgylm5MRr8lCQHaFg?rs=1&pid=ImgDetMain' },
    { tipo: 'camion', ubicacion: 'Belgrano', modelo: 'Mercedes', disponible: true, icono: '🚚', icono_ubi: '📌', foto: 'https://th.bing.com/th/id/OIP.otngoDg2gzgylm5MRr8lCQHaFg?rs=1&pid=ImgDetMain' },
    { tipo: 'camioneta', ubicacion: 'San Isidro', modelo: 'Ford', disponible: true, icono: '🚐', icono_ubi: '📌', foto: 'https://th.bing.com/th/id/R.cf747e57fea521bbc74a87d68c8fcd35?rik=2O76LQY2NK0y1w&pid=ImgRaw&r=0' },
    { tipo: 'camioneta', ubicacion: 'Belgrano', modelo: 'Ford', disponible: true, icono: '🚐', icono_ubi: '📌', foto: 'https://th.bing.com/th/id/R.cf747e57fea521bbc74a87d68c8fcd35?rik=2O76LQY2NK0y1w&pid=ImgRaw&r=0' },
    { tipo: 'camioneta', ubicacion: 'Recoleta', modelo: 'Ford', disponible: true, icono: '🚐', icono_ubi: '📌', foto: 'https://th.bing.com/th/id/R.cf747e57fea521bbc74a87d68c8fcd35?rik=2O76LQY2NK0y1w&pid=ImgRaw&r=0' },
    { tipo: 'camion', ubicacion: 'Tigre', modelo: 'Mercedes', disponible: true, icono: '🚚', icono_ubi: '📌', foto: 'https://th.bing.com/th/id/OIP.otngoDg2gzgylm5MRr8lCQHaFg?rs=1&pid=ImgDetMain' },
    { tipo: 'camion', ubicacion: 'San Isidro', modelo: 'Mercedes', disponible: true, icono: '🚚', icono_ubi: '📌', foto: 'https://th.bing.com/th/id/OIP.otngoDg2gzgylm5MRr8lCQHaFg?rs=1&pid=ImgDetMain' },
    { tipo: 'camion', ubicacion: 'Recoleta', modelo: 'Mercedes', disponible: true, icono: '🚚', icono_ubi: '📌', foto: 'https://th.bing.com/th/id/OIP.otngoDg2gzgylm5MRr8lCQHaFg?rs=1&pid=ImgDetMain' },
    { tipo: 'camion', ubicacion: 'Belgrano', modelo: 'Mercedes', disponible: true, icono: '🚚', icono_ubi: '📌', foto: 'https://th.bing.com/th/id/OIP.otngoDg2gzgylm5MRr8lCQHaFg?rs=1&pid=ImgDetMain' },
    { tipo: 'camion', ubicacion: 'San Isidro', modelo: 'Mercedes', disponible: true, icono: '🚚', icono_ubi: '📌', foto: 'https://th.bing.com/th/id/OIP.otngoDg2gzgylm5MRr8lCQHaFg?rs=1&pid=ImgDetMain' },
  ];


  /*
  private localidades: any = {
    gba: [
      {nombre: 'avellaneda'},
      {nombre: 'lanus'},
      {nombre: 'merlo'},
      {nombre: 'moron'},
      {nombre: 'san miguel'}
    ],
    caba: [
      {nombre: 'barracas'},
      {nombre: 'palermo'},
      {nombre: 'retiro'},
      {nombre: 'flores'},
      {nombre: 'caballito'}
    ]
  }*/

  private conductores = [
    { nombre: 'Juan', apellido: 'Perez', cargo: 'flete/mudanza', reputacion_estrella: 'fa fa-star', vehiculo: 'Toyota', barrio: 'Palermo' },
    { nombre: 'Ana', apellido: 'Gomez', cargo: 'flete/mudanza', reputacion_estrella: 'fa fa-star', vehiculo: 'Toyota', barrio: 'Recoleta' },
    { nombre: 'Rodrigo', apellido: 'Perez', cargo: 'flete/mudanza', reputacion_estrella: 'fa fa-star', vehiculo: 'Ford', barrio: 'Belgrano' },
    { nombre: 'Julieta', apellido: 'Rodriguez', cargo: 'flete/mudanza', reputacion_estrella: 'fa fa-star', vehiculo: 'Mercedes', barrio: 'San Isidro' },

    { nombre: 'Ana', apellido: 'Gomez', cargo: 'flete/mudanza', reputacion_estrella: 'fa fa-star', vehiculo: 'Yamaha', barrio: 'Vicente Lopez' },
  ];

  private barriosCABA = ['Almagro', 'Balvanera', 'Barracas', 'Belgrano', 'Boedo', 'Caballito',
    'Chacarita', 'Coghlan', 'Colegiales', 'Constitución', 'Flores',
    'Floresta', 'La Boca', 'La Paternal', 'Liniers', 'Mataderos', 'Monte Castro',
    'Monserrat', 'Nueva Pompeya', 'Núñez', 'Palermo', 'Parque Avellaneda',
    'Parque Chacabuco', 'Parque Chas', 'Parque Patricios', 'Puerto Madero',
    'Recoleta', 'Retiro', 'Saavedra', 'San Cristóbal', 'San Nicolás',
    'San Telmo', 'Versalles', 'Villa Crespo', 'Villa del Parque',
    'Villa Devoto', 'Villa General Mitre', 'Villa Lugano', 'Villa Luro',
    'Villa Ortúzar', 'Villa Pueyrredón', 'Villa Real', 'Villa Riachuelo',
    'Villa Santa Rita', 'Villa Soldati', 'Villa Urquiza'];

  private barriosGBA = ['Avellaneda', 'Berazategui', 'Esteban Echeverría', 'Ezeiza', 'Florencio Varela',
    'General San Martín', 'Hurlingham', 'Ituzaingó', 'José C. Paz',
    'La Matanza', 'Lanús', 'Lomas de Zamora', 'Malvinas Argentinas',
    'Moreno', 'Morón', 'Quilmes', 'San Fernando', 'San Isidro', 'San Miguel',
    'Tigre', 'Tres de Febrero', 'Vicente López'
  ];

  private provinciasArgentina = [
    'Buenos Aires', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba', 'Corrientes',
    'Entre Ríos', 'Formosa', 'Jujuy', 'La Pampa', 'La Rioja', 'Mendoza',
    'Misiones', 'Neuquén', 'Río Negro', 'Salta', 'San Juan', 'San Luis',
    'Santa Cruz', 'Santa Fe', 'Santiago del Estero', 'Tierra del Fuego',
    'Tucumán'
  ];


  constructor() { }

  getBarrios(zona: string): string[] {

    return zona === 'GBA' ? this.barriosGBA : this.barriosCABA
    // return  zona === 'GBA' || zona === 'CABA' ? this.barriosGBA || this.barriosCABA : this.provinciasArgentina;

  }

  getProvincia(prov: string): string[] {

    return prov === 'PROVINCIAS' ? this.provinciasArgentina : this.barriosCABA || this.barriosGBA
  }

  getVehiculos(barrio: string) {
    return this.vehiculos.filter((v: { ubicacion: string; }) => v.ubicacion === barrio);
  }

  getStar() {
    return this.conductores.map(star => star.reputacion_estrella)
  }

  getConductores(vehiculo: string) {
    return this.conductores
    //eturn this.conductores.filter(c => c.vehiculo === vehiculo  );
  }

  /*
  getLocalidad(localidad: any){
    return this.localidades[localidad] || [];
  }*/

  /*
  getConductores() {
    return this.conductores;
  } */

    /*
  getVehiculos(tipo : any) {
    return this.vehiculos[tipo] || [];
  }*/





}
