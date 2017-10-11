import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import videojs from 'video.js';

@Component({
    selector: 'advert-component',
    templateUrl: 'advert-component.html'
})
export class AdvertComponent {
    @ViewChild('video') input: ElementRef; 
    response: any;
	errorMessage: any;
    @Input() advert: any;

    constructor() {}
      
    ngAfterViewInit() {
        videojs(this.input.nativeElement);
    }

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