import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { User } from '../../models/users';
import { Advert } from '../../models/adverts';
import { UserService } from '../../services/user.service';

import videojs from 'video.js'

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	currentUser: User;
    users: User[] = [];
    adverts: Advert[] = [];



  	constructor(public navCtrl: NavController, private userService: UserService) {
	  	this.currentUser = JSON.parse(localStorage.getItem('currentUser'));


	  	//*******************************
	  	//Fake data for videos
	  	//(to be swapped with real later)
	  	//*******************************
	  	this.adverts = [
	  		{
		  		id: 1,
			    title: "Giant bicycle",
			    city: "Dun Laoghaire",
			    county: "Co. Dublin",
			    country: "Ireland",
			    description: "Men's bicycle. Perfect condition. Collection only.",
			    price: 50,
			    dateAdded: 1497538869000
			},
			{
		  		id: 2,
			    title: "Portable Sony projector",
			    city: "Greystones",
			    county: "Co. Wicklow",
			    country: "Ireland",
			    description: "",
			    price: 125.50,
			    dateAdded: 1497366993000
			},
	  	]


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

  	togglePause(e) {
	  	//video.js 
	  		//node packages
	  		//package.json
	  		//imported into this file
	  		//index.html reference
	  		//home.html usage

	  	//videogular
	  		//node packages
	  		//package.json


	  	let myPlayer = videojs(e.srcElement);
	  	console.log(e);
	   //  if (myPlayer.paused()) {
	   //  	myPlayer.play();
	  	// } else {
	   //  	myPlayer.pause();
	  	// }
  	}

}
