import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DescricaoLavaPage } from './descricao-lava.page';

const routes: Routes = [
  {
    path: '',
    component: DescricaoLavaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DescricaoLavaPage]
})
export class DescricaoLavaPageModule {}
