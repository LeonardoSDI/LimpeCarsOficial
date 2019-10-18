import { Component, OnInit } from '@angular/core';
import { FirebaseProvider } from '../../providers/firebase';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro-lavacao',
  templateUrl: './cadastro-lavacao.page.html',
  styleUrls: ['./cadastro-lavacao.page.scss'],
})
export class CadastroLavacaoPage implements OnInit {

  lavacao = {
    'empresa': '',
    'cnpj': '',
    'cep': '',
    'rua': '',
    'bairro': '',
    'numero': '',
    'cidade': '',
    'telefone': ''

  };
  
  lavacaoForm: FormGroup;
  constructor(public dbService: FirebaseProvider, public formbuilder: FormBuilder, public navCtrl: NavController) {
    this.lavacaoForm = this.formbuilder.group({
      empresa: [null, [Validators.required, Validators.minLength(4)]],
      cnpj: [null, [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      cep: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      rua: [null, [Validators.required]],
      bairro: [null, [Validators.required]],
      numero: [null],
      cidade: [null, [Validators.required]],
      telefone: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]

    })
   }

  ngOnInit(){
    
  }

  cadastraLavacao(){
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
