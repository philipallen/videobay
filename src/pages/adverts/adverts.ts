import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingComponent } from '../../components/loading-component';
import { CreateAdvertPage } from '../create-advert/create-advert';
import { Advert } from '../../models/advert';
import { AdvertsService } from '../../services/adverts.service';
import { UserService } from '../../services/user.service';
import { CONSTANTS } from '../../constants/constants';

@Component({
	selector: 'page-adverts',
	templateUrl: 'adverts.html',
	providers: [AdvertsService, LoadingComponent]
})
export class AdvertsPage {
    adverts: Advert[] = [];
	errorMessage: any;

  	constructor(
  		public navCtrl: NavController, 
		public userService: UserService,
		private loadingComponent: LoadingComponent,
  		private advertsService: AdvertsService) {

	  	//*******************************
	  	//Logic around autoplaying videos
	  	//(to be worked on later)
	  	//*******************************
	  	// window.addEventListener("resize", playVideos, false);
		// window.addEventListener("scroll", playVideos, false);
		// // var players = ['example_video_1', 'example_video_2'];
		// var players = document.getElementsByClassName('video-js');

		// // Loop through all the players, check if video player is visible in the viewport. If it is visible, play it. If not, do not play it.
		// function playVideos() {

		//     for (var i = 0; i < players.length; i++) 
		//     {
		//         // var videoPlayer = $('#' + players[i]);
		//         // var videoPlayer = document.getElementById(players[i]);
		//         // var videoPlayerElem = vjs('#' + players[i]);
		//         var id = players[i].getAttribute('id');
		//         var videoPlayerElem = document.getElementById(id);

		//         // if (isOnScreen(videoPlayer))
		//         if (isOnScreen(videoPlayerElem)) {
		//         	console.log('is on screen');
		//              // videoPlayerElem.play();
		//         } else {
		//         	console.log('is not screen');
		//              // videoPlayerElem.pause();
		//         }     
		//     }

		// }

		// function isOnScreen(element) {
		//    // var elementOffsetTop = element.offset().top;
		//    var elementOffsetTop = element.getBoundingClientRect().top;
		//    // var elementHeight = element.height();
		//    var elementHeight = element.style.height;

		//    // var screenScrollTop = $(window).scrollTop();
		//    var screenScrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body).scrollTop;
		//    // var screenHeight = $(window).height();
		//    var screenHeight = window.innerHeight;

		//    var scrollIsAboveElement = elementOffsetTop + elementHeight - screenScrollTop >= 0;
		//    var elementIsVisibleOnScreen = screenScrollTop + screenHeight - elementOffsetTop >= 0;

		//    return scrollIsAboveElement && elementIsVisibleOnScreen;
		// }
  	}

  	getAdverts(): void {
		//mock data
		// this.advertsService.getAdvertsByCountryAndState().then(adverts => this.adverts = adverts); 
		
		//real endpoint
		this.loadingComponent.present();
		this.advertsService.getAdvertsByCountryAndState('IRL', CONSTANTS.ADVERT_STATE_OPEN).subscribe( 
				adverts  => {
					this.adverts = adverts;
					this.loadingComponent.dismiss();
				},
				error =>  {
					this.errorMessage = <any>error;
					this.loadingComponent.dismiss();
					alert('Error getting adverts');
				});
  	}

  	ngOnInit(): void {
  		this.getAdverts();
  	}

  	toCreateAdvert() {
  		this.navCtrl.push(CreateAdvertPage);
	}

  	searchAdverts(ev: any) {
	    console.log('basic search that does not work properly. conceptual.')

	    let val = ev.target.value;

	    if (val && val.trim() != '') {
	      	this.adverts = this.adverts.filter((advert) => {
	        	return (advert.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
	      	})
	    } else {
	    	this.getAdverts();
	    }
  	}
}
