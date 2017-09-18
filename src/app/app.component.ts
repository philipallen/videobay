import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AdvertsPage } from '../pages/adverts/adverts';
import { MyAdvertsPage } from '../pages/my-adverts/my-adverts';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { UserService } from '../services/user.service';

@Component({
  templateUrl: 'app.html',
  // selector: 'ion-app',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = AdvertsPage;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public userService: UserService) {
    this.initializeApp();

    this.pages = [
      { title: 'Adverts', component: AdvertsPage }
      // { title: 'Login', component: LoginPage },
      // { title: 'Register', component: RegisterPage }
    ];
  }

  //this could probably be better and use the openPage function directly? 
  toLogin() {
    this.openPage(LoginPage);
  }

  toRegister() {
    this.openPage(RegisterPage);
  }
  
  toMyAdverts() {
    this.openPage(MyAdvertsPage);
  }

  logout() {
    this.userService.logout();
    console.log('logged out');
    this.nav.setRoot(AdvertsPage);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      console.log(this.userService.getLoggedInUser());
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // this.nav.setRoot(page.component);
    this.nav.push(page);
  }
}
