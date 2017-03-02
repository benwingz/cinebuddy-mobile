import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FacebookAuth, User } from '@ionic/cloud-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../../service/user.service';
import { Cbuser } from '../../model/user.model'
import { TabsPage } from '../tabs/tabs';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-connect',
  templateUrl: 'connect.html'
})
export class ConnectPage implements OnInit {
  user:any;
  tabsPage: any = TabsPage;
  userForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _UserService: UserService,
    public facebookAuth: FacebookAuth,
    public cloud_user: User,
    public storage: Storage,
    public fb: FormBuilder) {
      this.userForm = fb.group({
        username: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required]
      });
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConnectPage');
  }

  doFbConnect(): void {
    this.facebookAuth.login().then((res) => this.initLogin());
  }

  initLogin(): void {
    this._UserService.getToken({
      email: this.cloud_user.social.facebook.data.email,
      cloud_id: this.cloud_user.id,
      fb_id: this.cloud_user.social.facebook.uid,
      fb_full_name: this.cloud_user.social.facebook.data.email,
      fb_profile_picture: this.cloud_user.social.facebook.data.profile_picture
    })
    .then( (res) => {
      if (res.success === true) {
        const newUser = new Cbuser(
          '',
          this.cloud_user.social.facebook.data.email,
          res.token,
          this.cloud_user.id,
          this.cloud_user.social.facebook.uid,
          this.cloud_user.social.facebook.data.full_name,
          this.cloud_user.social.facebook.data.profile_picture
        );
        this._UserService.updateUserProfile(newUser);
        this._UserService.getUserProfile();
        this.navCtrl.setRoot(this.tabsPage);
      }
    })
  }

  register():void {
    this._UserService.getToken(this.userForm.value).then(
      (res) => {
        if (res.success === true) {
          const newUser = new Cbuser(
            '',
            this.userForm.value.email,
            res.token,
            '',
            '',
            this.userForm.value.username,
          );
          this._UserService.updateUserProfile(newUser);
          this._UserService.getUserProfile();
          this.navCtrl.setRoot(this.tabsPage);
        }
      }
    )
  }

  ngOnInit(): void {
    this.storage.get('token').then(
      (token) => {
        this._UserService.getToken({token: token}).then( (res) => {
          if (res.success === true) {
            const newUser = new Cbuser(
              '',
              this.storage.get('email'),
              res.token,
              '',
              '',
              this.storage.get('name'),
            );
            this._UserService.updateUserProfile(newUser);
            this._UserService.getUserProfile();
            this.navCtrl.setRoot(this.tabsPage);
          }
        });
      },
      err => console.log(err)
    );
  }

}
