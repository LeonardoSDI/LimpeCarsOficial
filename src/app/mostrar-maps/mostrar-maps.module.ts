import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MostrarMapsPage } from './mostrar-maps.page';

const routes: Routes = [
  {
    path: '',
    component: MostrarMapsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MostrarMapsPage]
})
export class MostrarMapsPageModule {}
