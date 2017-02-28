import { Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { MovieOfTheWeek } from '../MovieOfTheWeek/movieoftheweek';
import { MovieShowing } from '../MovieShowing/movieshowing';
import { ArroundMe } from '../ArroundMe/arroundme';

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
    public navCtrl: NavController,
    public navParams: NavParams,
  ) { }

  ngOnInit(): void {
    //this.getToken();
    //this.facebookAuth.login().then(res => this.initLogin(res));
  }

}
