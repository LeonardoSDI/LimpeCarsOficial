import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SolicitarLavaPage } from './solicitar-lava.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitarLavaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SolicitarLavaPage]
})
export class SolicitarLavaPageModule {}
