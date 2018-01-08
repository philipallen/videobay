import { Component, Input } from '@angular/core';
import { Advert } from '../../models/advert';

@Component({
    selector: 'advert-component',
    templateUrl: 'advert-component.html'
})
export class AdvertComponent {
    @Input() advert: Advert;

    constructor() {}
}