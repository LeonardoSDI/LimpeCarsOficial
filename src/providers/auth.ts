import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'src/app/user';

// Providers que são serviços que podem ser utilizado em determinadas partes do código.

//Autenticacao
@Injectable({
    providedIn: 'root'
})
export class AuthProvider{

    constructor(
        private afAuth: AngularFireAuth
    ) {
    }

    login(user: User) {
        return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      }
    
      register(user: User) {
        return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      }
    
      logout() {
        return this.afAuth.auth.signOut();
      }
    
      getAuth() {
        return this.afAuth.auth;
      }
}
