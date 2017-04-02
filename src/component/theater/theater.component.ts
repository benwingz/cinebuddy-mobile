import { Component, Input, OnInit } from '@angular/core';
import { Geolocation } from 'ionic-native';

import { TheaterService } from '../../service/theater.service';
import { ShowtimeService } from '../../service/showtime.service';

@Component({
  selector: 'theater-cmp',
  templateUrl: `theater.component.html`
})
export class TheaterCmp implements OnInit {

  @Input() search:string;
  @Input() movie:number;
  initlat:number;
  initlng:number;
  theaters:any;
  showtimes:any;
  theaterSelected:any;
  showtimeSelected:any;

  constructor(
    private theaterService:TheaterService,
    private showtimeService: ShowtimeService
  )
  {

  }

  ngOnInit(): void {
    console.log("Movie passed", this.movie);
    this.getUserLocation();
  }

  clickMarkerFromTheater(theater) {
    this.initlat = theater.geometry.location.lat;
    this.initlng = theater.geometry.location.lng;
    this.theaterSelected = theater;
  }

  clickMarkerFromShowtime(showtime) {
    this.initlat = showtime.place.theater.geoloc.lat;
    this.initlng = showtime.place.theater.geoloc.long;
    this.showtimeSelected = showtime;
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
          (stream) => {
            this.showtimes = this.getShowtimePlaces(stream);
            console.log("showtime output:", stream);
          },
          (error) => {
            console.log("error", error);
          }
        )
    }
  }

  getShowtimePlaces(stream): void {
    return stream.feed.theaterShowtimes;
  }

}
