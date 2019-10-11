import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Router } from '@angular/router';

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
import { present } from '@ionic/core/dist/types/utils/overlays';

@Component({
  selector: 'app-mostrar-maps',
  templateUrl: './mostrar-maps.page.html',
  styleUrls: ['./mostrar-maps.page.scss'],
})
export class MostrarMapsPage implements OnInit {
  map: GoogleMap;
  points = [];

  constructor(
    public navCtrl: NavController,
    public geolocation: Geolocation,
    public modalCtrl: ModalController,
    public lavacaoProvider: LavacaoProvider,
    public router: Router) { }

  ngOnInit() {
    this.loadMap();
  }

  cadastroLavacao(){
    this.navCtrl.navigateRoot('/cadastro-lavacao');
  }

  loadMap(){
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

      /*markerCluster.on(GoogleMapsEvent.MARKER_CLICK).subscribe((params) => {
        let marker: Marker = params;
        let profileModal = this.modalCtrl.create(DescricaoLavaPage, {id: marker.get('id')});
        profileModal.present();
      });*/
  
      /*let marker: Marker = this.map.addMarkerSync({
        title: 'Ionic',
        icon: 'red',
        animation: 'DROP',
        position: {
          lat: resp.coords.latitude,
          lng: resp.coords.longitude
        }
      });
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        alert('clicked');
      });*/

    }).catch((error) => {
      console.log('Error ao pegar localidade', JSON.stringify(error));
      alert('Erro ao capturar a sua posição. Por favor, verifique as permissões!');
    })
    
    
  }

  private fillMissedPointsLavacao(){
    this.lavacaoProvider.getMissedLavacao().forEach(lavacao => {
      let point = {
        position: {
          lat: lavacao.geo.lat,
          lng: lavacao.geo.lng
        },
        name: lavacao.name,
        id: lavacao.id,
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

}
