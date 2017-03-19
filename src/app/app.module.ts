import { NgModule, ErrorHandler } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { MovieShowing } from '../pages/MovieShowing/movieshowing';
import { ArroundMe } from '../pages/ArroundMe/arroundme';
import { MovieOfTheWeek } from '../pages/MovieOfTheWeek/movieoftheweek';
import { TabsPage } from '../pages/tabs/tabs';
import { ConnectPage } from '../pages/connect/connect';
import { FindtheaterPage } from '../pages/findtheater/findtheater';

import { MovieListCmp } from '../component/movielist/movielist.component';
import { MovieCmp } from '../component/movie/movie.component';
import { TheaterCmp } from '../component/theater/theater.component';

import { UserService } from '../service/user.service';
import { MovieService } from '../service/movie.service';
import { TheaterService } from '../service/theater.service';

import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { Storage } from '@ionic/storage';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { FilmVersionPipe } from '../pipes/filmversion.pipe';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '47c569a5'
  },
  'auth': {
    'facebook': {
      'scope': ['public_profile', 'email', 'user_friends']
    }
  }
};

export function getAuthHttp(http) {
  let storage = new Storage();
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
    TabsPage,
    ConnectPage,
    FindtheaterPage,
    MovieListCmp,
    MovieCmp,
    TheaterCmp,
    FilmVersionPipe
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      tabsPlacement: 'top'
    }),
    CloudModule.forRoot(cloudSettings),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB17hTGIPwjnR_rs6W0mTSM5yxzkyDqSxY'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MovieShowing,
    ArroundMe,
    MovieOfTheWeek,
    TabsPage,
    ConnectPage,
    FindtheaterPage,
    MovieListCmp,
    MovieCmp,
    TheaterCmp
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
    MovieService,
    TheaterService,
    Storage]
})
export class AppModule {}
