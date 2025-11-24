import { Component, OnInit } from '@angular/core';
import { ReservationsService } from './reservations.service';

@Component({
  selector: 'app-test-availability',
  template: '<p>Test Availability Component Loaded</p>',
})
export class TestAvailabilityComponent implements OnInit {
  constructor(private reservationsService: ReservationsService) {}

  ngOnInit(): void {
    const availabilityData = {
      professionalId: '507f1f77bcf86cd799439011',
      schedule: {
        lunes: ['09:00-13:00', '14:00-18:00'],
        martes: ['09:00-13:00']
      },
      blockedDates: ['2024-12-25']
    };

    this.reservationsService.setAvailability(availabilityData).subscribe(
      (response) => {
        console.log('Disponibilidad configurada:', response);
      },
      (error) => {
        console.error('Error al configurar disponibilidad:', error);
      }
    );
  }
}
