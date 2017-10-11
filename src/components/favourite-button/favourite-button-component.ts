import { Component, Input } from '@angular/core';
import { ToastComponent } from '../../components/toast-component';
import { AdvertsService } from '../../services/adverts.service';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'favourite-button-component',
    templateUrl: 'favourite-button-component.html',
	providers: [ToastComponent]
})
export class FavouriteButtonComponent {
    errorMessage: any;
    user: any = this.userService.getLoggedInUser();
    @Input() advertId: number;

    constructor(private advertsService: AdvertsService,
        public userService: UserService,
		private toastComponent: ToastComponent) {}

	toggleFavourite() {
		this.advertsService.addToFavourites(this.advertId, this.user.id).subscribe(
            response => {
                this.userService.getByUsernameAndPassword(this.user)
                    .subscribe(
                        data => {
                            localStorage.setItem('currentUser', JSON.stringify(data));
                            this.user = data;
                            this.toastComponent.create('Added to favourites');
                        },
                        error => {
                            alert('error: did not get user');
                        });
			},
            error => {
                this.errorMessage = <any>error;
                alert('error: did not add to favourites');
            }
		);
    }
    
    isFavourited() {
        return this.user.favoriteAds.indexOf(this.advertId) > -1 ? true : false;
    }
}