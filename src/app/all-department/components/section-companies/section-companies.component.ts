import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-companies',
  templateUrl: './section-companies.component.html',
  styleUrls: ['./section-companies.component.scss']
})
export class SectionCompaniesComponent implements OnInit {

  info: string = '';

  mostrarDatos() {
    this.info = 'Información desde el componente padre';
  }

  constructor() { }

  ngOnInit(): void {
  }

}
