import { Component, OnInit } from '@angular/core';
import { FirebaseProvider } from '../../providers/firebase';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ControleMapasPage } from '../controle-mapas/controle-mapas.page';
import { promise } from 'protractor';

@Component({
  selector: 'app-cadastro-lavacao',
  templateUrl: './cadastro-lavacao.page.html',
  styleUrls: ['./cadastro-lavacao.page.scss'],
})
export class CadastroLavacaoPage implements OnInit {

  controleMapas = new ControleMapasPage();
  
  lavacao = {
    'id': '',
    'empresa': '',
    'cnpj': '',
    'endereco':{
      'cep': '',
      'rua': '',
      'numero': '',
      'cidade': '',
      'pais':'',
      'coordenadas':{
        'latitude':'',
        'longitude':'',
      }
    },
    'telefone': ''

  };
  
  lavacaoForm: FormGroup;
  constructor(public dbService: FirebaseProvider, public formbuilder: FormBuilder, public navCtrl: NavController) {
    this.lavacaoForm = this.formbuilder.group({
      empresa: [null, [Validators.required, Validators.minLength(4)]],
      cnpj: [null, [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      cep: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      rua: [null, [Validators.required]],
      numero: [null],
      cidade: [null, [Validators.required]],
      pais: [null, [Validators.required]],
      telefone: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]

    });

    this.controleMapas = new ControleMapasPage();

   }

  ngOnInit(){
    
  }

  buscarEndereco(){
    let endereco = this.lavacao.endereco.cep;
    console.log('-'+endereco);

    var p1 = new Promise(
      (resolve, reject) => {
        this.controleMapas.buscarLatLongEndereco(endereco);
        window.setTimeout(
          () => {
            console.log(this.controleMapas.localizacaoEndereco)
            let dadosEndereco = this.controleMapas.dadosEndereco.formatted_address.split(',');

            this.lavacao.endereco.rua = dadosEndereco[0]
            this.lavacao.endereco.cidade = dadosEndereco[1];
            this.lavacao.endereco.pais = dadosEndereco[3];

            this.lavacao.endereco.coordenadas.latitude = this.controleMapas.localizacaoEndereco.latitude;
            this.lavacao.endereco.coordenadas.longitude = this.controleMapas.localizacaoEndereco.longitude;

            console.log(this.lavacao.endereco)
          }, 1000);
      });
  }

  cadastraLavacao(){
    var rn = require('random-number');
    var iden = rn.generator({ min: 1, max: 300, integer:true})
    iden();
    this.lavacao.id = iden();
    console.log('GERAR ID RANDOM: '+this.lavacao.id)

    console.log(this.lavacaoForm.value);
  }

  save(lavacao){
    console.log(lavacao);
    this.dbService.save(lavacao);
  }

  goBack(){
    this.navCtrl.navigateRoot("/mostrar-maps");
  }

}
