import { Component, Input } from '@angular/core';
import { AdvertsService } from '../../services/adverts.service';
import videojs from 'video.js'

@Component({
    selector: 'advert-component',
    templateUrl: 'advert-component.html'
})
export class AdvertComponent {
    response: any;
	errorMessage: any;
    @Input() advert: any;
    @Input() user: any;

    constructor(private advertsService: AdvertsService) {}

	toggleFavourite(advert) {
		this.advertsService.addToFavourites(advert.id, this.user.id).subscribe(
            response => {
				console.log(response);
				this.response = response;
				// todo add toast here
			},
            error => this.errorMessage = <any>error //todo add ui error handling
		);
	}

    //ANY VIDEO CONFIG OR LOGIC IN HERE
  
    //TODO figure the below out...
    togglePause(e) {
        let myPlayer = videojs(e.srcElement);
        console.log(e);
    //  if (myPlayer.paused()) {
    //  	myPlayer.play();
        // } else {
    //  	myPlayer.pause();
        // }
    }
}