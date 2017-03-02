import { Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { MovieOfTheWeek } from '../MovieOfTheWeek/movieoftheweek';
import { MovieShowing } from '../MovieShowing/movieshowing';
import { ArroundMe } from '../ArroundMe/arroundme';

import { UserService } from '../../service/user.service';
import { MovieService } from '../../service/movie.service';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage implements OnInit {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  isUserLoggedIn: boolean;
  tab1Root: any = MovieShowing;
  tab2Root: any = MovieOfTheWeek;
  tab3Root: any = ArroundMe;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userService: UserService,
    private movieService: MovieService
  )
  {
    this.userService.isTokenValid().then( tokenValid => console.log('token is', tokenValid));
  }

  ngOnInit(): void {

  }

}
