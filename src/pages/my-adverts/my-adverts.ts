import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
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
		private alertCtrl: AlertController,
		public userService: UserService,
  		private advertsService: AdvertsService) {
	  	
  	}

  	getAdverts(): void {
		this.loadingComponent.present();
		let userId = this.userService.getLoggedInUser().id;
  		this.advertsService.getAdvertsByUser(userId).subscribe(
            response => {
				this.myAdverts = response.filter(advert => advert.state === CONSTANTS.ADVERT_STATE_OPEN);
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

	tryToDeleteAdvert(advert) {
		let alertPopup = this.alertCtrl.create({
			title: "Warning",
			message: "Are you sure you want to delete your advert? You won't be able to undo this.",
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel'
				},
				{
					text: 'Yeah, delete it.',
					handler: () => {
						this.deleteAdvert(advert);
					}
				}]
		});
		alertPopup.present();
    }
	
	deleteAdvert(advert) {
		this.loadingComponent.present();
		this.advertsService.cancelAdvertById(advert.id).subscribe(
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
