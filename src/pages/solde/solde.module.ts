import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SoldePage } from './solde';

@NgModule({
  declarations: [
    SoldePage,
  ],
  imports: [
    IonicPageModule.forChild(SoldePage),
  ],
})
export class SoldePageModule {}
