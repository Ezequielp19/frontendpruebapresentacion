import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-live-section',
  templateUrl: './live-section.component.html',
  styleUrls: ['./live-section.component.scss']
})
export class LiveSectionComponent {
  
  @Input() title: string = 'Live';
  @Input() type: 'negocios' | 'profesionales' | 'proveedores' = 'negocios';
  @Input() showHalfBox: boolean = true; // Para el box especial del medio

  constructor() {}
}

