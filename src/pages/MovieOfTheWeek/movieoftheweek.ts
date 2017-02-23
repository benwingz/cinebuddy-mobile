import { Component, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { tokenNotExpired } from 'angular2-jwt';
import { AuthHttp } from 'angular2-jwt';

@Component({
  selector: 'movie-of-the-week',
  templateUrl: 'movieoftheweek.html'
})
export class MovieOfTheWeek implements OnInit {


  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    public authHttp: AuthHttp
  ) {

  }

  ngOnInit(): void {
    this.storage.get('token').then(token => {
        console.log(tokenNotExpired(null, token)); // Returns true/false
    });
    this.authHttp.get('http://localhost:8080/api/me')
    .subscribe(
      data => console.log('me',data),
      err => console.log('err',err),
      () => console.log('Request Complete')
    );
  }

}
