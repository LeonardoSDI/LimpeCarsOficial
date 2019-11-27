import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { AuthProvider } from '../../providers/auth';
import { FirebaseProvider } from '../../providers/firebase';
import { LoadingController, IonInput} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { database } from 'firebase';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Keyboard } from '@ionic-native/keyboard/ngx';

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

  private url

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
  
  lavacaoForm: FormGroup;
  constructor(
    private authProvider: AuthProvider,
    private firebaseProvider: FirebaseProvider,
    private loadingCtrl: LoadingController,
    private storages: Storage,
    private router: Router,
    private keyboard: Keyboard,
    private formBuilder: FormBuilder
  ){
    this.lavacaoForm = this.formBuilder.group({
      email: [null, [Validators.required]],
      senha: [null, [Validators.required]]

    });
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
      message: 'Olá!',
      duration: 2000
    });
    await load.present();
    this.authProvider.login(this.loginForm)
    .then((res) => {
      let uid = res.user.uid;
      this.firebaseProvider.getUser(uid)
      .then((res) => {
        let data = res.data();
        this.storages.set('usuario', data)
        .then(() => {
          load.dismiss();
          this.router.navigateByUrl('/mostrar-maps');
        })
      })
      
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

        this.storages.set('usuario', data)
        .then(() => {
          load.dismiss();
          this.router.navigateByUrl('/mostrar-maps');
        })
      })
    })
    .catch((err) => {
      load.dismiss();
    })
  }

  ngOnInit() {
  }

}