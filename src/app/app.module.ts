import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { MovieShowing } from '../pages/MovieShowing/movieshowing';
import { ArroundMe } from '../pages/ArroundMe/arroundme';
import { MovieOfTheWeek } from '../pages/MovieOfTheWeek/movieoftheweek';
import { TabsPage } from '../pages/tabs/tabs';
import { UserService } from '../service/user.service';

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
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, UserService]
})
export class AppModule {}
