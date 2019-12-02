import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from '@ionic/angular';
import { LavacaoProvider } from 'src/providers/lavacao';
import { Router } from '@angular/router';
import { SolicitarLavaPage } from '../solicitar-lava/solicitar-lava.page';
import { SolicitarLavaPageModule } from '../solicitar-lava/solicitar-lava.module';
import { trigger, style, animate, transition } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { AuthProvider } from 'src/providers/auth';
import { Lavacao } from '../lavacoes';
import { Subscription } from 'rxjs';
import { LavacoesService } from '../services/lavacoes.service';
import { database } from 'firebase';

@Component({
  selector: 'app-descricao-lava',
  templateUrl: './descricao-lava.page.html',
  styleUrls: ['./descricao-lava.page.scss']
})
export class DescricaoLavaPage implements OnInit {
  private lavacaoId: string = null;
  public lavacao: Lavacao = {};
  private loading: any;
  private lavacaoSubscription: Subscription;

  constructor(private lavacaoService: LavacoesService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private authProvider: AuthProvider,
    private toastCtrl: ToastController) {
      this.lavacaoId = this.activatedRoute.snapshot.params['id'];

      if (this.lavacaoId) this.loadProduct();
    }

  ngOnInit() {
  }

  loadProduct() {
    this.lavacaoSubscription = this.lavacaoService.getProduct(this.lavacaoId).subscribe(data => {
      this.lavacao = data;
    });
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }
}
