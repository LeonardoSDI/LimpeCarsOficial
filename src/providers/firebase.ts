import { Observable } from "rxjs";
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable()
export class FirebaseProvider{
    constructor(private afs: AngularFirestore) {}

    //Criar usuario no firestore
    postUser = data =>
     this.afs
      .collection("users")
      .doc(data.uid)
      .set(data);
    
}