import { Injectable }    from '@angular/core';
import { Headers } from '@angular/http';

import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TheaterService {
  public theater: any;
  //private ApiBaseUrl = 'http://192.168.1.52:8080/api/';  // URL to web api
  private ApiBaseUrl = 'https://cinebuddy-api.herokuapp.com/api/';  // URL to web api
  private headers = new Headers({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });

  constructor(private _authHttp: AuthHttp) { }

  getTheaterList(lat:number, lng:number, movie?:any): any {
    return this._authHttp
      .get(this.ApiBaseUrl + 'theatercloseby/?lat=' + lat +'&lng=' + lng +'&radius=20', {headers: this.headers})
        .map( theaters => theaters.json())
  }

  getTheaterArround(lat: number, lng: number) {
    return this._authHttp
      .get(this.ApiBaseUrl + 'theaternearby/?lat=' + lat +'&lng=' + lng, {headers: this.headers})
      .map( theaters => theaters.json())
  }

  getTheaterFromMovie(lat: number, lng: number, movie: number) {
    return this._authHttp
      .get(this.ApiBaseUrl + 'showtime/?lat=' + lat +'&lng=' + lng + '&movie=' + movie, {headers: this.headers})
      .map( theaters => theaters.json())
  }

}
