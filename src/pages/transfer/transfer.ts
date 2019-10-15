import { Component } from '@angular/core';
import { 
  IonicPage, NavController, NavParams, 
  ToastController, 
} from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { FirebaseProvider } from '../../providers/firebase/firebase';
//import { ExchangePage } from '../exchange/exchange';
import { Qrcode } from '../../lib/models/qrcode';
import { Invoice } from '../../lib/models/invoice';
import { TransferFeesPage } from '../transfer-fees/transfer-fees';

@IonicPage()
@Component({
  selector: 'page-transfer',
  templateUrl: 'transfer.html',
})
export class TransferPage {

  qrcode: Qrcode
  invoice: Invoice  = new Invoice()

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public toastCtrl: ToastController,
    public formBuilder : FormBuilder, 
    private firebasePrvd: FirebaseProvider,
    ) {

  }

  protected getInvoice() {
    this.qrcode = this.navParams.get('qrcode')
    return new Promise((resolve, reject) => {
      this.firebasePrvd.getInvoice(this.qrcode)
      .then((invoice: Invoice) => {
        console.log(invoice)
        this.invoice = invoice
        resolve()
      }, (error) => {
        reject()
      })
    })
  }

  ionViewCanEnter() {
    // IMPORTANT : DO NOT REMOVE
    return this.getInvoice()
  }

  /*protected pushToExchange() {
    this.navCtrl.push(ExchangePage, 
      { 
        invoice: this.invoice,
        qrcode: this.qrcode
      })
  }*/

  protected pushToTransfeFees() {
    this.navCtrl.push(TransferFeesPage, {
      invoice: this.invoice,
      qrcode: this.qrcode
    })
  }

  cancel() {
    this.navCtrl.pop();
  }

}
