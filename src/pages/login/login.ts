import { Component, OnInit } from '@angular/core';
// import { Router, ActivatedRoute } from '@angular/router';
 
import { AlertService } from '../../services/alert.service';
import { AuthenticationService } from '../../services/authentication.service';
import { NavController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
 
@Component({
//     moduleId: module.id,
  	selector: 'page-login',
    templateUrl: 'login.html'
})
 
export class LoginPage implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
 
    constructor(
		public navCtrl: NavController,
//         private route: ActivatedRoute,
//         private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }
 
    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
 
        // get return url from route parameters or default to '/'
//         this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
 
    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
//                     this.router.navigate([this.returnUrl]);
					this.navCtrl.push(HomePage, {});
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

	toRegisterPage() {
	    this.navCtrl.push(RegisterPage);
	}

	//TODO below to guard from leaving this page?
	// ionViewCanLeave(): boolean{
	//    // here we can either return true or false
	//    // depending on if we want to leave this view
	//    if(isValid(randomValue)){
	//       return true;
	//     } else {
	//       return false;
	//     }
	//  }
}