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
    autoCompleteStart:any;
    autoCompleteEnd:any;
    constructor(public viewCtrl: ViewController) {
    }

    ngOnInit() {
        this.autoCompleteStart = new google.maps.places.Autocomplete(this.startElement.nativeElement);
        this.autoCompleteEnd = new google.maps.places.Autocomplete(this.endElement.nativeElement);
        this.autoCompleteStart.addListener('place_changed', function() {
            let me = this;
            let place = me.getPlace();
            if (!place.geometry) {
                // User entered the name of a Place that was not suggested and
                // pressed the Enter key, or the Place Details request failed.
                console.log("No details available for input starting point: '" + place.name + "'");
                return;
            }
            if (place.geometry.viewport) {
                console.log(place);
                this.originPlaceId = place.place_id;
                console.log(this.originPlaceId)
            }
        })
        this.autoCompleteEnd.addListener('place_changed', function() {
            let me = this;
            let place = me.getPlace();
            if (!place.geometry) {
                // User entered the name of a Place that was not suggested and
                // pressed the Enter key, or the Place Details request failed.
                console.log("No details available for input destination: '" + place.name + "'");
                return;
            }
            if (place.geometry.viewport) {
                console.log(place);
                this.destinationPlaceId = place.place_id;
                console.log(this.destinationPlaceId)
            }
        })
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

} 