import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Nav, NavController, NavParams, AlertController } from 'ionic-angular';
import { LoadingComponent } from '../../components/loading-component';
import { ToastComponent } from '../../components/toast-component';
import { AdvertsPage } from '../adverts/adverts';

@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
	providers: [LoadingComponent, ToastComponent]
})

export class LoginPage {
	model: any={};
	returnUrl: string;
	goBackAfterLogin: boolean;

	constructor(
		private loadingComponent: LoadingComponent,
        private toastComponent: ToastComponent,
		private alertCtrl: AlertController,
		public navCtrl: NavController,
		public navParams: NavParams,
		public nav: Nav,
		private userService: UserService) {
			this.goBackAfterLogin = navParams.get('goBackAfterLogin');
	}

	login() {
		this.loadingComponent.present();
		this.userService.getByUsernameAndPassword(this.model)
			.subscribe(
				data => {
					localStorage.setItem('currentUser', JSON.stringify(data));
					if (this.goBackAfterLogin) {
						this.nav.pop();
					} else {
						this.nav.setRoot(AdvertsPage);
					}
					this.loadingComponent.dismiss();
                    this.toastComponent.create('Welcome back ' + data.firstName, 3000);
				},
				error => {
					let alert = this.alertCtrl.create({
					    title: 'Login failed',
					    message: error,
				    	buttons: ['OK']
				  	});
					this.loadingComponent.dismiss();
					alert.present();
				});
	}
}
