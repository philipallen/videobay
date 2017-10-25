import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'file-upload-component',
    templateUrl: 'file-upload-component.html'
})
export class FileUploadComponent {
    @Input() videoData: Array<any>;
    @Output() videoDataChange = new EventEmitter();

    constructor(private sanitizer: DomSanitizer) {}

    fileChangeEvent(fileInput: any) {
        if (fileInput.target.files && fileInput.target.files[0]) {
            this.videoData[0] = fileInput.target.files[0];
            this.videoData[0].fullPath = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(fileInput.target.files[0]));
            this.emitVideoData();
        }
    }

    resetVideo() {
        this.videoData = [];
        this.emitVideoData();
    }

    emitVideoData() {
        this.videoDataChange.emit(this.videoData);
    }
}