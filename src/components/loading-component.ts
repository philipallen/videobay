import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';

@Component({
    template: `<ng-content></ng-content>`
})

export class LoadingComponent {
    loadingPopup;

    constructor(private loadingCtrl: LoadingController) {}

    present() {
        this.loadingPopup = this.loadingCtrl.create({
            // content: 'Loading data...' //Can add text content here
        });
        this.loadingPopup.present();
    }

    dismiss() {
        this.loadingPopup.dismiss();
    }
}
