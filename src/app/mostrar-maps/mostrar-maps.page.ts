import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';

@Component({
  selector: 'app-mostrar-maps',
  templateUrl: './mostrar-maps.page.html',
  styleUrls: ['./mostrar-maps.page.scss'],
})
export class MostrarMapsPage implements OnInit {
  map: GoogleMap;

  constructor(
    public navCtrl: NavController,
    public geolocation: Geolocation) { }

  ngOnInit() {
    this.loadMap();
  }

  loadMap(){
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyD5Kt-OoieXis55Tuyfj9pGo1CBFKb8f9I',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyD5Kt-OoieXis55Tuyfj9pGo1CBFKb8f9I'
    });

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
  
      let marker: Marker = this.map.addMarkerSync({
        title: 'Ionic',
        icon: 'blue',
        animation: 'DROP',
        position: {
          lat: resp.coords.latitude,
          lng: resp.coords.longitude
        }
      });
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        alert('clicked');
      });

    }).catch((error) => {
      console.log('Error ao pegar localidade', JSON.stringify(error));
      alert('Erro ao capturar a sua posição. Por favor, verifique as permissões!');
    })

    
  }

}
