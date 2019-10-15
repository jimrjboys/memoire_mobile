import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { Constant } from '../../constant';
import { Bill } from '../../lib/models/bill';
import { Session } from '../../lib/models/session';
import { CyclosProvider } from '../../providers/cyclos/cyclos';

@IonicPage()
@Component({
  selector: 'page-printer-list',
  templateUrl: 'printer-list.html',
})
export class PrinterListPage {

  printers = new Array<any>();
	payment;
  billDetail: Bill;
  session: Session;
  text: string ;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private bluetoothSerial: BluetoothSerial, private loadingCtrl: LoadingController
  	) {
    this.printers = this.navParams.get('printers');
  	this.payment = this.navParams.get('payment');
    this.session = CyclosProvider.session

    let text: string = "";
    text += "RECU DE PAIEMENT\n";
    text += "status : TRANSACTION REUSSIE" + "\n"
    console.log(this.session);
    text += "Nom de l'utilisateur : " + this.session.user.display + "\n"
    //text += "N° (utilisateur):" + this.session.user.id + "\n"
    if (this.payment.toUser)
      text += "Beneficiaire :" + this.payment.toUser.display + "\n"
    else {
      if (this.payment.relatedAccount.user) {
        text += "Beneficiaire :" + this.payment.relatedAccount.user.display + "\n"
      }
    }
    if (this.billDetail) {
      text += "Num fact: " + this.billDetail.bill + "\n"
    }
    if (this.payment.transaction)
      text += "Transaction n° : " + this.payment.transaction.id + "\n"
    else
      text += "Transaction n° : " + this.payment.id + "\n"
    text += "Montant : " + this.payment.amount + "Ar\n"
    text += "Description : " + this.payment.description + "\n"
    text += "Date et heure : " + this.payment.date + "\n"
    text += "\n";
    text += "\n";
    console.log(text);
    this.text = text;
  }

  refresh() {
    let loading = this.presentLoading();
    this.bluetoothSerial.discoverUnpaired().then((allDevices: [{any}]) =>{
      allDevices.forEach((device: any) => {
        if (device.class == 1664) {
          this.printers.push(device)
        }
      })
      loading.dismiss();
    }, (error) => {
      alert('error');
      loading.dismiss();
    })
  }

  write(printer: any) {

    let loading = this.presentLoading();
    this.bluetoothSerial.connect(printer.id).subscribe((connected) => {
      this.bluetoothSerial.clear().then(() => {

    		this.bluetoothSerial.write(this.text).then((success) => {
  	  		loading.dismiss();
  	  		console.log(success);
    		}, (error) => {
  	  		loading.dismiss();
          console.error(error);
        }).catch(() => {
          loading.dismiss()
        })
      })
    }, (error) => {
	  		loading.dismiss();
  		console.error(error);
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
