import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Component({
    template: `<ng-content></ng-content>`
})

export class ToastComponent {
    toast;

    constructor(private toastCtrl: ToastController) {}

    create(message: string, time?: number) {
        let duration = 1000;
        if (time) duration = time;
        this.toast = this.toastCtrl.create({
            message: message,
            duration: duration,
            position: 'top'
        });

        this.toast.present();
    }
}
