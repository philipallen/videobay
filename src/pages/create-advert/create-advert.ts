import { Component, ViewChild, ElementRef  } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { AdvertsService } from '../../services/adverts.service';
import { FileUploadService } from '../../services/file-upload.service';
import { PermissionsService } from '../../services/permissions.service';
import { MyAdvertsPage } from '../my-adverts/my-adverts';
import { COUNTIES } from '../../mock/counties';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';
import { LoginPage } from '../login/login';

@Component({
    selector: 'page-create-advert',
    templateUrl: 'create-advert.html',
    providers: [MediaCapture, AdvertsService, FileUploadService]
})
export class CreateAdvertPage {
    @ViewChild('video') input: ElementRef; 
    model: any = {};
    editingAnAdvert: boolean = false;
    videoData: any;
    errorMessage: any;
    response: any;
    countiesList = COUNTIES;
    mockVideo = 'assets/VID_20171017_115445.mp4';

    constructor(
        public navCtrl: NavController,
		public navParams: NavParams,
        public userService: UserService,
        private mediaCapture: MediaCapture,
        private alertCtrl: AlertController,
        private advertsService: AdvertsService,
        private fileUploadService: FileUploadService,
        public permissionsService: PermissionsService) {
            if (navParams.get('advert')) {
                this.model = navParams.get('advert');
                this.editingAnAdvert = true;
            }
    }

  	ngOnInit(): void {
        this.permissionsService.checkStoragePermissions().then(permissionOk => {
            if (!permissionOk) {
                alert('You\'ll need to allow the app access to your phone\'s storage to place an advert.');
            }
        });
    }

    recordVideo() {
        let options: CaptureImageOptions = { 
            limit: 1
        };
        this.mediaCapture.captureVideo(options)
            .then(
                (data: MediaFile[]) => {
                    this.videoData = data;
                },
                (err: CaptureError) => alert(err)
            );
    }

    reRecordVideo() {
        this.videoData = null;
        this.recordVideo();
    }

    createAdvert() {
        //TODO Awaiting backend
        if (this.editingAnAdvert) {
            alert('Waiting on a PUT endpoint to update an advert');
            return true;
        }

        if (!this.videoData) {
            alert('You need to add a video');
            return true;
        }

        let userId = this.userService.getLoggedInUser().id;
        let data = { //TODO cast this to the Advert class
            "title": this.model.title,
            "description": this.model.description,
            "price": Number(this.model.price),
            "country": "IRL",
            "county": this.model.county
        }

        this.advertsService.saveAdvert(data, userId).subscribe(
            response => {
                // TODO change the advert ID to whatever you get back from the server response
                // Awaiting backend changes before doing this. 
                // Then the below needs testing
                this.fileUploadService.uploadVideo(this.videoData[0], 12).then(uploaded => {
                    if (uploaded) {
                        let alert = this.alertCtrl.create({
                            title: 'Success',
                            subTitle: 'Your advert was created.',
                            buttons: [
                                {
                                    text: 'Create another advert',
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
                    } else {
                        alert('Error, video not uploaded properly');
                    }
                });
            },
            error => {
                this.errorMessage = <any>error;
                alert('Error. Advert metadata not saved correctly.');
            }
        ); 
    }

    resetPage() {
        this.videoData = null;
        this.model = {};
    }

    tryToGoBack() {
        //TODO Awaiting backend
        if (this.editingAnAdvert) {
            this.goBack();
            return true;
        }

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

    toLogin() {
        this.navCtrl.push(LoginPage, { goBackAfterLogin: true });
    }

}







