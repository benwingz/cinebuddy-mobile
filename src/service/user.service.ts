import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
  private ApiBaseUrl = 'https://cinebuddy-api.herokuapp.com/api/';  // URL to web api
  private headers = new Headers({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });

  constructor(private http: Http) { }

  getToken(credentials): Promise<any> {
    return this.http
      .post(this.ApiBaseUrl + 'authenticate/', JSON.stringify(credentials), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  /*getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
               .toPromise()
               .then(response => response.json().data as Hero[])
               .catch(this.handleError);
  }

  create(name: string): Promise<Hero>{
    return this.http
      .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }*/


}
