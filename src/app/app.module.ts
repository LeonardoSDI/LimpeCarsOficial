import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

//Firebase config
import { firebaseConfig } from '../configs/firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Keyboard } from '@ionic-native/keyboard/ngx';

//Plugins
import { IonicStorageModule } from '@ionic/storage';

//Providers
import { AuthProvider } from '../providers/auth';
import { FirebaseProvider } from '../providers/firebase';
import { LavacaoProvider } from 'src/providers/lavacao';

import { LoginPageModule } from '../app/login/login.module';
import { MostrarMapsPageModule } from '../app/mostrar-maps/mostrar-maps.module';
import { DescricaoLavaPageModule } from '../app/descricao-lava/descricao-lava.module'; 
import { CadastroLavacaoPageModule } from '../app/cadastro-lavacao/cadastro-lavacao.module';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SolicitarLavaPageModule } from '../app/solicitar-lava/solicitar-lava.module';
import { ControleMapasPageModule } from './controle-mapas/controle-mapas.module';
import { ListLavacaoPageModule} from '../app/list-lavacao/list-lavacao.module';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserAnimationsModule, 
    LoginPageModule, 
    MostrarMapsPageModule,
    DescricaoLavaPageModule,
    CadastroLavacaoPageModule,
    ControleMapasPageModule,
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicStorageModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    SolicitarLavaPageModule,
    ListLavacaoPageModule
  ],
  providers: [
    FirebaseProvider,
    AuthProvider,
    StatusBar,
    SplashScreen,
    Geolocation,
    HTTP,
    LavacaoProvider,
    EmailComposer,
    Keyboard,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
