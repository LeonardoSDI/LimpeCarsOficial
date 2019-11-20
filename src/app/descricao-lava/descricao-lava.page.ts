import { Component, OnInit, forwardRef } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { LavacaoProvider } from 'src/providers/lavacao';
import { Router } from '@angular/router';

@Component({
  selector: 'app-descricao-lava',
  templateUrl: './descricao-lava.page.html',
  styleUrls: ['./descricao-lava.page.scss'],
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
    this.router.navigate(['/solicitar-lava']);
  }

}
