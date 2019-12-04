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
import { timingSafeEqual } from 'crypto';

@Component({
  selector: 'app-mostrar-maps',
  templateUrl: './mostrar-maps.page.html',
  styleUrls: ['./mostrar-maps.page.scss'],
})
export class MostrarMapsPage implements OnInit {
  map: GoogleMap;
  points = [];
  pontos = [];
  lava = [];
  private lavacaoId: string = null;
  private lavacaoLat: string = null;
  private lavacaoLng: string = null;
  private lavacaoName: string = null;
  public lavacoes = new Array<Lavacao>();
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
      console.log(this.lavacaoId);
    }

  ngOnInit() {
    this.loadMap();
  }

  cadastroLavacao(){
    this.navCtrl.navigateRoot('/cadastro-lavacao');
  }

  carregarDados() {
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
      this.lavacaoSubscription = this.lavacaoService.getProduct('18ecmmQTzkygMyru9yYn').subscribe(data => {
        this.lavacao = data;
        console.log(this.lavacao.latitude);
        this.pontos.push({
          position:{
            lat: this.lavacao.latitude,
            lng: this.lavacao.longitude
          },
          icon: {
            url: "assets/imgs/lavacao.png",
            size: {
              width: 30,
              height: 30
            }
          }
        })

        let markerClusters: MarkerCluster = this.map.addMarkerClusterSync({
          boundsDraw: false,
          markers: this.pontos,
          icons: [
            {
              min: 500,
              url: "assets/imgs/lavacao.png"
            }
          ]
  
          
        });
      });

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

  goBack(){
    this.navCtrl.navigateRoot('/list-lavacao');
  }

}