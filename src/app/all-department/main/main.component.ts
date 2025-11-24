import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  



  info: string = '';

  mostrarDatos() {
    this.info = 'Información desde el componente padre';
  }

  constructor() { }

  ngOnInit(): void {
  }

}
