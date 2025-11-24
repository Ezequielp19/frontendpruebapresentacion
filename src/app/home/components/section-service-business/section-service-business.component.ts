import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';

@Component({
  selector: 'app-section-service-business',
  templateUrl: './section-service-business.component.html',
  styleUrls: ['./section-service-business.component.scss'],
})
export class SectionServiceBusinessComponent implements OnInit {
  sliderStore: any = [
    {
      title: 'Programación',
      image: '../../../assets/img/servicios/programacion.png',
      color: '#006BA6',
    },
    {
      title: 'Logística',
      image: '../../../assets/img/servicios/logistica.png',
      color: '#D1495B',
    },
    {
      title: 'Edición de fotos',
      image: '../../../assets/img/servicios/edicion.png',
      color: '#EDAE49',
    },
    {
      title: 'Electrónica',
      image: '../../../assets/img/servicios/electronica.png',
      color: '#006BA6',
    },
    {
      title: 'Logística',
      image: '../../../assets/img/servicios/logistica.png',
      color: '#D1495B',
    },
  ];

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl<TooltipPosition>('above');

  showDelay = new FormControl(200);
  hideDelay = new FormControl(1000);

  constructor() {}

  ngOnInit(): void {}
}
