import { Component, Input, OnInit } from '@angular/core';
import { Geolocation } from 'ionic-native';

import { TheaterService } from '../../service/theater.service';

@Component({
  selector: 'theater-cmp',
  template: `
  <ion-item *ngIf="!initlat || !initlng" class="chargement" text-center>
    <p>Récupération des cinémas</p>
    <ion-spinner name="dots"></ion-spinner>
  </ion-item>
  <sebm-google-map
    *ngIf="initlat && initlng"
    [latitude]="initlat"
    [longitude]="initlng"
    [zoom]="12">
      <sebm-google-map-marker
        *ngFor="let theater of theaters"
        [latitude]="theater.geoloc.lat"
        [longitude]="theater.geoloc.long"
        [title]="theater.name">
        </sebm-google-map-marker>
  </sebm-google-map>
  `
})
export class TheaterCmp implements OnInit {

  @Input() search:string;
  @Input() movie:string;
  initlat:number;
  initlng:number;
  theaters:any;

  constructor(
    private theaterService:TheaterService
  )
  {

  }

  ngOnInit(): void {
    this.getUserLocation();
  }

  getUserLocation() : void{
    Geolocation.getCurrentPosition().then((resp) => {
      this.initlat = resp.coords.latitude;
      this.initlng = resp.coords.longitude;
      console.log('initlat:' + this.initlat + ' & initlng: ' + this.initlng);
      this.getTheater();
    }).catch((error) => {
      console.log('Error getting location', error);
      this.initlat = 45.7579341;
      this.initlng = 4.7650812;
      this.getTheater();
    });
  }

  getTheater() : void {
    if (this.movie) {
      console.log('Movie is:', this.movie);
    } else {
      this.theaterService.getTheaterList(this.initlat, this.initlng)
        .subscribe(
          (theatersList) => {
            this.theaters = theatersList;
          },
          (error) => {
            console.log(error);
          }
        )
    }
  }

}
