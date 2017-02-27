import { Component, OnInit} from '@angular/core';

import { MovieOfTheWeek } from '../MovieOfTheWeek/movieoftheweek';
import { MovieShowing } from '../MovieShowing/movieshowing';
import { ArroundMe } from '../ArroundMe/arroundme';

import { UserService } from '../../service/user.service';

import { Storage } from '@ionic/storage';

import { FacebookAuth, User } from '@ionic/cloud-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage implements OnInit {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = MovieOfTheWeek;
  tab2Root: any = MovieShowing;
  tab3Root: any = ArroundMe;

  constructor(
    private UserService: UserService,
    private storage: Storage,
    public facebookAuth: FacebookAuth,
    public user: User
  ) { }

  getToken(): void {
    this.UserService.getToken({email: 'benjamin.roullet@gmail.com', password: 'cinebuddyROCKS'})
      .then( (res) => {
        this.storage.remove('token');
        this.storage.set('token', res.token);
      });
  }

  ngOnInit(): void {
    //this.getToken();
    this.facebookAuth.login().then(res => this.initLogin(res));
  }

  private initLogin(facebookResponse): void {
    console.log('User', this.user);
    this.storage.remove('email');
    this.storage.remove('cloud_id');
    this.storage.remove('fb_id');
    this.storage.remove('fb_profile_picture');
    this.storage.set('email', this.user.social.facebook.data.email);
    this.storage.set('cloud_id', this.user.id);
    this.storage.set('fb_id', this.user.social.facebook.uid);
    this.storage.set('fb_profile_picture', this.user.social.facebook.data.profile_picture);
    this.storage.set('fb_fullname', this.user.social.facebook.data.full_name);
    this.UserService.getToken({email: this.user.social.facebook.data.email, cloud_id: this.user.id, fb_id: this.user.social.facebook.uid, fb_full_name: this.user.social.facebook.data.email}).then( (res) => {
      console.log(res);
      this.storage.remove('token');
      this.storage.set('token', res.token);
    })
  }

}
