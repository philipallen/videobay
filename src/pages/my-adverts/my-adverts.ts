import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EditAdvertPage } from '../edit-advert/edit-advert';
import { CreateAdvertPage } from '../create-advert/create-advert';
import { Advert } from '../../models/advert';
import { LoadingComponent } from '../../components/loading-component';
import { UserService } from '../../services/user.service';
import { AdvertsService } from '../../services/adverts.service';
import { CONSTANTS } from '../../constants/constants';

@Component({
	selector: 'page-my-adverts',
	templateUrl: 'my-adverts.html',
	providers: [AdvertsService, LoadingComponent]
})
export class MyAdvertsPage {
    myAdverts: Advert[] = [];
    errorMessage: any;

  	constructor(
		private loadingComponent: LoadingComponent,
  		public navCtrl: NavController, 
		public userService: UserService,
  		private advertsService: AdvertsService) {
	  	
  	}

  	getAdverts(): void {
		this.loadingComponent.present();
		let userId = this.userService.getLoggedInUser().id;
  		this.advertsService.getAdvertsByUser(userId).subscribe(
            response => {
				this.myAdverts = response;
				this.loadingComponent.dismiss();
			},
            error => {
				this.errorMessage = <any>error;
				this.loadingComponent.dismiss();
				alert('Error: there was an error getting your adverts');
			});
  	}

  	ngOnInit(): void {
  		this.getAdverts();
	}
	
	deleteAdvert(advert) {
		this.loadingComponent.present();
		let userId = this.userService.getLoggedInUser().id;
		let advertToDelete = advert;
		advertToDelete.state = CONSTANTS.ADVERT_STATE_CLOSED;
		this.advertsService.updateAdvertsForUser(advertToDelete, userId).subscribe(
			response => {
				this.loadingComponent.dismiss();
				this.getAdverts();
			},
			error => {
				this.errorMessage = <any>error;
				this.loadingComponent.dismiss();
				alert('Error: there was an error deleting your advert');
			}
		)
	} 
	
	toCreateAdvert() {
		this.navCtrl.push(CreateAdvertPage);
	}

  	toEditAdvert(advert) {
  		this.navCtrl.push(EditAdvertPage, {advert: advert});
  	}

}
