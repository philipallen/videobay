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

        let userId = 1;
        let data = {
            "country": "IRL",
            "county": "Dublin",
            "created": "Tue Aug 22 2017 20:38:19 GMT+0100 (IST)",
            "description": "Test video",
            "id": 0,
            "price": 100,
            "state": "OPEN",
            "title": "This is a test",
            "user": {
                "adverts": [
                    {}
                ],
                "email": "string",
                "firstName": "phil",
                "id": 1,
                "password": "g8uein",
                "screenName": "philallen",
                "surName": "allen"
            },
            "videoUrl": "string"
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







