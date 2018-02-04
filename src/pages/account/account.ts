import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { CreateAddressPage } from '../create-address/create-address';
import { Account } from '../../models/Account';

/**
 * Generated class for the AccountPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  account : Account

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public userService: UserService) {
  }

  ngOnInit(): void {
    this.account = this.userService.getLoggedInUser().account;
  }

  toCreateAddress(): void {
    this.navCtrl.push(CreateAddressPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

}
