import { Component, ViewChild, ElementRef  } from '@angular/core';
import { NavController, AlertController, NavParams, Platform } from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { AdvertsService } from '../../services/adverts.service';
import { FileUploadService } from '../../services/file-upload.service';
import { PermissionsService } from '../../services/permissions.service';
import { MyAdvertsPage } from '../my-adverts/my-adverts';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';

@Component({
    selector: 'page-edit-advert',
    templateUrl: 'edit-advert.html',
    providers: [MediaCapture, AdvertsService, FileUploadService]
})
export class EditAdvertPage {
    @ViewChild('video') input: ElementRef; 
    model: any = {};
    videoData: Array<any> = [];
    errorMessage: any;
    response: any;
    isUsingCordova = this.platform.is('cordova');

    constructor(
        public navCtrl: NavController,
		public navParams: NavParams,
        public userService: UserService,
        private mediaCapture: MediaCapture,
        private alertCtrl: AlertController,
        private advertsService: AdvertsService,
        private fileUploadService: FileUploadService,
        public permissionsService: PermissionsService,
        public platform: Platform) {
            this.model = navParams.get('advert');
    }

  	ngOnInit(): void {
        this.permissionsService.checkStoragePermissions().then(permissionOk => {
            if (!permissionOk) {
                alert('You\'ll need to allow the app access to your phone\'s storage to edit an advert.');
            }
        });
    }

    recordVideo() {
        this.resetVideo();
        let options: CaptureImageOptions = { 
            limit: 1
        };
        this.mediaCapture.captureVideo(options)
            .then(
                (data: MediaFile[]) => {
                    this.videoData = data;
                },
                (err: CaptureError) => alert('Video not captured. Error: ' + err)
            );
    }

    resetVideo() {
        this.videoData = [];
    }

    editAdvert() {
        let userId = this.userService.getLoggedInUser().id;
        this.advertsService.updateAdvertsForUser(this.model, userId).subscribe(
            response => {
                this.editedSuccessfully();
                // TODO when the video stuff is working, this can be added back and edited
                // if (this.isUsingCordova) { 
                //     // The below needs testing
                //     this.fileUploadService.uploadVideoCordova(this.videoData[0], response.id).then(uploaded => {
                //         if (uploaded) {
                //             this.editedSuccessfully();
                //         } else {
                //             alert('Error, video not uploaded properly');
                //         }
                //     });
                // }
                // if (!this.isUsingCordova) {
                //     // The the below needs testing
                //     this.fileUploadService.uploadVideoDesktop(this.videoData[0], response.id).then(response => {
                //         if (response) { //todo test this. Might never go into error as response is the thing being passed back from the servive regardless.
                //             this.editedSuccessfully();
                //         } else {
                //             alert('Error, video not uploaded properly');
                //         }
                //     });
                // }
            },
            error => {
                this.errorMessage = <any>error;
                alert('Error. Advert metadata not saved correctly.');
            }
        ); 
    }

    editedSuccessfully() {
        let alert = this.alertCtrl.create({
            title: 'Success',
            subTitle: 'Your advert was saved.',
            buttons: [
                {
                    text: 'Go to My Adverts',
                    handler: () => {
                        this.navCtrl.setRoot(MyAdvertsPage);
                    }
                }
            ]
        });
        alert.present();
    }

    resetPage() {
        this.resetVideo();
        this.model = {};
    }

    tryToGoBack() {
        //TODO this will all changes for edit advert
        if (this.videoData.length || Object.keys(this.model).length) { //todo check if Object.keys is supported on devices
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







