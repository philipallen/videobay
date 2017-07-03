import { Component, OnInit } from '@angular/core';

import { AlertService } from '../../services/alert.service';
import { UserService } from '../../services/user.service';
import { Nav, NavController, LoadingController, AlertController } from 'ionic-angular';
import {User} from '../../models/users';

import { HomePage } from '../home/home';
// import { RegisterPage } from '../register/register';

@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})

export class LoginPage implements OnInit {
	model: any={};
	// loading = false;
	returnUrl: string;

	constructor(
		private loadingCtrl: LoadingController,
		private alertCtrl: AlertController,
		public navCtrl: NavController,
		public nav: Nav,
		private userService: UserService,
		private alertService: AlertService) { }

	ngOnInit() {
		// this.authenticationService.logout();
	}

	login() {
		let loadingPopup = this.loadingCtrl.create({
	      	// content: 'Loading data...' //Can add text content here
	      	dismissOnPageChange: true
	    });

		loadingPopup.present();
		this.userService.getByUsernameAndPassword(this.model)
			.subscribe(
				data => {
					localStorage.setItem('currentUser', JSON.stringify(data));
    			this.nav.setRoot(HomePage);
				},
				error => {
					let alert = this.alertCtrl.create({
					    title: 'Login failed',
					    message: error._body,
				    	buttons: ['OK']
				  	});
					loadingPopup.dismiss();
					//this.alertService.error(error);
					alert.present();
				});
	}

	// toRegisterPage() {
	// 	this.navCtrl.push(RegisterPage);
	// }

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
