import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PlaceAdvertPage } from '../place-advert/place-advert';

import { Advert } from '../../models/advert';

import { LoadingComponent } from '../../components/loader';

import { UserService } from '../../services/user.service';
import { AdvertsService } from '../../services/adverts.service';

import videojs from 'video.js'

@Component({
	selector: 'page-favourites',
	templateUrl: 'favourites.html',
	providers: [AdvertsService, LoadingComponent]
})
export class FavouritesPage {
    favourites: Advert[] = [];
    errorMessage: any;

  	constructor(
		private loadingComponent: LoadingComponent,
  		public navCtrl: NavController, 
		public userService: UserService,
  		private advertsService: AdvertsService) {
	  	
  	}

  	getFavourites(): void {
		this.loadingComponent.present();
		let userId = this.userService.getLoggedInUser().id;
  		this.advertsService.getFavourites(userId).subscribe(
            response => {
				this.favourites = response;
				this.loadingComponent.dismiss();
			},
            error => {
				this.errorMessage = <any>error;
				this.loadingComponent.dismiss();
			});
  	}

  	ngOnInit(): void {
  		this.getFavourites();
  	}

  	toPlaceAdvert() {
  		this.navCtrl.push(PlaceAdvertPage);
  	}

}
