import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, LoadingController, ToastController, NavController } from '@ionic/angular';
import { User } from 'src/app/user';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { Lavacao } from 'src/app/lavacoes';
import { AuthProvider } from 'src/providers/auth';
import { LavacaoProvider } from 'src/providers/lavacao';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonSlides, {static:true}) slides: IonSlides;
  public userLogin: User = {};
  public userRegister: User = {};
  private loading: any;

  constructor(
    private authProvider: AuthProvider,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public keyboard: Keyboard,
    public lavacaoProvider: LavacaoProvider,
    public navCtrl: NavController
  ) { 
  }

  ngOnInit() { }
  segmentChanged(event: any) {
    if (event.detail.value === 'login') {
      this.slides.slidePrev();
    } else {
      this.slides.slideNext();
    }
  }

  async login() {
    await this.presentLoading();

    try {
      await this.authProvider.login(this.userLogin);
      this.navCtrl.navigateRoot('/list-lavacao')
    } catch (error) {
      this.presentToast(error.message);
    } finally {
      this.loading.dismiss();
    }
  }

  async register() {
    await this.presentLoading();

    try {
      await this.authProvider.register(this.userRegister);
    } catch (error) {
      this.presentToast(error.message);
    } finally {
      this.loading.dismiss();
    }
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