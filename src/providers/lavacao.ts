import { Injectable, OnInit, Component  } from '@angular/core';
import { CadastroLavacaoPage } from 'src/app/cadastro-lavacao/cadastro-lavacao.page';
import { HTTP } from '@ionic-native/http/ngx';
import { MostrarMapsPageModule } from '../app/mostrar-maps/mostrar-maps.module';
import { MostrarMapsPage } from 'src/app/mostrar-maps/mostrar-maps.page';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FirebaseProvider } from 'src/providers/firebase';
import { Observable } from 'rxjs';
import { Lavacao } from 'src/app/lavacoes';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LavacaoProvider implements OnInit{
    lavacoes;
    private lavacoesCollection: AngularFirestoreCollection<Lavacao>;
    constructor(private afs: AngularFirestore) {
        this.lavacoesCollection = this.afs.collection<Lavacao>('Lavacoes');
    }

    updateProduct(id: string, lavacoes: Lavacao) {
        return this.lavacoesCollection.doc<Lavacao>(id).update(lavacoes);
    }

    deleteProduct(id: string) {
        return this.lavacoesCollection.doc(id).delete();
      }
    

    ngOnInit(){
    }

    
}