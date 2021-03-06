import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CreateAdvertPage } from '../create-advert/create-advert';
import { Advert } from '../../models/advert';
import { LoadingComponent } from '../../components/loading-component';
import { UserService } from '../../services/user.service';
import { AdvertsService } from '../../services/adverts.service';

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

  	toCreateAdvert() {
  		this.navCtrl.push(CreateAdvertPage);
  	}

}
