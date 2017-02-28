import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import { AuthHttp } from 'angular2-jwt';

import { Cbuser } from '../model/user.model';

import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {

  private currentUser : Cbuser;
  //private ApiBaseUrl = 'http://192.168.1.52:8080/api/';  // URL to web api
  private ApiBaseUrl = 'https://cinebuddy-api.herokuapp.com/api/';  // URL to web api
  private headers = new Headers({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });

  constructor(
    private _http: Http,
    private _storage: Storage,
    private _authHttp: AuthHttp
  )
  {
    if (this._storage.get('token')) {
      this.currentUser = new Cbuser(
        this._storage.get('id'),
        this._storage.get('email'),
        this._storage.get('token'),
        this._storage.get('cloud_id'),
        this._storage.get('fb_id'),
        this._storage.get('fb_full_name'),
        this._storage.get('fb_profile_picture')
      )
      this.setLocalStorage(this.currentUser);
      console.log('init User', this.currentUser);

      /**/
    }
  }

  getToken(credentials): Promise<any> {
    return this._http
      .post(this.ApiBaseUrl + 'authenticate/', JSON.stringify(credentials), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  isUserLoggedIn(): Promise<boolean> {
    return new Promise(
      function(resolve, reject) {
        if (this.currentUser) {
          resolve(tokenNotExpired(null, this.currentUser.getToken()));
        } else {
          reject(false);
        }
      }
    );
  }

  getUserProfile(): Promise<Cbuser> {
    return this._authHttp
      .get(this.ApiBaseUrl + 'me/', {headers: this.headers})
      .toPromise()
      .then( (profile) => {
        const userProfile = profile.json();
        this.currentUser = new Cbuser (
          userProfile.id,
          userProfile.email,
          userProfile.token,
          userProfile.cloud_id,
          userProfile.fb_id,
          userProfile.fb_full_name,
          userProfile.fb_profile_picture
        )}
      )
      .catch(this.handleError)
  }

  private setLocalStorage(user: Cbuser): void {
    this._storage.remove('id');
    this._storage.remove('email');
    this._storage.remove('token');
    this._storage.remove('cloud_id');
    this._storage.remove('fb_id');
    this._storage.remove('fb_profile_picture');
    this._storage.remove('fb_full_name');
    this._storage.set('id', user.getId());
    this._storage.set('email', user.getEmail());
    this._storage.set('token', user.getToken());
    this._storage.set('cloud_id', user.getCloudId());
    this._storage.set('fb_id', user.getFbId());
    this._storage.set('fb_profile_picture', user.getFbProfilePicture);
    this._storage.set('fb_full_name', user.getFbFullName);
  }

  updateUserProfile(user: Cbuser): void {
    this.currentUser = user;
    console.log('User after update', this.currentUser);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
