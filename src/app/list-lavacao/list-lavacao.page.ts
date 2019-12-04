import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FirebaseProvider } from 'src/providers/firebase';
import { HTTP } from '@ionic-native/http/ngx';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { User } from 'firebase';
import { NavController, IonList, LoadingController, ToastController } from '@ionic/angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Lavacao } from '../lavacoes';
import { AuthProvider } from 'src/providers/auth';
import { LavacaoProvider } from 'src/providers/lavacao';
import { Subscription } from 'rxjs';
import { NavigationExtras } from '@angular/router';
import { LavacoesService } from '../services/lavacoes.service';

@Component({
  selector: 'app-list-lavacao',
  templateUrl: './list-lavacao.page.html',
  styleUrls: ['./list-lavacao.page.scss'],
})
export class ListLavacaoPage implements OnInit {
  private loading: any;
  public lavacoes = new Array<Lavacao>();
  private lavacoesSubscription: Subscription;

  constructor(public dbService: FirebaseProvider, public firebase: AngularFireDatabase, public http: HTTP, 
    public navCtrl: NavController, public lavacaoService: LavacoesService, private authProvider: AuthProvider,
    private loadingCtrl: LoadingController, private toastCtrl: ToastController,) { 
    this.lavacoesSubscription = this.lavacaoService.getLavacoes().subscribe(data => {
      this.lavacoes = data;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.lavacoesSubscription.unsubscribe();
  }

  async logout() {
    await this.presentLoading();

    try {
      await this.authProvider.logout();
    this.navCtrl.navigateRoot('/login')
    } catch (error) {
      console.error(error);
    } finally {
      this.loading.dismiss();
    }
  }

  /*async deleteProduct(id: string) {
    try {
      await this.lavacaoService.deleteProduct(id);
    } catch (error) {
      this.presentToast('Erro ao tentar deletar');
    }
  }*/

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

  
  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  goBack(){
    this.navCtrl.navigateRoot('/mostrar-maps');
  }

  cadastrar(){
    this.navCtrl.navigateRoot('/cadastro-lavacao');
  }
}
