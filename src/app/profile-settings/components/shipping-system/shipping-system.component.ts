import { Component, OnInit } from '@angular/core';
import { DataEnviosService } from 'src/app/services/data-envios.service';

@Component({
  selector: 'app-shipping-system',
  templateUrl: './shipping-system.component.html',
  styleUrls: ['./shipping-system.component.scss']
})
export class ShippingSystemComponent implements OnInit {

  /*
  tipos = ['auto', 'moto', 'camioneta', 'camion'];
  selectedTipo!: string;
  vehiculos: any[] = [];
  selectedVehiculo: any;
  conductores: any[] = [];*/

  tipos = ['auto', 'moto', 'camioneta', 'camion'];
  zona = ['CABA', 'GBA',];
  provincia = ['PROVINCIAS']

 


  

  provinciaSeleccionada!: string;
  tipoSeleccionado!: string;
  zonaSeleccionada!: string;
  barrioSeleccionado!: string;
  vehiculoSeleccionado!: string;

  provincias!: string[];
  barrios!: string[];
  vehiculosDisponibles: any[] = [];
  vehiculos!: any[];
  vehiculosFiltrados: any[] = [];
  conductores!: any[];

  filtroTipoVehiculo: string | null = null;

  constructor(private dataService: DataEnviosService) { }

  /*
  onSelectTipo(tipo: string) {
    this.selectedTipo = tipo;
    this.vehiculos = this.dataService.getVehiculos(tipo);
    this.selectedVehiculo = null;
    this.conductores = [];
  }*/

  onSelectTipo(tipo: string) {
    this.tipoSeleccionado = tipo;
    this.zonaSeleccionada = '';
    this.barrioSeleccionado = '';
    this.vehiculoSeleccionado = '';
    this.barrios = [];
    this.vehiculos = [];
    this.conductores = [];
  }

  onSelectZona(zona: string) {
    this.zonaSeleccionada = zona;
    this.barrioSeleccionado = '' ;
    this.vehiculoSeleccionado = '';
    this.barrios = this.dataService.getBarrios(zona);
    this.vehiculos = [];
    this.conductores = [];
  }

  /*
  filtrarVehiculos() {
    if (this.filtroTipoVehiculo) {
      this.vehiculosFiltrados = this.vehiculosDisponibles.filter(v => v.tipo === this.filtroTipoVehiculo);
      this.vehiculos;
    } else {
      this.vehiculosFiltrados = this.vehiculosDisponibles;
    }
  }*/


  onSelectBarrio(barrio: string) {
    this.barrioSeleccionado = barrio;
    this.vehiculoSeleccionado = '';
    this.vehiculos = this.dataService.getVehiculos(barrio);
    this.conductores = [];
    //this.filtrarVehiculos();
  }

  

  onSelectProvincia(prov: string){
    this.provinciaSeleccionada = prov;
    this.vehiculoSeleccionado = '';
    this.provincias = this.dataService.getProvincia(prov);
    this.conductores = [];
  }

  reputacionChoferes() {
    this.conductores = this.dataService.getStar()
  }

  onSelectVehiculo(vehiculo: string) {
    this.vehiculoSeleccionado = vehiculo;
    this.conductores = this.dataService.getConductores(vehiculo);

  }

  /*
  contratarConductor(conductor: any) {
    alert(`Has contratado a ${conductor.nombre} ${conductor.apellido} con reputación ${conductor.reputacion}`);
  }*/







  ngOnInit(): void {
  }

}
