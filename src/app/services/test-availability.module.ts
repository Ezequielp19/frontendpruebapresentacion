import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReservationsService } from './reservations.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [ReservationsService],
})
export class TestAvailabilityModule {}
