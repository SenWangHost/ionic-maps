import { Component, ViewChild, ElementRef } from '@angular/core';
import { ViewController } from 'ionic-angular';

declare var google: any;

@Component({
    selector: 'find-routes',
    templateUrl: 'findroutes.html'
  })

export class FindRoutes {
    @ViewChild('startloc') startElement: ElementRef;
    @ViewChild('endloc') endElement: ElementRef;
    startloc:string;
    endloc:string;
    autoCompleteStart:any;
    autoCompleteEnd:any;
    constructor(public viewCtrl: ViewController) {
    }

    ngOnInit() {
        this.autoCompleteStart = new google.maps.places.Autocomplete(this.startElement.nativeElement);
        this.autoCompleteEnd = new google.maps.places.Autocomplete(this.endElement.nativeElement);
        this.autoCompleteStart.addListener('place_changed', function() {
            let place = this.getPlace();
            if (!place.geometry) {
                // User entered the name of a Place that was not suggested and
                // pressed the Enter key, or the Place Details request failed.
                console.log("No details available for input: '" + place.name + "'");
                return;
            }
            if (place.geometry.viewport) {
                console.log(place);
            }
        })
        this.autoCompleteEnd.addListener('place_changed', function() {
            let place = this.getPlace();
            if (!place.geometry) {
                // User entered the name of a Place that was not suggested and
                // pressed the Enter key, or the Place Details request failed.
                console.log("No details available for input: '" + place.name + "'");
                return;
            }
            if (place.geometry.viewport) {
                console.log(place);
            }
        })
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

} 