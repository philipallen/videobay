import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { LocationStrategy, PathLocationStrategy } from '@angular/common';
// Routing Module
// import { AppRoutingModule } from './app.routing';
// import { CommonModule, LocationStrategy,
//          HashLocationStrategy/*, PathLocationStrategy*/ }         from '@angular/common';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    // AppRoutingModule,
    // IonicModule.forRoot(MyApp),
    IonicModule.forRoot(MyApp, {}, {
      links: [
        { component: HomePage, name: 'Home', segment: 'home' },
        { component: ListPage, name: 'List', segment: 'list', defaultHistory: [HomePage] },
        { component: ListPage, name: 'List', segment: 'list/:itemId' }
      ]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    // {
    //   provide: LocationStrategy,
    //   useClass: HashLocationStrategy // This strategy with base-href './' allow to move the app to any subsite and works
    //   // useClass: PathLocationStrategy // Only if passed the --base-href argument at build & the server has url rewrite to index.html
    // },
  ]
})
export class AppModule {}
