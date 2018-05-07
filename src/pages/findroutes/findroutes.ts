import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
    selector: 'find-routes',
    templateUrl: 'findroutes.html'
  })

export class FindRoutes {
    constructor(public viewCtrl: ViewController) {

    }
    dismiss() {
        this.viewCtrl.dismiss();
    }
} 