import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-vehicle-filter',
  templateUrl: './vehicle-filter.component.html',
  styleUrls: ['./vehicle-filter.component.scss']
})
export class VehicleFilterComponent implements OnInit {

  filters: any = {};
  vehicles: any[] = [];


  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    this.getVehicles();

  }

  getVehicles(): void {
    this.vehicleService.getVehicles(this.filters).subscribe(response => {
      this.vehicles = response.vehicles || [];
    });
  }

  applyFilter(): void {
    this.getVehicles();
  }
}

