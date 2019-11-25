import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { LavacaoProvider } from 'src/providers/lavacao';
import { Router } from '@angular/router';
import { SolicitarLavaPage } from '../solicitar-lava/solicitar-lava.page';
import { SolicitarLavaPageModule } from '../solicitar-lava/solicitar-lava.module';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-descricao-lava',
  templateUrl: './descricao-lava.page.html',
  styleUrls: ['./descricao-lava.page.scss']
})
export class DescricaoLavaPage implements OnInit {

  lavacao;

  constructor(public navCtrl: NavController,
    public navParams: NavParams, 
    public lavacaoProvider: LavacaoProvider,
    public router: Router) {

      this.lavacao = lavacaoProvider.getMissedLavacaoId(navParams.get('id'));
    }

  ngOnInit() {
  }

  goBack1(){
    this.router.navigate(['/mostrar-maps']);
  }

  solicitarLavacao(){
  }

}
