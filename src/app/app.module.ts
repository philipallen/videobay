import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { PlaceAdvertPage } from '../pages/placeadvert/placeadvert';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AlertService } from '../services/alert.service';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';

import { AlertDirective } from '../directives/alert/alert';

// used to create fake backend
import { fakeBackendProvider } from '../helpers/fake-backend';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { MomentModule } from 'angular2-moment'; //https://github.com/urish/angular2-moment


// import { LocationStrategy, PathLocationStrategy } from '@angular/common';
// Routing Module
// import { AppRoutingModule } from './app.routing';
// import { CommonModule, LocationStrategy,
//          HashLocationStrategy/*, PathLocationStrategy*/ }         from '@angular/common';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    PlaceAdvertPage,
    AlertDirective
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MomentModule,
    // AppRoutingModule,
    // IonicModule.forRoot(MyApp),
    IonicModule.forRoot(MyApp, {}, {
      links: [
        { component: HomePage, name: 'Home', segment: 'home' },
        { component: PlaceAdvertPage, name: 'PlaceAdvert', segment: 'placeadvert', defaultHistory: [HomePage] },
        { component: RegisterPage, name: 'Register', segment: 'register', defaultHistory: [LoginPage] }
      ]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    PlaceAdvertPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AlertService,
    UserService,
    AuthenticationService,
    // {
    //   provide: LocationStrategy,
    //   useClass: HashLocationStrategy // This strategy with base-href './' allow to move the app to any subsite and works
    //   // useClass: PathLocationStrategy // Only if passed the --base-href argument at build & the server has url rewrite to index.html
    // },

    // providers used to create fake backend
    //fakeBackendProvider,
    MockBackend,
    BaseRequestOptions
  ]
})
export class AppModule {}
