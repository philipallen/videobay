import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import videojs from 'video.js';

@Component({
    selector: 'advert-component',
    templateUrl: 'advert-component.html'
})
export class AdvertComponent {
    @Input() advert: any;

    constructor() {}
}