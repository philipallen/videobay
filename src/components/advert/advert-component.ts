import { Component, Input } from '@angular/core';

import videojs from 'video.js'

@Component({
    selector: 'advert-component',
    templateUrl: 'advert-component.html'
})
export class AdvertComponent {
    name: string;
    @Input() advert: any;
    @Input() loggedIn: boolean;

    constructor() {}

    //ANY VIDEO CONFIG OR LOGIC IN HERE
  
    //TODO figure the below out...
    togglePause(e) {
        let myPlayer = videojs(e.srcElement);
        console.log(e);
    //  if (myPlayer.paused()) {
    //  	myPlayer.play();
        // } else {
    //  	myPlayer.pause();
        // }
    }
}