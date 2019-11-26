import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FirebaseProvider } from 'src/providers/firebase';
import { HTTP } from '@ionic-native/http/ngx';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { User } from 'firebase';
import { NavController, IonList } from '@ionic/angular';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-list-lavacao',
  templateUrl: './list-lavacao.page.html',
  styleUrls: ['./list-lavacao.page.scss'],
})
export class ListLavacaoPage implements OnInit {
  lavacoesDb;
  lavacoes;
  public carregaLista: any;
  public loadedlist: any;

  constructor(public dbService: FirebaseProvider, public firebase: AngularFireDatabase, public http: HTTP, public navCtrl: NavController) { 
    this.lavacoes = this.dbService.getAll();
  }

  ngOnInit() {
  }

  goBack(){
    this.navCtrl.navigateRoot("/mostrar-maps");
  }

  solicitarLava(){
    
  }

}
