import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Address } from '../../models/Address';
import { UserService } from '../../services/user.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { AdvertsPage } from '../adverts/adverts';
import { Account } from '../../models/Account';
import { User } from '../../models/user';

/**
 * Generated class for the CreateAddressPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-create-address',
  templateUrl: 'create-address.html',
})
export class CreateAddressPage {

  address: Address = new Address();
  errorMessage : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private userService : UserService,
              private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateAddressPage');
  }

  createAddress(){
    this.userService.createAccount(this.address).subscribe(
      response => {
        this.createdSuccessfully();
        let account : Account = new Account();
        account.addresses.push(this.address);
        let user : User = this.userService.getLoggedInUser();
        user.account = account;
        // This should be capsuled in the userService
        localStorage.setItem('currentUser', JSON.stringify(user));
      },
      error => {
        this.errorMessage = <any>error;
                alert('Error. Uuups, the address was not added');
      }
    )

  }

  createdSuccessfully() {
    let alert = this.alertCtrl.create({
        title: 'Success',
        subTitle: 'Your address has been added',
        buttons: [
            {
                text: 'Create another address',
                handler: () => {
                    this.resetPage();
                }
            },
            {
                text: 'Go to Adverts',
                handler: () => {
                    this.navCtrl.setRoot(AdvertsPage);
                }
            }
        ]
    });
    alert.present();

}

resetPage() {
  this.address = new Address();

}
}
