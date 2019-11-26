import { Component, OnInit } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Component({
  selector: 'app-solicitar-lava',
  templateUrl: './solicitar-lava.page.html',
  styleUrls: ['./solicitar-lava.page.scss'],
})
export class SolicitarLavaPage implements OnInit {
  assunto='';
  corpo='';
  para='';

  constructor(public emailComposer: EmailComposer) { }

  ngOnInit() {
  }

  enviar(){
    let email = {
      to: this.para,
      cc: [],
      ccc: [],
      attachment: [],
      subject: this.assunto,
      body: this.corpo,
      isHtml: false,
      app: "Gmail"
    }
    this.emailComposer.open(email);
  }

}
