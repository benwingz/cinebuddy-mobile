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
        [latitude]="theater.geometry.location.lat"
        [longitude]="theater.geometry.location.lng"
        [title]="theater.name">
        </sebm-google-map-marker>
  </sebm-google-map>
  `
})
export class TheaterCmp implements OnInit {

  @Input() search:string;
  @Input() movie:number;
  initlat:number;
  initlng:number;
  theaters:any;

  constructor(
    private theaterService:TheaterService
  )
  {

  }

  ngOnInit(): void {
    console.log("Movie passed", this.movie);
    this.getUserLocation();
  }

  getUserLocation() : void{
    Geolocation.getCurrentPosition().then((resp) => {
      this.initlat = resp.coords.latitude;
      this.initlng = resp.coords.longitude;
      this.getTheaterNearBy();
    }).catch((error) => {
      this.initlat = 45.7579341;
      this.initlng = 4.7650812;
      this.getTheaterNearBy();
    });
  }

  getTheaterNearBy() : void {
    if (!this.movie) {
      this.theaterService.getTheaterArround(this.initlat, this.initlng)
        .subscribe(
          (theatersList) => {
            this.theaters = theatersList;
            //this.theaters = theatersList;
          },
          (error) => {
            console.log("error", error);
          }
        )
    }else {
      this.theaterService.getTheaterFromMovie(this.initlat, this.initlng, this.movie)
        .subscribe(
          (theatersList) => {
            //this.theaters = theatersList;
            console.log("showtime output:", theatersList);
          },
          (error) => {
            console.log("error", error);
          }
        )
    }
  }

}
