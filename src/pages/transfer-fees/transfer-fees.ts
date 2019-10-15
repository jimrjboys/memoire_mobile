import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Qrcode } from '../../lib/models/qrcode';
import { Invoice } from '../../lib/models/invoice';
import { ExchangePage } from '../exchange/exchange';

@IonicPage()
@Component({
  selector: 'page-transfer-fees',
  templateUrl: 'transfer-fees.html',
})
export class TransferFeesPage {

  invoice: Invoice
  qrcode: Qrcode
  exchange: {[key: string]: number} = {}

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad TransferFeesPage');
  // }


  /*pushToConfirm() {
    this.navCtrl.push(ConfirmPassPage, 
      { 
        qrcode: this.qrcode,
        invoice: this.invoice
      })
  }*/

  protected pushToExchange() {
    this.navCtrl.push(ExchangePage, 
      { 
        invoice: this.invoice,
        qrcode: this.qrcode
      })
  }

  return() {
    this.navCtrl.pop()
  }

  ionViewCanEnter() {
    this.invoice = this.navParams.get('invoice')
    this.invoice.total_cost;
    this.qrcode = this.navParams.get('qrcode')
  	if (!this.invoice && !this.qrcode)
  		return false
  }

}
