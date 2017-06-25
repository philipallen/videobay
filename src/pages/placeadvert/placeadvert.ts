import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UserService } from '../../services/user.service';

@Component({
	selector: 'page-placeadvert',
	templateUrl: 'placeadvert.html'
})
export class PlaceAdvertPage {
	model: any = {};

  	constructor(
  		public navCtrl: NavController,
    	public userService: UserService) {
  	}

  	placeAdvert() {
  		console.log(this.userService.someoneLoggedIn());
  		console.log('try to place advert');
  		console.log(this.model);
  	}

}
