import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, NavParams } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment,
  MarkerCluster,
  MarkerClusterOptions
} from '@ionic-native/google-maps';
import { LavacaoProvider } from 'src/providers/lavacao';
import { DescricaoLavaPage } from '../descricao-lava/descricao-lava.page';
import { stringify } from '@angular/compiler/src/util';
import { FirebaseProvider } from 'src/providers/firebase';
import { Lavacao } from '../lavacoes';
import { Subscription } from 'rxjs';
import { LavacoesService } from '../services/lavacoes.service';

@Component({
  selector: 'app-mostrar-maps',
  templateUrl: './mostrar-maps.page.html',
  styleUrls: ['./mostrar-maps.page.scss'],
})
export class MostrarMapsPage implements OnInit {
  map: GoogleMap;
  points = [];
  lavacoes;
  private lavacaoId: string = null;
  private lavacaoLat: string = null;
  private lavacaoLng: string = null;
  private lavacaoName: string = null;
  public lavacao: Lavacao = {};
  private loading: any;
  private lavacaoSubscription: Subscription;

  constructor(
    public navCtrl: NavController,
    public geolocation: Geolocation,
    public modalCtrl: ModalController,
    public dbService: FirebaseProvider,
    public lavacaoService: LavacoesService,
    public activeRoute: ActivatedRoute,
    public router: Router) { 
      this.lavacaoId = this.activeRoute.snapshot.params['id'];
      this.lavacaoLat = this.activeRoute.snapshot.params['latitude'];
      this.lavacaoLng = this.activeRoute.snapshot.params['longitude'];
      this.lavacaoName = this.activeRoute.snapshot.params['name'];
    }

  ngOnInit() {
    this.loadMap();
    this.carregarDados();
  }

  cadastroLavacao(){
    this.navCtrl.navigateRoot('/cadastro-lavacao');
  }

  carregarDados() {
    this.lavacaoSubscription = this.lavacaoService.getProduct('18ecmmQTzkygMyru9yYn').subscribe(data => {
      this.lavacao = data;
    });
  }

  async loadMap(){
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyD5Kt-OoieXis55Tuyfj9pGo1CBFKb8f9I',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyD5Kt-OoieXis55Tuyfj9pGo1CBFKb8f9I'
    });
    console.log(this.geolocation)
    this.geolocation.getCurrentPosition().then((resp) => {
      let mapOptions: GoogleMapOptions = {
        camera: {
           target: {
             lat: resp.coords.latitude,
             lng: resp.coords.longitude
           },
           zoom: 18,
           tilt: 30
         }
      };
  
      this.map = GoogleMaps.create('map_canvas', mapOptions);

      this.fillMissedPointsLavacao();

      this.points.push({
        position: {
          lat: resp.coords.latitude,
          lng: resp.coords.longitude
        },
        icon: {
          url: "assets/imgs/usuario.png",
          size: {
            width: 30,
            height: 30
          }
        }
      });

        let markerCluster: MarkerCluster = this.map.addMarkerClusterSync({
        boundsDraw: false,
        markers: this.points,
        icons: [
          {
            min: 500,
            url: "assets/imgs/usuario.png"
          }
        ]
      });

    }).catch((error) => {
      console.log('Error ao pegar localidade', JSON.stringify(error));
      alert('Erro ao capturar a sua posição. Por favor, verifique as permissões!');
    })
  }

  getMissedLavacao() {
    /*var rn = require('random-number');
    var iden = rn.generator({ min: 1, max: 300, integer:true})
    iden();
    console.log('GERAR ID RANDOM: '+iden())*/
    
    return[ 
        {id: 1, name:'Lavação do Pedrinho',
        geo: {lat: -26.467815, lng: -49.113292}, type: 'Lavagem Ecológica',
        attendance: '08:00 - 17:00', description: 'Lavação especializada em lavagem ecológica. Solicite uma lavagem!', 
        contact: {phone: '(47) 99234-0978'}},

        {id: 2, name: 'Lavação Topper',
        geo: {lat: -26.465941, lng: -49.112687}, type: 'Lavagem Especializada',
        attendance: '08:30 - 17:30', description: 'Lavação que busca atender de forma simples e rápida os clientes.',
        contact: {phone: '(47) 98867-5546'}},

        {id: 3, name: 'Lavação PraJá',
        geo: {lat: -26.468079, lng: -49.111270}, type: 'Lavagem Ecológica',
        attendance: '07:30 - 18:00', description: 'Lavação especializada em lavagem ecológica. Pensamos no meio-ambiente!',
        contact: {phone: '(47) 99954-2231'}}
    ]
}

  getMissedLavacaoId(id){
    return this.getMissedLavacao().filter(lavacao => lavacao.id == id)[0];
}
  
  private fillMissedPointsLavacao(){
    this.getMissedLavacao().forEach(lavacao => {
      let point = {
        position: {
          lat: this.lavacaoLat, 
          lng: this.lavacaoLng
        },
        name: this.lavacaoName,
        id: this.lavacaoId,
        icon: {
          url: "assets/imgs/lavacao.png",
          size: {
            width: 30,
            height: 30
          }
        }
      }

      this.points.push(point);
    })
  }

  goBack(){
    this.navCtrl.navigateRoot('/list-lavacao');
  }

}