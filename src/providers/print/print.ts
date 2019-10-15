import { Injectable } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { App, LoadingController, Loading } from 'ionic-angular';
import { PrinterListPage } from '../../pages/printer-list/printer-list';
import { Constant } from '../../constant';
/*
  Generated class for the PrintProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PrintProvider {

  constructor(private bluetoothSerial: BluetoothSerial, private app: App, private loadingCtrl: LoadingController) {
  }
 
  print(payment, billDetail = null) {
 
    let loading = this.presentLoading();
    this.bluetoothSerial.isEnabled().then(() => {
      this.bluetoothSerial.list().then((allDevices) => {
        let printers = new Array<any>();
        allDevices.forEach((device: any) => {
          if (device.class == 1664) {
            printers.push(device)
          }
        })
 
        //alert(JSON.stringify(allDevices))
        this.app.getActiveNav().push(PrinterListPage, { printers: printers, payment: payment, billDetail: billDetail });
        loading.dismiss();
      }, (error) => {
        alert('error');
        loading.dismiss();
      }).catch((error) => {
        loading.dismiss();
        console.error(error);
      })
      /*this.bluetoothSerial.discoverUnpaired().then((allDevices) => {
        loading.dismiss();
      }).catch((error) => {
        loading.dismiss();
        console.error();
      })*/
    }).catch(() => {
      loading.dismiss();
      this.bluetoothSerial.enable().then((enable) => {
        this.print(history);
      })
    })
 
  }
 
 
  protected presentLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: Constant.loading_label
    });
    loading.present();
    return loading;
  }

}
