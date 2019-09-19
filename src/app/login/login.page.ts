import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  login = true;
  register = false;
  

  constructor() { }

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

  ngOnInit() {
  }

}
