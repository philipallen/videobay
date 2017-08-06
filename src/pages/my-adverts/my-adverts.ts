import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PlaceAdvertPage } from '../placeadvert/placeadvert';

import { Advert } from '../../models/advert';

import { AdvertsService } from '../../services/adverts.service';

import videojs from 'video.js'

@Component({
	selector: 'page-my-adverts',
	templateUrl: 'my-adverts.html',
	providers: [AdvertsService]
})
export class MyAdvertsPage {
    myAdverts: Advert[] = [];

  	constructor(
  		public navCtrl: NavController, 
  		private advertsService: AdvertsService) {

	  	
  	}

  	getAdverts(): void {
  		// this.advertsService.getAdverts().then(adverts => this.adverts = adverts);
  	}

  	ngOnInit(): void {
  		// this.getAdverts();
  	}

  	toPlaceAdvert() {
  		this.navCtrl.push(PlaceAdvertPage);
  	}

}
