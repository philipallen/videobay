import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

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
        private userService: UserService,
        private alertService: AlertService) { }
 
    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page
                    this.alertService.success('Registration successful', true);
                    // this.router.navigate(['/login']);
                    this.navCtrl.push(LoginPage, {});
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    toLoginPage() {
	    this.navCtrl.pop();
	}

}