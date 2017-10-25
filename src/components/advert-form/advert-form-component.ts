import { Component, Input, Output, EventEmitter } from '@angular/core';
import { COUNTIES } from '../../mock/counties';

@Component({
    selector: 'advert-form-component',
    templateUrl: 'advert-form-component.html'
})
export class AdvertFormComponent {
    @Input() model: any;
    @Input() buttonText: string;
    @Output() onsubmit = new EventEmitter<string>();
    countiesList = COUNTIES;

    constructor() {}
}