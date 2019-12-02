import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Lavacao } from 'src/app/lavacoes';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LavacoesService {
  private lavacoesColletion: AngularFirestoreCollection<Lavacao>;

  constructor(private afs: AngularFirestore) {
    this.lavacoesColletion = this.afs.collection<Lavacao>('Lavacoes');
  }

  getLavacoes() {
    return this.lavacoesColletion.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }
  getProduct(id: string) {
    return this.lavacoesColletion.doc<Lavacao>(id).valueChanges();
  }

  addLavacao(lavacao: Lavacao){
    return this.lavacoesColletion.add(lavacao);
  }
}
