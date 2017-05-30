import { Component, OnInit } from '@angular/core';
 
import { AlertService } from '../../services/alert.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Nav, NavController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
 
@Component({
  	selector: 'page-login',
    templateUrl: 'login.html'
})
 
export class LoginPage implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
 
    constructor(
		public navCtrl: NavController,
		public nav: Nav,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }
 
    ngOnInit() {
        this.authenticationService.logout();
    }
 
    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
					// this.navCtrl.push(HomePage, {});
    				this.nav.setRoot(HomePage);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

	toRegisterPage() {
	    this.navCtrl.push(RegisterPage);
	}

	// ionViewCanLeave(): boolean{
 //   		if(!localStorage.getItem('currentUser')){
	//       console.log('no current user');
	//       return false;
	//     } else {
	//       console.log('there is a current user');
	//       return true;
 //    	}
 //  	}
}