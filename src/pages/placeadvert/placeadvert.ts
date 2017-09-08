import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { UserService } from '../../services/user.service';
import { AdvertsService } from '../../services/adverts.service';

import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';

@Component({
    selector: 'page-placeadvert',
    templateUrl: 'placeadvert.html',
    providers: [MediaCapture, AdvertsService]
})
export class PlaceAdvertPage {
    model: any = {};
    videoData: any;
    errorMessage: any;
    response: any;

    constructor(
        public navCtrl: NavController,
        public userService: UserService,
        private mediaCapture: MediaCapture,
        private alertCtrl: AlertController,
        private advertsService: AdvertsService) {
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

        let userId = this.userService.getLoggedInUser().id;
        let data = { //TODO cast this to the Advert class
            "title": this.model.title,
            "description": this.model.description,
            "price": Number(this.model.price),
            "country": "IRL",
            "videoUrl": "string", //TODO add a video
            "created": null, //TODO add a timestamp
            "county": this.model.county //TODO add a typeahead select
        }

        this.advertsService.saveAdvert(data, userId).subscribe(
            response => this.response = response,
            error => this.errorMessage = <any>error);
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







