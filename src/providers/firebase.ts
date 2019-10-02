import { Observable } from "rxjs";
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { getDefaultService } from 'selenium-webdriver/opera';

@Injectable()
export class FirebaseProvider{
    constructor(private afs: AngularFirestore) {}

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
    
}