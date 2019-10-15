import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmPassPage } from './confirm-pass';

@NgModule({
  declarations: [
    ConfirmPassPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmPassPage),
  ],
})
export class ConfirmPassPageModule {}
