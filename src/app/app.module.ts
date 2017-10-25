import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

//pages
import { MyApp } from './app.component';
import { AdvertsPage } from '../pages/adverts/adverts';
import { MyAdvertsPage } from '../pages/my-adverts/my-adverts';
import { FavouritesPage } from '../pages/favourites/favourites';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { CreateAdvertPage } from '../pages/create-advert/create-advert';
import { EditAdvertPage } from '../pages/edit-advert/edit-advert';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';

//ionic native
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { Diagnostic } from '@ionic-native/diagnostic';
import { FileTransfer } from '@ionic-native/file-transfer';

//services
import { UserService } from '../services/user.service';
import { PermissionsService } from '../services/permissions.service';

//components
import { LoadingComponent } from '../components/loading-component';
import { ToastComponent } from '../components/toast-component';
import { FavouriteButtonComponent } from '../components/favourite-button/favourite-button-component';
import { AdvertComponent } from '../components/advert/advert-component';
import { AdvertFormComponent } from '../components/advert-form/advert-form-component';
import { VideoComponent } from '../components/video/video-component';

// used to create fake backend
// import { fakeBackendProvider } from '../mock/fake-backend';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

//third party 
import { MomentModule } from 'angular2-moment'; //https://github.com/urish/angular2-moment


// import { LocationStrategy, PathLocationStrategy } from '@angular/common';
// Routing Module
// import { AppRoutingModule } from './app.routing';
// import { CommonModule, LocationStrategy,
//          HashLocationStrategy/*, PathLocationStrategy*/ }         from '@angular/common';


@NgModule({
  declarations: [
    MyApp,
    AdvertsPage,
    MyAdvertsPage,
    FavouritesPage,
    LoginPage,
    RegisterPage,
    CreateAdvertPage,
    EditAdvertPage,
    ForgotPasswordPage,
    LoadingComponent,
    ToastComponent,
    FavouriteButtonComponent,
    AdvertComponent,
    AdvertFormComponent,
    VideoComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MomentModule,
    // AppRoutingModule,
    // IonicModule.forRoot(MyApp),
    IonicModule.forRoot(MyApp, { mode: 'ios' }, {
      links: [
        { component: AdvertsPage, name: 'Adverts', segment: 'adverts' },
        { component: MyAdvertsPage, name: 'MyAdverts', segment: 'myadverts' },
        { component: FavouritesPage, name: 'Favourites', segment: 'favourites' },
        { component: CreateAdvertPage, name: 'CreateAdvert', segment: 'createadvert', defaultHistory: [AdvertsPage] },
        { component: LoginPage, name: 'Login', segment: 'login', defaultHistory: [AdvertsPage] },
        { component: RegisterPage, name: 'Register', segment: 'register', defaultHistory: [LoginPage] },
        { component: ForgotPasswordPage, name: 'ForgotPassword', segment: 'forgot-password', defaultHistory: [LoginPage] }
      ]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AdvertsPage,
    MyAdvertsPage,
    FavouritesPage,
    LoginPage,
    RegisterPage,
    CreateAdvertPage,
    EditAdvertPage,
    ForgotPasswordPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Diagnostic,
    FileTransfer,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserService,
    PermissionsService,
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
