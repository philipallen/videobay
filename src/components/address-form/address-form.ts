import { Component, Input ,Output, EventEmitter } from '@angular/core';
import { Address } from '../../models/Address';

/**
 * Generated class for the AddressFormComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'address-form',
  templateUrl: 'address-form.html'
})
export class AddressFormComponent {
  @Input() address : Address;
  @Input() buttonText: string;
  @Output() onsubmit = new EventEmitter<Address>(); 
  text: string;

  constructor() {
    console.log('Hello AddressFormComponent Component');
    this.text = 'Hello World';
  }

}
