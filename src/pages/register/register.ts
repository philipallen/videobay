import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';

import { AlertService } from '../../services/alert.service';
import { UserService } from '../../services/user.service';

import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  	model: any = {};
    loading = false;

    constructor(
    	public navCtrl: NavController,
        // private router: Router,
        private alertCtrl: AlertController,
        private userService: UserService,
        private alertService: AlertService) { }

    register() {
        this.loading = true;
        console.log(this.model);
        this.userService.create(this.model)
            .subscribe(
                data => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page
                    this.alertService.success('Registration successful', true);
                    console.log(data);
                    // this.router.navigate(['/login']);
                    this.navCtrl.push(LoginPage, {});
                },
                error => {
                    console.log(error);
                    let alert = this.alertCtrl.create({
                        title: 'Registration failed',
                        message: error._body,
                        buttons: ['OK']
                      });

                    //this.alertService.error(error);
                    alert.present();
                    //this.alertService.error(error);
                    //this.loading = false;
                });
    }

    toLoginPage() {
	    this.navCtrl.pop();
	}

}
