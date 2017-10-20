import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { LoadingComponent } from '../../components/loading-component';

@Component({
	selector: 'page-forgot-password',
	templateUrl: 'forgot-password.html',
	providers: [LoadingComponent]
})
export class ForgotPasswordPage {
	model: any = {};

  	constructor(
		public navCtrl: NavController,
		private loadingComponent: LoadingComponent,
		private userService: UserService) {
	}
	
	forgotPassword() {
		this.loadingComponent.present();
		this.userService.resetPassword(this.model.screenName).subscribe(
			data => {
				this.loadingComponent.dismiss();
				alert('Error. Did not work. Waiting on backend.');
			},
			error => {
				this.loadingComponent.dismiss();
				alert('Error. Did not work. Waiting on backend.');
			}
		);
	}

	toLogin() {
		this.navCtrl.pop();
	}
	
}
