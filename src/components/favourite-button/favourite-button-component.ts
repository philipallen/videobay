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
        
    updateUserDetail(message) {
        this.userService.getByUsernameAndPassword(this.user)
            .subscribe(
                data => {
                    this.user = data;
                    this.toastComponent.create(message);
                },
                error => this.erroredRequest(error, 'error did not update user details')
            );
    }

    erroredRequest(error, message) {
        this.errorMessage = <any>error; //todo sort this later
        alert(message);
    }

	toggleFavourite() {
        if (this.isFavourited()) {
            this.advertsService.removeFromFavourites(this.advertId, this.user.id).subscribe(
                response => this.updateUserDetail('Removed from favourites'),
                error => this.erroredRequest(error, 'error did not remove from favourties')
            );
        } else {
            this.advertsService.addToFavourites(this.advertId, this.user.id).subscribe(
                response => this.updateUserDetail('Added to favourites'),
                error => this.erroredRequest(error, 'error did not add to favourties')
            );
        }
    }
    
    isFavourited() {
        return this.user.favoriteAds.indexOf(this.advertId) > -1 ? true : false;
    }
}