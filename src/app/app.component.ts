import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AdvertsPage } from '../pages/adverts/adverts';
import { FavouritesPage } from '../pages/favourites/favourites';
import { MyAdvertsPage } from '../pages/my-adverts/my-adverts';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { UserService } from '../services/user.service';
import { PermissionsService } from '../services/permissions.service';
import { AccountPage } from '../pages/account/account';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = AdvertsPage;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public userService: UserService,
    public permissionsService: PermissionsService) {
      this.initializeApp();
  }

  toAdverts() {
    this.nav.setRoot(AdvertsPage);
  }

  toLogin() {
    this.nav.push(LoginPage);
  }

  toRegister() {
    this.nav.push(RegisterPage);
  }
  
  toMyAdverts() {
    this.nav.setRoot(MyAdvertsPage);
  }

  toMyFavourites() {
    this.nav.setRoot(FavouritesPage);
  }

  toAccount(){
    this.nav.setRoot(AccountPage)
  }

  logout() {
    this.userService.logout();
    this.nav.setRoot(AdvertsPage);
  }

  initializeApp() {
    //When starting the app, or on page refresh, get the latest user details from the server
    //This might cause problems if this happens slower than the platform.ready() below.
    //Keep an eye on this. Might be buggy.
    if (this.userService.isSomeoneLoggedIn()) {
      this.userService.getByUsernameAndPassword(this.userService.getLoggedInUser()).subscribe(
        response => {},
        error => {
            alert('error: did not get logged in user. Will remove from local storage now');
            this.userService.logout();
        }
      )
    }

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.permissionsService.checkStoragePermissions().then(permissionOk => {
        if (!permissionOk) {
          alert('You\'ll need to allow the app access to your phone\'s storage to place an advert. Don\'t worry, we\'ll ask you again later.');
        }
      });
    });
  }
}
