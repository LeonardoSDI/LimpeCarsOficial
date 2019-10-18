import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CadastroLavacaoPage } from './cadastro-lavacao.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroLavacaoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CadastroLavacaoPage]
})
export class CadastroLavacaoPageModule {

  constructor(){
  }

}
