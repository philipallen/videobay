import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { ToastComponent } from '../../components/toast-component';
import { UserService } from '../../services/user.service';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [ToastComponent]
})
export class RegisterPage {

  	model: any = {};
    loading = false;

    constructor(
    	public navCtrl: NavController,
        private toastComponent: ToastComponent,
        private alertCtrl: AlertController,
        private userService: UserService) { }

    register() {
        this.loading = true;
        console.log(this.model);
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.navCtrl.push(LoginPage, { username: this.model.screenName });
                    this.toastComponent.create('Registered successfully', 3000);
                },
                error => {
                    console.log(error);
                    let alert = this.alertCtrl.create({
                        title: 'Registration failed',
                        message: error._body,
                        buttons: ['OK']
                      });

                    alert.present();
                    //this.loading = false;
                });
    }

    toLoginPage() {
	    this.navCtrl.pop();
	}

}
