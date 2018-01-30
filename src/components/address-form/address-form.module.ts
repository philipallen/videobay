import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddressFormComponent } from './address-form';

@NgModule({
  declarations: [
    AddressFormComponent,
  ],
  imports: [
    IonicPageModule.forChild(AddressFormComponent),
  ],
  exports: [
    AddressFormComponent
  ]
})
export class AddressFormComponentModule {}
