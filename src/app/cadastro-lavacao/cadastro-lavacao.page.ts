import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { ControleMapasPage } from '../controle-mapas/controle-mapas.page';
import { promise } from 'protractor';
import { Lavacao } from '../lavacoes';
import { Subscription } from 'rxjs';
import { AuthProvider } from 'src/providers/auth';
import { LavacoesService } from '../services/lavacoes.service';

@Component({
  selector: 'app-cadastro-lavacao',
  templateUrl: './cadastro-lavacao.page.html',
  styleUrls: ['./cadastro-lavacao.page.scss'],
})
export class CadastroLavacaoPage implements OnInit {
  private lavacaoId: string = null;
  public lavacao: Lavacao = {};
  private loading: any;
  private lavacaoSubscription: Subscription;

  controleMapas = new ControleMapasPage();

  lavacaoForm: FormGroup;
  constructor(public formbuilder: FormBuilder, public navCtrl: NavController,
    private loadingCtrl: LoadingController, private toastCtrl: ToastController, private authProvider: AuthProvider,
    private lavacaoService: LavacoesService) {
    this.lavacaoForm = this.formbuilder.group({
      empresa: [null, [Validators.required, Validators.minLength(4)]],
      cnpj: [null, [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      cep: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      rua: [null, [Validators.required]],
      numero: [null],
      cidade: [null, [Validators.required]],
      pais: [null, [Validators.required]],
      telefone: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      tipo: [null, [Validators.required]],
      descricao: [null, [Validators.required]],
      atendimento: [null, [Validators.required]],
      preco: [null, [Validators.required]]

    });

    this.controleMapas = new ControleMapasPage();

  }

  ngOnInit() {

  }

  buscarEndereco() {
    let endereco = this.lavacao.cep;
    console.log('-' + endereco);

    var p1 = new Promise(
      (resolve, reject) => {
        this.controleMapas.buscarLatLongEndereco(endereco);
        window.setTimeout(
          () => {
            console.log(this.controleMapas.localizacaoEndereco)
            let dadosEndereco = this.controleMapas.dadosEndereco.formatted_address.split(',');

            this.lavacao.rua = dadosEndereco[0]
            this.lavacao.cidade = dadosEndereco[1];
            this.lavacao.pais = dadosEndereco[3];

            this.lavacao.latitude = this.controleMapas.localizacaoEndereco.latitude;
            this.lavacao.longitude = this.controleMapas.localizacaoEndereco.longitude;

            console.log(this.lavacao.latitude, this.lavacao.longitude)
          }, 1000);
      });
  }

  async saveLavacao() {
    await this.presentLoading();

    this.lavacao.userId = this.authProvider.getAuth().currentUser.uid;


    this.lavacao.createdAt = new Date().getTime();
    try {
      await this.lavacaoService.addLavacao(this.lavacao);
      await this.loading.dismiss();
      this.navCtrl.navigateBack('/list-lavacao');
    } catch (error) {
      this.presentToast('Erro ao tentar salvar');
      this.loading.dismiss();
    }

  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }


  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

}
