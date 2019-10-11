import { Component, OnInit } from '@angular/core';
import { FirebaseProvider } from '../../providers/firebase';

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
    'endereco': '',
    'numero': '',
    'telefone': ''

  };

  constructor(public dbService: FirebaseProvider) { }

  ngOnInit() {
  }

  save(lavacao){
    console.log(lavacao);
    this.dbService.save(lavacao);
  }

}
