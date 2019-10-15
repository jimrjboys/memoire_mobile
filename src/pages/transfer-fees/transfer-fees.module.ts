import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransferFeesPage } from './transfer-fees';

@NgModule({
  declarations: [
    TransferFeesPage,
  ],
  imports: [
    IonicPageModule.forChild(TransferFeesPage),
  ],
})
export class TransferFeesPageModule {}
