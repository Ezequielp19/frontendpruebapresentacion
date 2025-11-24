import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {
  @Input() workerData: any = {
    name: 'Usuario',
    description: 'Sin descripción disponible',
    profession: 'Profesional',
    score: 0
  };

  constructor() { }

  ngOnInit(): void {
  }

  contactWorker(): void {
    const phoneNumber = '5491126387015'; // +54 9 11 2638-7015 sin espacios ni símbolos
    const message = `Hola, me interesa contratar los servicios de ${this.workerData.name}.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }

}
