import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FacebookAuth, User } from '@ionic/cloud-angular';

import { UserService } from '../../service/user.service';
import { Cbuser } from '../../model/user.model'
import { TabsPage } from '../tabs/tabs';

/*
  Generated class for the Connect page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-connect',
  templateUrl: 'connect.html'
})
export class ConnectPage {
  tabsPage: any = TabsPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _UserService: UserService,
    public facebookAuth: FacebookAuth,
    public cloud_user: User) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConnectPage');
  }

  doFbConnect(): void {
    console.log('doFbConnect');
    this.facebookAuth.login().then((res) => this.initLogin());
  }

  initLogin(): void {
    this._UserService.getToken({
      email: this.cloud_user.social.facebook.data.email,
      cloud_id: this.cloud_user.id,
      fb_id: this.cloud_user.social.facebook.uid,
      fb_full_name: this.cloud_user.social.facebook.data.email
    })
    .then( (res) => {
      console.log(res);
      this.navCtrl.setRoot(this.tabsPage);
      const newUser = new Cbuser(
        res.id,
        this.cloud_user.social.facebook.data.email,
        res.token,
        this.cloud_user.id,
        this.cloud_user.social.facebook.uid,
        this.cloud_user.social.facebook.data.full_name,
        this.cloud_user.social.facebook.data.profile_picture
      );
      this._UserService.updateUserProfile(newUser);
    })
  }

}
