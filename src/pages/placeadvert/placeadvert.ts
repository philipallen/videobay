import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UserService } from '../../services/user.service';

import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';

@Component({
	selector: 'page-placeadvert',
	templateUrl: 'placeadvert.html',
  providers: [MediaCapture]
})
export class PlaceAdvertPage {
	model: any = {};
  videoData: any;

	constructor(
		public navCtrl: NavController,
  	public userService: UserService,
    private mediaCapture: MediaCapture) {
	}

  recordVideo() {
    let options: CaptureImageOptions = { limit: 1 };
    this.mediaCapture.captureVideo(options)
      .then(
        (data: MediaFile[]) => this.videoData = data,
        (err: CaptureError) => alert(err)
      );
  }

	placeAdvert() {
		console.log(this.userService.someoneLoggedIn());
		console.log('try to place advert');
		console.log(this.model);
	}

}
