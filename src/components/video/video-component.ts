import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import videojs from 'video.js';

@Component({
    selector: 'video-component',
    templateUrl: 'video-component.html'
})
export class VideoComponent {
    @ViewChild('video') input: ElementRef; 
    @Input() src: string;
    @Input() poster: string;

    constructor() {}
      
    ngAfterViewInit() {
        // videojs(this.input.nativeElement); //This made the app really slow on the phone. 
    }

    //ANY VIDEO CONFIG OR LOGIC IN HERE
    //TODO figure the below out...
    togglePause(e) {
        // let myPlayer = videojs(e.srcElement);
        console.log(e);
    //  if (myPlayer.paused()) {
    //  	myPlayer.play();
        // } else {
    //  	myPlayer.pause();
        // }
    }
}