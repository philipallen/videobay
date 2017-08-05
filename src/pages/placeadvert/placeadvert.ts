import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

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
    private mediaCapture: MediaCapture,
    private alertCtrl: AlertController) {
	}

  recordVideo() {
    let options: CaptureImageOptions = { limit: 1 };
    this.mediaCapture.captureVideo(options)
      .then(
        (data: MediaFile[]) => this.videoData = data,
        (err: CaptureError) => alert(err)
      );
  }

  reRecordVideo() {
    this.videoData = null;
    this.recordVideo();
  }

	placeAdvert() {
		console.log(this.userService.someoneLoggedIn());
		console.log('try to place advert');
		console.log(this.model);
	}

  tryToGoBack() {
    if (this.videoData) {
      let alertPopup = this.alertCtrl.create({
        title: "Warning",
        message: "Are you sure you want to leave? You'll lose your advert.",
        buttons: [
        {
          text: 'Nah, stay',
          role: 'cancel'
        },
        {
          text: 'Yeah, leave',
          handler: () => {
            this.videoData = null;
            this.goBack();
          }
        }]
      });

      alertPopup.present();
    } else {
      this.goBack();
    }
  }

  goBack() {
    this.navCtrl.pop();
  }

}







