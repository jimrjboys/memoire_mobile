import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountDetailPage } from './account-detail';

@NgModule({
  declarations: [
    AccountDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountDetailPage),
  ],
})
export class AccountDetailPageModule {}
