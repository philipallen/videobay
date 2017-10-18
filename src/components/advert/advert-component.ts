import { Component, Input } from '@angular/core';

@Component({
    selector: 'advert-component',
    templateUrl: 'advert-component.html'
})
export class AdvertComponent {
    @Input() advert: any;

    constructor() {}
}