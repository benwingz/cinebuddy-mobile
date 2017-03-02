import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import { AuthHttp } from 'angular2-jwt';

import { Cbuser } from '../model/user.model';

import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  currentUser : Cbuser;
  //private ApiBaseUrl = 'http://192.168.1.52:8080/api/';  // URL to web api
  private ApiBaseUrl = 'https://cinebuddy-api.herokuapp.com/api/';  // URL to web api
  private headers = new Headers({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });

  constructor(
    private _http: Http,
    public storage: Storage,
    private _authHttp: AuthHttp
  )
  { }

  getToken(credentials): Promise<any> {
    return this._http
      .post(this.ApiBaseUrl + 'authenticate/', JSON.stringify(credentials), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  isTokenValid(): Promise<boolean> {
    const user = this.currentUser;
    return new Promise(
      function(resolve, reject) {
        if(user && user.token) {
          resolve(tokenNotExpired(null, user.token));
        } else {
          resolve(false);
        }
      }
    );
  }

  getUserProfile(): any {
    return this._authHttp
      .get(this.ApiBaseUrl + 'me/', {headers: this.headers})
        .map( user => user.json())
        .subscribe(
          (user) => {
            this.currentUser = user;
          },
          err => this.handleError(err)
        );
  }

  private setLocalStorage(user: Cbuser): void {
    this.removeLocalStorage()
    this.storage.set('token', user.token);
  }

  private removeLocalStorage(): void {
    this.storage.remove('token');
  }

  updateUserProfile(user: Cbuser): void {
    this.currentUser = user;
    this.setLocalStorage(this.currentUser);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
