import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataEnviosTwoService } from 'src/app/services/data-envios-two.service';
import { DataEnviosService } from 'src/app/services/data-envios.service';
import { FormControl } from '@angular/forms';
import { startWith, map, switchMap } from 'rxjs/operators';

import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-shipping-system-two',
  templateUrl: './shipping-system-two.component.html',
  styleUrls: ['./shipping-system-two.component.scss']
})
export class ShippingSystemTwoComponent implements OnInit, OnDestroy {

  currentStep: number = 1;
totalSteps: number = 5;

  vehiculos = ['auto', 'moto', 'camion', 'camioneta'];
  zonasGBA = ['zona norte', 'zona sur', 'zona oeste', 'zona este'];
  provincias: string[] = [];
  barrios: string[] = [];
  ciudades: string[] = [];
  vehiculosDisponibles: any[] = [];
  conductoresDisponibles: any[] = [];

  selectedVehiculo: string | null = null;
  selectedZona: string | null = null;
  selectedProvincia: string | null = null;
  selectedBarrioOCiudad: string | null = null;

   // FormControls y filtros para autocompletado
  barrioControl = new FormControl();
  filteredBarrios!: Observable<string[]>;

  provinciaControl = new FormControl();
  filteredProvincias!: Observable<string[]>;

  ciudadControl = new FormControl();
  filteredCiudades!: Observable<string[]>;

  private subscriptions = new Subscription();



  constructor(private dataService: DataEnviosTwoService,public dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);
    this.subscriptions.add(
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      })
    );
  }

  ngOnInit(): void {
    // Configurar autocompletado para barrios
    this.filteredBarrios = this.barrioControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(this.barrios, value))
    );
    // Configurar autocompletado para provincias
    this.filteredProvincias = this.provinciaControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(this.provincias, value))
    );
    // Configurar autocompletado para ciudades
    this.filteredCiudades = this.ciudadControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(this.ciudades, value))
    );
  }

  private _filter(options: string[], value: string): string[] {
    const filterValue = value.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }

  seleccionarVehiculo(vehiculo: string) {
    this.selectedVehiculo = vehiculo;
    this.selectedZona = null;
    this.selectedProvincia = null;
    this.selectedBarrioOCiudad = null;
    this.vehiculosDisponibles = [];
    this.conductoresDisponibles = [];


  }

  // Método de selección de zona (GBA o CABA)
  seleccionarZona(zona: string) {
    this.selectedZona = zona;
    this.selectedProvincia = null;
    this.selectedBarrioOCiudad = null;
    this.vehiculosDisponibles = [];
    // Cargar barrios para la zona seleccionada
    this.subscriptions.add(
      this.dataService.getBarrios(zona).subscribe(data => {
        this.barrios = data;
        // Reiniciamos el control de autocompletado
        this.barrioControl.setValue('');
      })
    );
  }

  // Método para mostrar provincias (cuando se selecciona el botón Provincias)
  mostrarProvincias() {
    this.selectedZona = null;
    this.selectedProvincia = null;
    this.selectedBarrioOCiudad = null;
    this.vehiculosDisponibles = [];
    // Cargar provincias desde el servicio
    this.subscriptions.add(
      this.dataService.getProvincias().subscribe(data => {
        this.provincias = data;
        // Reiniciamos el control
        this.provinciaControl.setValue('');
      })
    );
  }

  // Método de selección de provincia a través del autocompletado
  seleccionarProvincia(provincia: string) {
    this.selectedProvincia = provincia;
    this.selectedBarrioOCiudad = null;
    this.vehiculosDisponibles = [];
    // Una vez seleccionada la provincia, cargar las ciudades
    this.subscriptions.add(
      this.dataService.getCiudades(provincia).subscribe(data => {
        this.ciudades = data;
        this.ciudadControl.setValue('');
      })
    );
  }

  // Selección de barrio o ciudad mediante autocompletado
  seleccionarBarrioOCiudad(item: string) {
    this.selectedBarrioOCiudad = item;
    // Llamar al servicio para obtener vehículos disponibles
    this.subscriptions.add(
      this.dataService.getVehiculosDisponibles(this.selectedVehiculo!, item).subscribe(data => {
        this.vehiculosDisponibles = data;
      })
    );
  }

  seleccionarVehiculoDisponible(vehiculo: any) {
    this.subscriptions.add(
      this.dataService.getConductoresDisponibles(vehiculo).subscribe(data => {
        this.conductoresDisponibles = data;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
  styleUrls: ['./shipping-system-two.component.scss']
})
export class DialogContentExampleDialog {}


