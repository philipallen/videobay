import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PlaceAdvertPage } from '../place-advert/place-advert';
import { Advert } from '../../models/advert';
import { AdvertsService } from '../../services/adverts.service';
import { UserService } from '../../services/user.service';

@Component({
	selector: 'page-adverts',
	templateUrl: 'adverts.html',
	providers: [AdvertsService]
})
export class AdvertsPage {
    adverts: Advert[] = [];
    response: any;
	errorMessage: any;

  	constructor(
  		public navCtrl: NavController, 
		public userService: UserService,
  		private advertsService: AdvertsService) {

	  	//*******************************
	  	//Logic around autoplaying videos
	  	//(to be worked on later)
	  	//*******************************
	  	window.addEventListener("resize", playVideos, false);
		window.addEventListener("scroll", playVideos, false);
		// var players = ['example_video_1', 'example_video_2'];
		var players = document.getElementsByClassName('video-js');

		// Loop through all the players, check if video player is visible in the viewport. If it is visible, play it. If not, do not play it.
		function playVideos() {

		    for (var i = 0; i < players.length; i++) 
		    {
		        // var videoPlayer = $('#' + players[i]);
		        // var videoPlayer = document.getElementById(players[i]);
		        // var videoPlayerElem = vjs('#' + players[i]);
		        var id = players[i].getAttribute('id');
		        var videoPlayerElem = document.getElementById(id);

		        // if (isOnScreen(videoPlayer))
		        if (isOnScreen(videoPlayerElem)) {
		        	console.log('is on screen');
		             // videoPlayerElem.play();
		        } else {
		        	console.log('is not screen');
		             // videoPlayerElem.pause();
		        }     
		    }

		}

		function isOnScreen(element) {
		   // var elementOffsetTop = element.offset().top;
		   var elementOffsetTop = element.getBoundingClientRect().top;
		   // var elementHeight = element.height();
		   var elementHeight = element.style.height;

		   // var screenScrollTop = $(window).scrollTop();
		   var screenScrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body).scrollTop;
		   // var screenHeight = $(window).height();
		   var screenHeight = window.innerHeight;

		   var scrollIsAboveElement = elementOffsetTop + elementHeight - screenScrollTop >= 0;
		   var elementIsVisibleOnScreen = screenScrollTop + screenHeight - elementOffsetTop >= 0;

		   return scrollIsAboveElement && elementIsVisibleOnScreen;
		}
  	}

  	getAdverts(): void {
		//mock data
		//this.advertsService.getAdverts().then(adverts => this.adverts = adverts); 
		
		//real endpoint
		this.advertsService.getAdverts().subscribe( 
				adverts  => this.adverts = adverts,
				error =>  this.errorMessage = <any>error);
  	}

  	ngOnInit(): void {
  		this.getAdverts();
  	}

  	toPlaceAdvert() {
  		this.navCtrl.push(PlaceAdvertPage);
	}
	  
	toggleFavourite(advert) {
		let userId = this.userService.getLoggedInUser().id;
		// let data = { advertId: advert.id };
		
		this.advertsService.addToFavourites(advert.id, userId).subscribe(
            response => {
				console.log(response);
				this.response = response;
				// todo add toast here
			},
            error => this.errorMessage = <any>error //todo add ui error handling
		);
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
