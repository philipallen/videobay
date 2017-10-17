import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';

@Injectable()
export class PermissionsService {

    constructor(
        public diagnostic: Diagnostic,
        public platform: Platform) { }

    checkStoragePermissions(): Promise<boolean> {
        return new Promise(resolve => {
            if (this.platform.is('ios')) {
                //placeholder function
                //add stuff here when testing on ios
            }
            else if (this.platform.is('android')) {
                this.diagnostic.isExternalStorageAuthorized().then(authorised => {
                    if (authorised) {
                        resolve(true);
                    }
                    else {
                        this.diagnostic.requestExternalStorageAuthorization().then(authorisation => {
                            resolve(authorisation == this.diagnostic.permissionStatus.GRANTED);
                        });
                    }
                });
            }
        });
    }
}
