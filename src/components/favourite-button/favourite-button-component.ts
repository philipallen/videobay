import { Component, Input } from '@angular/core';
import { AdvertsService } from '../../services/adverts.service';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'favourite-button-component',
    templateUrl: 'favourite-button-component.html'
})
export class FavouriteButtonComponent {
    errorMessage: any;
    user: any = this.userService.getLoggedInUser();
    @Input() advertId: number;

    constructor(private advertsService: AdvertsService,
		public userService: UserService) {}

	toggleFavourite() {
		this.advertsService.addToFavourites(this.advertId, this.user.id).subscribe(
            response => {
                this.userService.getByUsernameAndPassword(this.user)
                    .subscribe(
                        data => {
                            localStorage.setItem('currentUser', JSON.stringify(data));
                            this.user = data;
                        },
                        // todo add toast here
                        error => {
                            alert('error: did not get user');
                        });
			},
            error => {
                this.errorMessage = <any>error;
                alert('error: did not add to favourites');
            } //todo add better ui error handling
		);
    }
    
    isFavourited() {
        return this.user.favoriteAds.indexOf(this.advertId) > -1 ? true : false;
    }
}