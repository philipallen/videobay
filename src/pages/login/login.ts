import { Component } from '@angular/core';

import { AlertService } from '../../services/alert.service';
import { UserService } from '../../services/user.service';
import { Nav, NavController, AlertController } from 'ionic-angular';
import { User } from '../../models/user';
import { LoadingComponent } from '../../components/loading-component';

import { AdvertsPage } from '../adverts/adverts';
// import { RegisterPage } from '../register/register';

@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
	providers: [LoadingComponent]
})

export class LoginPage {
	model: any={};
	// loading = false;
	returnUrl: string;

	constructor(
		private loadingComponent: LoadingComponent,
		private alertCtrl: AlertController,
		public navCtrl: NavController,
		public nav: Nav,
		private userService: UserService,
		private alertService: AlertService) { }

	login() {
		this.loadingComponent.present();
		this.userService.getByUsernameAndPassword(this.model)
			.subscribe(
				data => {
					localStorage.setItem('currentUser', JSON.stringify(data));
    				this.nav.setRoot(AdvertsPage);
				},
				error => {
					let alert = this.alertCtrl.create({
					    title: 'Login failed',
					    message: error,
				    	buttons: ['OK']
				  	});
					this.loadingComponent.dismiss();
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
