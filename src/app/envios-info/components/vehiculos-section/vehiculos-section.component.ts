import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehiculos-section',
  templateUrl: './vehiculos-section.component.html',
  styleUrls: ['./vehiculos-section.component.scss'],
})
export class VehiculosSectionComponent implements OnInit {
   vehicles: any[] = [];
  groupedVehicles: { [key: string]: any[] } = {};
  vehicleTypes: string[] = ['auto', 'camioneta', 'moto', 'camion'];
    panelStates: { [key: string]: boolean } = {};

  filters = {
    type: '',
    location: '',
  };



  constructor(private vehicleService: VehicleService, private router: Router) {}

  ngOnInit() {
    this.loadVehicles();
    // Opcional: Actualizar estado cada 30 segundos
    setInterval(() => {
      this.loadVehicles();
    }, 30000);
  }



  loadVehicles() {
    this.vehicleService.getVehicles().subscribe(
      (response) => {
        this.vehicles = response.vehicles || [];
        this.groupVehiclesByType(); // Agrupa los vehículos por tipo
        console.log('Vehículos agrupados:', this.groupedVehicles);
      },
      (error) => {
        console.error('Error al obtener los vehículos:', error);
      }
    );
  }

 groupVehiclesByType() {
  this.groupedVehicles = {};


  const typeMapping = {
    car: 'auto',
    truck: 'camion',
    van: 'camioneta',
    motorcycle: 'moto',
  };

  this.vehicleTypes.forEach((type) => {
    this.groupedVehicles[type] = this.vehicles.filter(
  (vehicle) => typeMapping[vehicle.type as keyof typeof typeMapping] === type
);
  });
}

  // Función para obtener el estado del conductor como texto
  getDriverStatusText(vehicle: any): string {
    return vehicle.driverStatus ? 'Online' : 'Offline';
  }

  // Función para obtener la clase CSS del estado
  getDriverStatusClass(vehicle: any): string {
    return vehicle.driverStatus ? 'online' : 'offline';
  }

  // Función para navegar al perfil del conductor
  goToDriverProfile(vehicle: any, event: Event) {
    event.stopPropagation(); // Evitar que se expanda el panel

    // Crear datos del conductor para pasar al perfil
    const driverData = {
      id: vehicle._id || vehicle.id,
      name: vehicle.driverName || 'Conductor',
      profession: vehicle.type || 'Conductor',
      score: vehicle.driverRating || 5,
      description: `Conductor profesional de ${vehicle.vehicleModel} ${vehicle.brand}. Disponible para servicios de transporte.`,
      image: vehicle.driverImage || null,
      location: vehicle.location || 'Argentina',
      category: vehicle.type || 'Transporte',
               whatsapp: vehicle.driverWhatsapp || '5491156789012',
      vehicleInfo: {
        model: vehicle.vehicleModel,
        brand: vehicle.brand,
        licensePlate: vehicle.licensePlate,
        color: vehicle.color,
        year: vehicle.year
      }
    };

    // Navegar al perfil del conductor con los datos
    this.router.navigate(['preview-profile'], {
      queryParams: { worker: JSON.stringify(driverData) }
    });
  }

  onFilterChange() {
    this.loadVehicles();
  }

  applyFilter() {
    this.loadVehicles();
  }



  clicked = false;

  panelOpenState = false;

  getVehicleIcon(vehicleType: string): string {
    switch (vehicleType) {
      case 'auto':
        return '../../../../assets/img/icon-vehicles/electric-car.png';
      case 'moto':
        return '../../../../assets/img/icon-vehicles/motorcycle.png';
      case 'camion':
        return '../../../../assets/img/icon-vehicles/truck.png';
      case 'camioneta':
        return '../../../../assets/img/icon-vehicles/van.png';
      default:
        return '';
    }
  }
}
