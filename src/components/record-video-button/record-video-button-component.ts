import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';

@Component({
    selector: 'record-video-button-component',
    templateUrl: 'record-video-button-component.html',
    providers: [MediaCapture]
})
export class RecordVideoButtonComponent {
    @Input() videoData: Array<any>;
    @Output() videoDataChange = new EventEmitter();

    constructor(private mediaCapture: MediaCapture,) {}
    
    recordVideo() {
        this.resetVideo();
        let options: CaptureImageOptions = { 
            limit: 1
        };
        this.mediaCapture.captureVideo(options)
            .then(
                (data: MediaFile[]) => {
                    this.videoData = data;
                    this.emitVideoData();
                },
                (err: CaptureError) => alert('Video not captured. Error: ' + err)
            );
    }
    
    resetVideo() {
        this.videoData = [];
        this.emitVideoData();
    }
    
    emitVideoData() {
        this.videoDataChange.emit(this.videoData);
    }
        
    
}