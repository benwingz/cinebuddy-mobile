import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { UserService } from '../../service/user.service'

@Component({
  selector: 'movie-showing',
  templateUrl: 'movieshowing.html'
})
export class MovieShowing {
  private username: string;
  private profile_pic: string;

  constructor(
    public navCtrl: NavController,
    private userService: UserService
  )
  {
    this.username = this.userService.currentUser.fb_full_name;
    this.profile_pic= this.userService.currentUser.fb_profile_picture;
  }

}
