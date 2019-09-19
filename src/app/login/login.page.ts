import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { AuthProvider } from '../../providers/auth';
import { FirebaseProvider } from '../../providers/firebase';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  animations: [
    trigger(
      'login', [
        transition(':enter', [
          style({
            opacity: 0
          }),
          animate("1s ease-in-out", style({
            opacity: 1
          }))
        ]),
        transition(':leave', [
          style({
            opacity: 0
          })
        ])
      ],
    ),
    trigger(
      'registro', [
        transition(':enter', [
          style({
            opacity: 0
          }),
          animate("1s ease-in-out", style({
            opacity: 1
          }))
        ]),
        transition(':leave', [
          style({
            opacity: 0
          })
        ])
      ],
    ),
  ]
})
export class LoginPage implements OnInit {

  login = true;
  register = false;
  loginForm = {
    email: '',
    password: ''
  };
  registerForm = {
    name: '',
    email: '',
    password: ''
  };
  

  constructor(
    private authProvider: AuthProvider,
    private firebaseProvider: FirebaseProvider,
    private loadingCtrl: LoadingController
  ) {
  }

  // Exibir o formulário de registro
  exibirRegistrar(){
    this.login = false;
    this.register = true;
  }

  // Exibir o formulário de login
  exibirLogin(){
    this.login = true;
    this.register = false;
  }

  //Função Login
  async efetuarLogin(){
    let load = await this.loadingCtrl.create({
      message: 'Olá',
      duration: 2000
    });
    await load.present();
    this.authProvider.login(this.loginForm)
    .then((res) => {
      load.dismiss();
    })
    .catch((err) => {
      load.dismiss();
    })
  }

  //Função registro
  async criarConta(){
    let load = await this.loadingCtrl.create({
      message: 'Olá',
      duration: 2000
    });
    await load.present();
    this.authProvider.register(this.registerForm)
    .then((res) => {
      let uid = res.user.uid;

      //Organizar dados
      let data = {
        uid: uid,
        name: this.registerForm.name,
        email: this.registerForm.email
      };

      //Gravar dados no firestore
      this.firebaseProvider.postUser(data)
      .then(() => {
        load.dismiss();
      })
    })
    .catch((err) => {
      load.dismiss();
    })
  }

  ngOnInit() {
  }

}
