import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-controle-mapas',
  templateUrl: './controle-mapas.page.html',
  styleUrls: ['./controle-mapas.page.scss'],
})
export class ControleMapasPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  private googleMapsAPIKey = "&key=AIzaSyD5Kt-OoieXis55Tuyfj9pGo1CBFKb8f9I";
  private urlBuscarEndereco= "https://maps.googleapis.com/maps/api/geocode/json?address=";

  localizacaoEndereco={
    'latitude':"",
    'longitude':""
  }

  dadosEndereco={
    'formatted_address':""
  }

  private buscarTermosEndereco(endereco: string){
    let termosBusca=endereco.toString().split(" ");
    return termosBusca;
  }

  buscarLatLongEndereco(endereco){
    this.localizacaoEndereco={
      'latitude':"",
      'longitude':""
    }

    this.dadosEndereco={
      'formatted_address':""
    }

    let urlEndereco = this.buscarTermosEndereco(endereco);

    axios({
      method:'get',
      url:this.urlBuscarEndereco+urlEndereco+this.googleMapsAPIKey,
    })
    .then((response) =>{
      console.log(response.data)
      if(response.data.results!=null && response.data.status=="OK"){
        this.dadosEndereco = response.data.results[0];
        let localizacao = response.data.results[0].geometry.location

        this.localizacaoEndereco={
          latitude: localizacao.lat,
          longitude: localizacao.lng,
        }
      }
    })
    .catch((error) => {
      console.log("errado: "+error.message);
    })
  }

}
