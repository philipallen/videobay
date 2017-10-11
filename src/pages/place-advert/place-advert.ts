import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { AdvertsService } from '../../services/adverts.service';
import { MyAdvertsPage } from '../my-adverts/my-adverts';
import { COUNTIES } from '../../mock/counties';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';

@Component({
    selector: 'page-place-advert',
    templateUrl: 'place-advert.html',
    providers: [MediaCapture, AdvertsService]
})
export class PlaceAdvertPage {
    model: any = {};
    videoData: any;
    errorMessage: any;
    response: any;
    countiesList = COUNTIES;

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
        console.log(this.userService.isSomeoneLoggedIn());
        console.log('try to place advert');
        console.log(this.model);

        let userId = this.userService.getLoggedInUser().id;
        let data = { //TODO cast this to the Advert class
            "title": this.model.title,
            "description": this.model.description,
            "price": Number(this.model.price),
            "country": "IRL",
            "videoUrl": "string", //TODO add a video
            "county": this.model.county //TODO add a typeahead select
        }

        this.advertsService.saveAdvert(data, userId).subscribe(
            response => {
                this.response = response;
                let alert = this.alertCtrl.create({
                    title: 'Success',
                    subTitle: 'Your advert was created.',
                    buttons: [
                        {
                            text: 'Place another advert',
                            handler: () => {
                                this.resetPage();
                            }
                        },
                        {
                            text: 'Go to My Adverts',
                            handler: () => {
                                this.navCtrl.setRoot(MyAdvertsPage);
                            }
                        }
                    ]
                });
                alert.present();
            },
            error => {
                this.errorMessage = <any>error;
                alert('Error. Advert not saved.');
            }
        ); 
    }

    resetPage() {
        this.videoData = null;
        this.model = {};
    }

    tryToGoBack() {
        if (this.videoData || Object.keys(this.model).length) { //todo check if Object.keys is supported on devices
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
                            this.resetPage();
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







