import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElectronicsLivesComponent } from './components/electronics-lives/electronics-lives.component';
import { BeautyLivesComponent } from './components/beauty-lives/beauty-lives.component';
import { ClothesLivesComponent } from './components/clothes-lives/clothes-lives.component';

const routes: Routes = [
  {
    path: 'lives-electronics',component: ElectronicsLivesComponent
  },
  {
    path: 'lives-beauty', component:BeautyLivesComponent
  },
  {
    path: 'lives-clothes', component: ClothesLivesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LivesCategoryRoutingModule { }
