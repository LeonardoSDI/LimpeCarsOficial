import { Component, OnInit } from '@angular/core';
import { FirebaseProvider } from 'src/providers/firebase';
import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-list-lavacao',
  templateUrl: './list-lavacao.page.html',
  styleUrls: ['./list-lavacao.page.scss'],
})
export class ListLavacaoPage implements OnInit {

  lavacoesDb;

  constructor(public dbService: FirebaseProvider, public http: HTTP) { 
    this.lavacoesDb = this.dbService.getAll();
  }

  ngOnInit() {
    //this.buscandoDadosFirebase();
  }

  /*buscandoDadosFirebase(){
    this.http.get('https://limpecars.firebaseio.com/lavacoes.json', {}, {})
    .then(data => {
      this.tratarDados(data);
    })

  }

  tratarDados(dados){
    this.lavacoesDb = Object.keys(dados).map(i => dados[i])
    console.log(this.lavacoesDb);
  }*/

}
