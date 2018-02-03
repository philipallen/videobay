import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Address } from '../../models/Address';
import { UserService } from '../../services/user.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { AdvertsPage } from '../adverts/adverts';

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
