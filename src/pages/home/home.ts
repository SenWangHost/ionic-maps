import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform, ModalController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { FindRoutes } from '../findroutes/findroutes';

declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('startloc') startElement: ElementRef;
  @ViewChild('endloc') endElement: ElementRef;
  map: any;
  autoCompleteStart:any;
  autoCompleteEnd:any;
  directionsService:any;
  directionsDisplay:any;
  originPlaceId:any;
  destinationPlaceId:any;
  travelMode:string = 'TRANSIT';
  ngOnInit() {
    this.autoCompleteStart = new google.maps.places.Autocomplete(this.startElement.nativeElement);
    this.autoCompleteEnd = new google.maps.places.Autocomplete(this.endElement.nativeElement);
    // set up the direction service
    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer;
    // this.directionsDisplay.setMap(this.map);
    this.autoCompleteStart.addListener('place_changed', function() {
      let self = this;
      let place = self.getPlace();
      if (!place.geometry) {
          // User entered the name of a Place that was not suggested and
          // pressed the Enter key, or the Place Details request failed.
          console.log("No details available for input starting point: '" + place.name + "'");
          return;
      }
      if (place.geometry.viewport) {
          console.log(place);
          this.originPlaceId = place.place_id;
          console.log(this.originPlaceId);
      }
    })
    this.autoCompleteEnd.addListener('place_changed', function() {
      let self = this;
      let place = self.getPlace();
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

  setPlaceId(placeId:string) {

  }

  initMap() {
    this.geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      let marker = new google.maps.Marker({
        position: latLng,
        map:this.map,
        title: 'Hello World!'
      })
    }, (err) => {
      console.log(err);
    });
  }

  constructor(public navCtrl: NavController, public platform: Platform, public geolocation: Geolocation, public modalCtrl: ModalController) {
    platform.ready().then(() => {
      this.initMap();
    });
  }
  openModal() {
    let modal = this.modalCtrl.create(FindRoutes);
    modal.present();
  }

  // the function to plot trip
  plotTrip() {
    this.originPlaceId = this.autoCompleteStart.originPlaceId;
    this.destinationPlaceId = this.autoCompleteEnd.destinationPlaceId;
    if (!this.originPlaceId || !this.destinationPlaceId) {
      console.log(this.autoCompleteStart);
      return;
    }
    console.log(this.originPlaceId);
    console.log(this.destinationPlaceId);
    this.directionsService.route({
      origin: {'placeId': this.originPlaceId},
      destination: {'placeId': this.destinationPlaceId},
      travelMode: this.travelMode
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setMap(this.map);
        console.log(response);
        console.log(this.directionsDisplay);
        console.log(this.map);
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }
}
