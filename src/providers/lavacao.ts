import { Injectable, OnInit, Component  } from '@angular/core';
import { CadastroLavacaoPage } from 'src/app/cadastro-lavacao/cadastro-lavacao.page';
import { HTTP } from '@ionic-native/http/ngx';
import { MostrarMapsPageModule } from '../app/mostrar-maps/mostrar-maps.module';
import { MostrarMapsPage } from 'src/app/mostrar-maps/mostrar-maps.page';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseProvider } from 'src/providers/firebase';
import { Observable } from 'rxjs';

@Component({
    template:`
    <ul>
        <li *ngFor="let l of lavacoes|async">
            {{l|json}}
        </li>
    </ul>
    `
})
export class LavacaoProvider implements OnInit{
    lavacoes: Observable<any[]>
    constructor(public http: HTTP, public dbService: AngularFireDatabase) {
        this.lavacoes = dbService.list('lavacoes').valueChanges();
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

    getAll(){
        return this.dbService.list('lavacoes').snapshotChanges().map(data => {
          return data.map(d => ({key: d.key, ...d.payload.val()}));
        })
      }


    ngOnInit(){
    }

    
}