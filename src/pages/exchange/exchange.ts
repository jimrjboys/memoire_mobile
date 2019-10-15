import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { ConfirmPassPage } from '../confirm-pass/confirm-pass';
import { Qrcode } from '../../lib/models/qrcode';
import { Invoice } from '../../lib/models/invoice';
import { Config } from '../../config/config'
import { StorageProvider } from '../../providers/storage/storage'
import { Session } from '../../lib/models/session';

@IonicPage()
@Component({
  selector: 'page-exchange',
  templateUrl: 'exchange.html',
})
export class ExchangePage {

	invoice: Invoice
  qrcode: Qrcode
  exchange: {[key: string]: number} = {}
  loading :Loading

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storagePrvd:StorageProvider,
    public loadingCtrl :LoadingController
    ) {
  }

  pushToConfirm() {
    
    this.presentLoading().then(() =>{
      this.storagePrvd.getSession().then((session : Session) => {
        console.log(session.user.id)
        // this.invoice.invoiceAmount = this.invoice.total_cost.toString()
        // this.invoice.rendering = (this.exchange.received - this.invoice.total_cost).toString()
        // this.invoice.receivedAmount = this.exchange.received.toString()
        // this.invoice.transferFees = Config.transfertFees.toString()
        this.invoice.total_cost -= Config.transfertFees
        console.log(this.invoice)
        this.navCtrl.push(ConfirmPassPage, 
          { 
            qrcode: this.qrcode,
            invoice: this.invoice,
            idAgent: session.user.id
          })
          this.loading.dismiss()
      }).catch((error) => {
        console.log(error)
        this.loading.dismiss()
      })
    }).catch(() => {
      this.loading.dismiss()
    })
  }

  ionViewCanEnter() {
  	this.invoice = this.navParams.get('invoice')
    this.qrcode = this.navParams.get('qrcode')
    this.invoice.total_cost += Config.transfertFees
    this.exchange.amount = this.invoice.total_cost
    this.exchange.rendering = this.exchange.received - this.invoice.total_cost;
    console.log(this.invoice)
  	if (!this.invoice && !this.qrcode)
  		return false
  }

  protected presentLoading() {
    this.loading =  this.loadingCtrl.create()
    return this.loading.present()
  }

  ionViewCanLeave() {
    this.loading.dismissAll()
    return true
  }

}
