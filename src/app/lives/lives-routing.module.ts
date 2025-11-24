import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { ViewerComponent } from './components/viewer/viewer.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent  // Para transmitir
  },
  {
    path: 'watch/:streamId',
    component: ViewerComponent  // Para ver un stream
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LivesRoutingModule { }
