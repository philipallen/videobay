import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PlaceAdvertPage } from '../place-advert/place-advert';

import { Advert } from '../../models/advert';

import { UserService } from '../../services/user.service';
import { AdvertsService } from '../../services/adverts.service';

import videojs from 'video.js'

@Component({
	selector: 'page-my-adverts',
	templateUrl: 'my-adverts.html',
	providers: [AdvertsService]
})
export class MyAdvertsPage {
    myAdverts: Advert[] = [];
    errorMessage: any;

  	constructor(
  		public navCtrl: NavController, 
		public userService: UserService,
  		private advertsService: AdvertsService) {

	  	
  	}

  	getAdverts(): void {
		let userId = this.userService.getLoggedInUser().id;
  		this.advertsService.getMyAdverts(userId).subscribe(
            response => this.myAdverts = response,
            error => this.errorMessage = <any>error);
  	}

  	ngOnInit(): void {
  		this.getAdverts();
  	}

  	toPlaceAdvert() {
  		this.navCtrl.push(PlaceAdvertPage);
  	}

}
