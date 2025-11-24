import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TestAvailabilityModule } from './test-availability.module';
import { TestAvailabilityComponent } from './test-availability.component';

@NgModule({
  declarations: [TestAvailabilityComponent],
  imports: [BrowserModule, TestAvailabilityModule],
  bootstrap: [TestAvailabilityComponent],
})
export class TestAvailabilityAppModule {}
