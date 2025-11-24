import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiTestingComponent } from './api-testing.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ApiTestingComponent }
];

@NgModule({
  declarations: [ApiTestingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ApiTestingModule { }
