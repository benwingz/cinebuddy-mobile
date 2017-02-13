import { Component, OnInit } from '@angular/core';

import { MovieOfTheWeek } from '../MovieOfTheWeek/movieoftheweek';
import { MovieShowing } from '../MovieShowing/movieshowing';
import { ArroundMe } from '../ArroundMe/arroundme';

import { UserService } from '../../service/user.service';

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
    private UserService: UserService
  ) { }

  getToken(): void {
    this.UserService.getToken({email: 'benjamin.roullet@gmail.com', password: 'cinebuddyROCKS'}).then( res => console.log(res));
  }

  ngOnInit(): void {
    this.getToken();
  }

}
