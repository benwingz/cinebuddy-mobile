import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'arround-me',
  templateUrl: 'arroundme.html'
})
export class ArroundMe {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    let movie = navParams.get('movieId');
    console.log("movie passed", movie);
  }

}
