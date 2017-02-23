import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UserService } from '../../service/user.service';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'movie-of-the-week',
  templateUrl: 'movieoftheweek.html'
})
export class MovieOfTheWeek implements OnInit {


  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    private userService: UserService
  ) {

  }

  ngOnInit(): void {
    /*this.storage.get('token').then(token => {
        console.log(tokenNotExpired(null, token)); // Returns true/false
    });*/
    this.userService.getUserProfile().then( res => console.log(res));
    this.userService.isUserLoggedIn().then( res => console.log(res));
  }

}
