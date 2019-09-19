import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

// Providers que são serviços que podem ser utilizado em determinadas partes do código.

//Autenticacao
@Injectable()
export class AuthProvider{

    constructor(
        private afAuth: AngularFireAuth
    ) {
    }

    //Criar usuario
    register = (data) => this.afAuth.auth.createUserWithEmailAndPassword(data.email, data.password);

    //Login
    login = (data) => this.afAuth.auth.signInWithEmailAndPassword(data.email, data.password);
}
