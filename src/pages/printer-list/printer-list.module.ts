import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrinterListPage } from './printer-list';

@NgModule({
  declarations: [
    PrinterListPage,
  ],
  imports: [
    IonicPageModule.forChild(PrinterListPage),
  ],
})
export class PrinterListPageModule {}
