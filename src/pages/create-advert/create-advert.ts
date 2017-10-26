import { Component, ViewChild, ElementRef  } from '@angular/core';
import { NavController, AlertController, NavParams, Platform } from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { AdvertsService } from '../../services/adverts.service';
import { FileUploadService } from '../../services/file-upload.service';
import { PermissionsService } from '../../services/permissions.service';
import { MyAdvertsPage } from '../my-adverts/my-adverts';
import { LoginPage } from '../login/login';

@Component({
    selector: 'page-create-advert',
    templateUrl: 'create-advert.html',
    providers: [AdvertsService, FileUploadService]
})
export class CreateAdvertPage {
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
        private alertCtrl: AlertController,
        private advertsService: AdvertsService,
        private fileUploadService: FileUploadService,
        public permissionsService: PermissionsService,
        public platform: Platform) {
            if (navParams.get('advert')) {
                this.model = navParams.get('advert');
            }
    }

  	ngOnInit(): void {
        this.permissionsService.checkStoragePermissions().then(permissionOk => {
            if (!permissionOk) {
                alert('You\'ll need to allow the app access to your phone\'s storage to place an advert.');
            }
        });
    }

    createAdvert() {
        if (!this.videoData.length) {
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

        this.advertsService.addAdvertByUser(data, userId).subscribe(
            response => {
                if (this.isUsingCordova) { 
                    // The below needs testing
                    this.fileUploadService.uploadVideoCordova(this.videoData[0], response.id).then(uploaded => {
                        if (uploaded) {
                            this.createdSuccessfully();
                        } else {
                            alert('Error, video not uploaded properly');
                        }
                    });
                }
                if (!this.isUsingCordova) {
                    // The the below needs testing
                    this.fileUploadService.uploadVideoDesktop(this.videoData[0], response.id).then(response => {
                        if (response) { //todo test this. Might never go into error as response is the thing being passed back from the servive regardless.
                            this.createdSuccessfully();
                        } else {
                            alert('Error, video not uploaded properly');
                        }
                    });
                }
            },
            error => {
                this.errorMessage = <any>error;
                alert('Error. Advert metadata not saved correctly.');
            }
        ); 
    }

    createdSuccessfully() {
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
    }

    resetPage() {
        this.videoData = [];
        this.model = {};
    }

    tryToGoBack() {
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

    toLogin() {
        this.navCtrl.push(LoginPage, { goBackAfterLogin: true });
    }

}







