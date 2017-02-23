import { NgModule, ErrorHandler } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { MovieShowing } from '../pages/MovieShowing/movieshowing';
import { ArroundMe } from '../pages/ArroundMe/arroundme';
import { MovieOfTheWeek } from '../pages/MovieOfTheWeek/movieoftheweek';
import { TabsPage } from '../pages/tabs/tabs';
import { UserService } from '../service/user.service';

import { Storage } from '@ionic/storage';

let storage = new Storage();

export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    noJwtError: true,
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => storage.get('token')),
  }), http);
}

@NgModule({
  declarations: [
    MyApp,
    MovieShowing,
    ArroundMe,
    MovieOfTheWeek,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      tabsPlacement: 'top'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MovieShowing,
    ArroundMe,
    MovieOfTheWeek,
    TabsPage
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    },
    UserService,
    Storage]
})
export class AppModule {}
