import { Injectable } from '@angular/core';

@Injectable()
export class LavacaoProvider{

    constructor() {}

    getMissedLavacao() {
        return[
            {id: 1, name: 'Lavação do Pedrinho',
            geo: {lat: -26.467815, lng: -49.113292}, type: 'Lavagem Ecológica',
            photo: './assets/imgs/lavacao1.png',
            attendance: '08:00 - 17:00', description: 'Lavação especializada em lavagem ecológica. Solicite uma lavagem!', 
            contact: {phone: '(47) 99234-0978'}},

            {id: 2, name: 'Lavação Topper',
            geo: {lat: -26.465941, lng: -49.112687}, type: 'Lavagem Especializada',
            photo: './assets/imgs/lavacao2.png',
            attendance: '08:30 - 17:30', description: 'Lavação que busca atender de forma simples e rápida os clientes.',
            contact: {phone: '(47) 98867-5546'}},

            {id: 1, name: 'Lavação PraJá',
            geo: {lat: -26.468079, lng: -49.111270}, type: 'Lavagem Ecológica',
            photo: './assets/imgs/lavacao3.png',
            attendance: '07:30 - 18:00', description: 'Lavação especializada em lavagem ecológica. Pensamos no meio-ambiente!',
            contact: {phone: '(47) 99954-2231'}}
        ]
    }
}