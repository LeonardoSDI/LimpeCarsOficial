import { Component} from '@angular/core';

import { Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  rootpage:any

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storages: Storage,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      //Lógica para decidir qual página usuário logado deve ser redirecionado
      this.storages.get('usuario')
      .then((usuario) => {
        if(usuario){
          this.rootpage = 'MostrarMapsPage'
        }else{
          this.rootpage = 'LoginPage'
        }
      })

      this.statusBar.styleDefault();
    });
  }
}
