import { Observable } from "rxjs";
import 'rxjs/add/operator/map';
import { Injectable, Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { getDefaultService } from 'selenium-webdriver/opera';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class FirebaseProvider{
    lavacoesDb;
    private PATH = 'lavacoes/';
    constructor(private afs: AngularFirestore, private db: AngularFireDatabase) {}

    //Criar usuario no firestore
    postUser = data =>
     this.afs
      .collection("users")
      .doc(data.uid)
      .set(data);

    getUser(uid){
      return this.afs.firestore.collection('users').doc(uid)
      .get();
    }

    getAll(){
      return this.db.list('lavacoes').snapshotChanges().map(data => {
        return data.map(d => ({key: d.key, ...d.payload.val()}));
      })
    }

    get(key: string){
        return this.db.object(this.PATH + key)
              .snapshotChanges()
              .map(l => {
                  return {key: l.key, data: l.payload.val()};
              })
    }

    save(lavacao: any){
      this.db.list('lavacoes').push(lavacao).then(r => console.log(r));
    }
    
}