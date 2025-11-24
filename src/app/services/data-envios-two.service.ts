import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataEnviosTwoService {

  constructor() { }

  getProvincias(): Observable<string[]> {
    return of(['Buenos Aires', 'Córdoba', 'Santa Fe', 'Mendoza','Catamarca', 'Formosa','Rio Negro', 'Neuquen', 'Santiago del Estero', 'Tucuman', 'Santa Fe', 'Entre Rios', 'Tierra del Fuego', 'Chubut', 'Chaco', 'Corrientes', 'Jujuy', 'La Pampa', 'La Rioja','Misiones', 'Salta', 'San Juan', 'San Luis']);
  }

  getCiudades(provincia: string): Observable<string[]> {
    const ciudades: any = {
      'Buenos Aires': ['La Plata', 'Mar del Plata', 'Bahía Blanca', 'Tandil', 'Olavarria', 'Necochea', 'Pergamino', 'Junin', 'Tres Arroyos'],
      'Catamarca': ['Belen', 'Tinogasta', 'San Fando del Valle', 'Andalgala', 'Villa Maria', 'San Francisco'],
      'Chaco': ['Resistencia', 'Saenz Peña', 'Villa Angela', 'Charata', 'Machagai'],
      'Chubut': ['Rawson', 'Trelew', 'Esquel', 'Puerto Madryn'],
      'Corrientes': ['Corrientes', 'Goya', 'Paso de los libres', 'Mercedes', 'Curuzu Cuatia',],
      'Córdoba': ['Córdoba', 'Villa Carlos Paz', 'Río Cuarto', 'Villa Maria', 'San Francisco'],
      'Santa Fe': ['Rosario', 'Santa Fe', 'Rafaela'],
      'Mendoza': ['Mendoza', 'San Rafael', 'Godoy Cruz'],
      'Entre Rios': ['Parana', 'Concordia', 'Gualeguaychu', 'Concepción del Uruguay', 'Villaguay'],
      'Formosa': ['Formosa',
        'Clorinda',
        'Pirané',
        ' Ibarreta',
        ' El Colorado'
      ],
      'Jujuy': [
        'San Salvador de Jujuy',
        ' Palpalá',
        'Libertador General San Martín',
        'Perico',
        ' San Pedro de Jujuy',
      ],
      'La Pampa': [
        'Santa Rosa',
        'General Pico',
        '  Eduardo Castex',
        ' Realicó',
        ' General Acha'
      ],
      'La Rioja': [
        'La Rioja',
        'Chilecito',
        'Aimogasta',
        'Chamical',
        ' Villa Unión'
      ],
      'Misiones': [
        'Posadas',
        '  Oberá',
        'Eldorado',
        ' Puerto Iguazú',
        ' Apóstoles'
      ],
      'Neuquen': [
        ' Neuquén',
        ' San Martín de los Andes',
        'Zapala',
        '  Plottier',
        ' Cutral Có'
      ],
      'Rio Negro': [
        'Viedma',
        'San Carlos de Bariloche',
        ' General Roca',
        ' Cipolletti',
        'Villa Regina'
      ],
      'Salta': [
        ' Salta',
        ' Tartagal',
        ' Orán',
        ' General Güemes',
        ' Rosario de la Frontera'
      ],
      'San Juan': [
        'San Juan',
        'Caucete',
        ' Rawson',
        'Chimbas',
        ' Pocito'
      ],
      'San Luis': [
        'Río Gallegos',
        'Caleta Olivia',
        'El Calafate',
        '  Puerto Deseado',
        'Pico Truncado'
      ],
      'Santiago del Estero': [
        ' Santiago del Estero',
        ' La Banda',
        'Termas de Río Hondo',
        'Frías',
        ' Añatuya'
      ],
      'Tierra del Fuego': [
        'Ushuaia',
        ' Río Grande',
        'Tolhuin'
      ],
      'Tucuman': [
        ' San Miguel de Tucumán',
        'Tafí Viejo',
        ' Concepción',
        'Yerba Buena',
        'Monteros'
      ]

    };

    return of(ciudades[provincia] || []);
  }

  getBarrios(zona: string): Observable<string[]> {
    const barriosGBA: any = {
      'zona norte': ['San Isidro', 'Tigre', 'Vicente López', 'San Fernando', 'Escobar', 'Pilar', 'Jose C.Paz', 'Malvinas Argentinas', 'San Miguel', 'San Martin'],
      'zona sur': ['Lanús', 'Quilmes', 'Avellaneda', 'Lomas de Zamora', 'Esteban Echeverria', 'Ezeiza', 'San Vicente', 'Presidente Peron', 'Almirante Brown', 'Quilmes', 'Berazategui', 'Florencia Varela'],
      'zona oeste': ['Morón', 'Merlo', 'Moreno', 'La Matanza', 'Tres de Febrero', 'Hurlingham', 'Marcos Paz', 'Gral Rodriguez', 'Ituzaingo'],
      'zona este': ['Tres de Febrero', 'San Martin', 'San Miguel']
    };
    const barriosCABA = ["Agronomía",
    "Almagro",
    "Balvanera",
    "Barracas",
    "Belgrano",
    "Boedo",
    "Caballito",
    "Chacarita",
    "Coghlan",
    "Colegiales",
    "Constitución",
    "Flores",
    "Floresta",
    "La Boca",
    "La Paternal",
    "Liniers",
    "Mataderos",
    "Monte Castro",
    "Monserrat",
    "Nueva Pompeya",
    "Núñez",
    "Palermo",
    "Parque Avellaneda",
    "Parque Chacabuco",
    "Parque Chas",
    "Parque Patricios",
    "Puerto Madero",
    "Recoleta",
    "Retiro",
    "Saavedra",
    "San Cristóbal",
    "San Nicolás",
    "San Telmo",
    "Vélez Sarsfield",
    "Versalles",
    "Villa Crespo",
    "Villa del Parque",
    "Villa Devoto",
    "Villa General Mitre",
    "Villa Lugano",
    "Villa Luro",
    "Villa Ortúzar",
    "Villa Pueyrredón",
    "Villa Real",
    "Villa Riachuelo",
    "Villa Santa Rita",
    "Villa Soldati",
    "Villa Urquiza"];
    if (zona === 'caba') {
      return of(barriosCABA);
    } else {
      return of(barriosGBA[zona] || []);
    }

  }

  getVehiculosDisponibles(tipo: string, zona: string): Observable<any[]> {
    const vehiculos = [
      {
        tipo: 'auto',
        marca: 'Ford',
        disponibilidadHoraria: '9:00 - 18:00',
        foto: 'https://th.bing.com/th/id/OIP.F2d8d6W2qpgOSWWoF1avfQHaDi?rs=1&pid=ImgDetMain',
        disponible: false,
        zona: 'San Isidro'
      },
      {
        tipo: 'auto',
        marca: 'Ford',
        disponibilidadHoraria: '9:00 - 18:00',
        foto: 'https://th.bing.com/th/id/OIP.F2d8d6W2qpgOSWWoF1avfQHaDi?rs=1&pid=ImgDetMain',
        disponible: true,
        zona: 'San Isidro'
      },
      {
        tipo: 'auto',
        marca: 'Ford',
        disponibilidadHoraria: '9:00 - 18:00',
        foto: 'https://th.bing.com/th/id/OIP.F2d8d6W2qpgOSWWoF1avfQHaDi?rs=1&pid=ImgDetMain',
        disponible: false,
        zona: 'San Isidro'
      },
      {
        tipo: 'auto',
        marca: 'Ford',
        disponibilidadHoraria: '9:00 - 18:00',
        foto: 'https://th.bing.com/th/id/OIP.F2d8d6W2qpgOSWWoF1avfQHaDi?rs=1&pid=ImgDetMain',
        disponible: true,
        zona: 'San Isidro'
      },

      {
        tipo: 'auto',
        marca: 'Ford',
        disponibilidadHoraria: '9:00 - 18:00',
        foto: 'https://th.bing.com/th/id/OIP.F2d8d6W2qpgOSWWoF1avfQHaDi?rs=1&pid=ImgDetMain',
        disponible: true,
        zona: 'San Isidro'
      },
      {
        tipo: 'auto',
        marca: 'Ford',
        disponibilidadHoraria: '9:00 - 18:00',
        foto: 'https://th.bing.com/th/id/OIP.F2d8d6W2qpgOSWWoF1avfQHaDi?rs=1&pid=ImgDetMain',
        disponible: true,
        zona: 'San Isidro'
      },
      {
        tipo: 'auto',
        marca: 'Ford',
        disponibilidadHoraria: '9:00 - 18:00',
        foto: 'https://th.bing.com/th/id/OIP.F2d8d6W2qpgOSWWoF1avfQHaDi?rs=1&pid=ImgDetMain',
        disponible: false,
        zona: 'San Isidro'
      },
      {
        tipo: 'auto',
        marca: 'Mercedes',
        disponibilidadHoraria: '9:00 - 18:00',
        foto: 'https://th.bing.com/th/id/OIP.F2d8d6W2qpgOSWWoF1avfQHaDi?rs=1&pid=ImgDetMain',
        disponible: true,
        zona: 'Tigre'
      },
      {
        tipo: 'auto',
        marca: 'Volvo',
        disponibilidadHoraria: '9:00 - 18:00',
        foto: 'https://th.bing.com/th/id/OIP.F2d8d6W2qpgOSWWoF1avfQHaDi?rs=1&pid=ImgDetMain',
        disponible: true,
        zona: 'Vicente López'
      },
      {
        tipo: 'auto',
        marca: 'Ford',
        disponibilidadHoraria: '9:00 - 18:00',
        foto: 'https://th.bing.com/th/id/OIP.F2d8d6W2qpgOSWWoF1avfQHaDi?rs=1&pid=ImgDetMain',
        disponible: true,
        zona: 'Lanús'
      },
      {
        tipo: 'auto',
        marca: 'Mercedes',
        disponibilidadHoraria: '9:00 - 18:00',
        foto: 'https://th.bing.com/th/id/OIP.F2d8d6W2qpgOSWWoF1avfQHaDi?rs=1&pid=ImgDetMain',
        disponible: true,
        zona: 'Quilmes'
      },
      {
        tipo: 'auto',
        marca: 'Volvo',
        disponibilidadHoraria: '9:00 - 18:00',
        foto: 'https://th.bing.com/th/id/OIP.F2d8d6W2qpgOSWWoF1avfQHaDi?rs=1&pid=ImgDetMain',
        disponible: true,
        zona: 'Avellaneda'
      },
      {
        tipo: 'auto',
        marca: 'Ford',
        disponibilidadHoraria: '9:00 - 18:00',
        foto: 'https://th.bing.com/th/id/OIP.F2d8d6W2qpgOSWWoF1avfQHaDi?rs=1&pid=ImgDetMain',
        disponible: true,
        zona: 'San Isidro'
      },
      {
        tipo: 'auto',
        marca: 'Mercedes',
        disponibilidadHoraria: '9:00 - 18:00',
        foto: 'https://th.bing.com/th/id/OIP.F2d8d6W2qpgOSWWoF1avfQHaDi?rs=1&pid=ImgDetMain',
        disponible: true,
        zona: 'Tigre'
      },
      {
        tipo: 'auto',
        marca: 'Volvo',
        disponibilidadHoraria: '9:00 - 18:00',
        foto: 'https://th.bing.com/th/id/OIP.F2d8d6W2qpgOSWWoF1avfQHaDi?rs=1&pid=ImgDetMain',
        disponible: true,
        zona: 'La Matanza'
      },
      {
        tipo: 'auto',
        marca: 'Ford',
        disponibilidadHoraria: '9:00 - 18:00',
        foto: 'https://th.bing.com/th/id/OIP.F2d8d6W2qpgOSWWoF1avfQHaDi?rs=1&pid=ImgDetMain',
        disponible: true,
        zona: 'Esteban Echeverría'
      },
      {
        tipo: 'auto',
        marca: 'Mercedes',
        disponibilidadHoraria: '9:00 - 18:00',
        foto: 'https://th.bing.com/th/id/OIP.F2d8d6W2qpgOSWWoF1avfQHaDi?rs=1&pid=ImgDetMain',
        disponible: true,
        zona: 'Quilmes'
      },
      {
        tipo: 'auto',
        marca: 'Volvo',
        disponibilidadHoraria: '9:00 - 18:00',
        foto: 'https://th.bing.com/th/id/OIP.F2d8d6W2qpgOSWWoF1avfQHaDi?rs=1&pid=ImgDetMain',
        disponible: true,
        zona: 'Merlo'
      },
      {
        tipo: 'moto',
        marca: 'Yamaha',
        disponibilidadHoraria: '10:00 - 19:00',
        foto: 'path/to/foto2.jpg',
        disponible: false,
        zona: 'Tigre'
      },
      {
        tipo: 'moto',
        marca: 'Yamaha',
        disponibilidadHoraria: '10:00 - 19:00',
        foto: 'path/to/foto2.jpg',
        disponible: false,
        zona: 'La Matanza'
      },
      {
        tipo: 'moto',
        marca: 'Yamaha',
        disponibilidadHoraria: '10:00 - 19:00',
        foto: 'path/to/foto2.jpg',
        disponible: false,
        zona: 'Tigre'
      },
      {
        tipo: 'moto',
        marca: 'Yamaha',
        disponibilidadHoraria: '10:00 - 19:00',
        foto: 'path/to/foto2.jpg',
        disponible: false,
        zona: 'Avellaneda'
      },
      {
        tipo: 'moto',
        marca: 'Yamaha',
        disponibilidadHoraria: '10:00 - 19:00',
        foto: 'path/to/foto2.jpg',
        disponible: false,
        zona: 'Tigre'
      },
      {
        tipo: 'camion',
        marca: 'Ford',
        disponibilidadHoraria: '9:00 - 18:00',
        foto: 'path/to/foto1.jpg',
        disponible: true,
        zona: 'Tigre'
      },
      {
        tipo: 'camioneta',
        marca: 'Yamaha',
        disponibilidadHoraria: '10:00 - 19:00',
        foto: 'path/to/foto2.jpg',
        disponible: false,
        zona: 'Quilmes'
      },
      {
        tipo: 'auto',
        marca: 'Ford',
        disponibilidadHoraria: '9:00 - 18:00',
        foto: 'path/to/foto1.jpg',
        disponible: true
      },
      {
        tipo: 'moto',
        marca: 'Yamaha',
        disponibilidadHoraria: '10:00 - 19:00',
        foto: 'path/to/foto2.jpg',
        disponible: false
      },
      {
        tipo: 'camion',
        marca: 'Ford',
        disponibilidadHoraria: '9:00 - 18:00',
        foto: 'path/to/foto1.jpg',
        disponible: true
      },
      {
        tipo: 'camioneta',
        marca: 'Yamaha',
        disponibilidadHoraria: '10:00 - 19:00',
        foto: 'path/to/foto2.jpg',
        disponible: false
      },
      //ciudades de provincias -------------------------------------------------------------------
      {
        tipo: 'auto',
        marca: 'Ford',
        disponibilidadHoraria: '9:00 - 18:00',
        foto: 'path/to/foto1.jpg',
        disponible: true,
        zona: 'La Plata'
      },
      {
        tipo: 'auto',
        marca: 'Mercedes',
        disponibilidadHoraria: '9:00 - 18:00',
        foto: 'path/to/foto1.jpg',
        disponible: true,
        zona: 'Mendoza'
      },
      {
        tipo: 'auto',
        marca: 'Volvo',
        disponibilidadHoraria: '9:00 - 18:00',
        foto: 'path/to/foto1.jpg',
        disponible: true,
        zona: 'Villa Carlos Paz'
      },
      {
        tipo: 'moto',
        marca: 'Yamaha',
        disponibilidadHoraria: '10:00 - 19:00',
        foto: 'path/to/foto2.jpg',
        disponible: false,
        zona: 'Bahía Blanca'
      },
      {
        tipo: 'moto',
        marca: 'Yamaha',
        disponibilidadHoraria: '10:00 - 19:00',
        foto: 'path/to/foto2.jpg',
        disponible: false,
        zona: 'Rosario'
      },
      {
        tipo: 'moto',
        marca: 'Yamaha',
        disponibilidadHoraria: '10:00 - 19:00',
        foto: 'path/to/foto2.jpg',
        disponible: false,
        zona: 'Mar del Plata'
      },
    ];
    return of(vehiculos.filter(vehiculo => vehiculo.tipo === tipo && vehiculo.zona === zona));
  }

  getConductoresDisponibles(vehiculo: any): Observable<any[]> {
    const conductores = [
      {
        nombre: 'Juan Pérez',
        tipoTraslado: 'flete',
        foto: 'https://data.mothership.tools/mothershiptools-ukprod/wp-content/uploads/2019/01/PressShot.jpg',
        rating: 4.5,
        tipoVehiculo: vehiculo.tipo
      },
      {
        nombre: 'María García',
        tipoTraslado: 'mudanza',
        foto: 'https://i.imgur.com/Mn9kglf.jpg',
        rating: 4.8,
        tipoVehiculo: vehiculo.tipo
      },
      {
        nombre: 'Juan Pérez',
        tipoTraslado: 'flete',
        foto: 'https://data.mothership.tools/mothershiptools-ukprod/wp-content/uploads/2019/01/PressShot.jpg',
        rating: 4.5,
        tipoVehiculo: vehiculo.tipo
      },
      {
        nombre: 'María García',
        tipoTraslado: 'mudanza',
        foto: 'https://i.imgur.com/Mn9kglf.jpg',
        rating: 4.8,
        tipoVehiculo: vehiculo.tipo
      },
      {
        nombre: 'Juan Pérez',
        tipoTraslado: 'flete',
        foto: 'https://data.mothership.tools/mothershiptools-ukprod/wp-content/uploads/2019/01/PressShot.jpg',
        rating: 4.5,
        tipoVehiculo: vehiculo.tipo
      },
      {
        nombre: 'María García',
        tipoTraslado: 'mudanza',
        foto: 'https://i.imgur.com/Mn9kglf.jpg',
        rating: 4.8,
        tipoVehiculo: vehiculo.tipo
      },
      {
        nombre: 'Juan Pérez',
        tipoTraslado: 'flete',
        foto: 'https://data.mothership.tools/mothershiptools-ukprod/wp-content/uploads/2019/01/PressShot.jpg',
        rating: 4.5,
        tipoVehiculo: vehiculo.tipo
      },
    ];
    return of(conductores.filter(conductor => conductor.tipoVehiculo === vehiculo.tipo));
  }




}