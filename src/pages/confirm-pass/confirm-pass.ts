import { Component } from '@angular/core';
import { IonicPage, NavController, 
  NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { CyclosProvider } from '../../providers/cyclos/cyclos';
import { AccountProvider } from '../../providers/cyclos/account';
import { Credential } from '../../lib/credential';
import { Session } from '../../lib/models/session';
import { Payment, PaymentType, CustomValues } from '../../lib/models/payment';
import { Invoice } from '../../lib/models/invoice';
import { PaymentProvider } from '../../providers/cyclos/payment';
import { Qrcode } from '../../lib/models/qrcode';
import { SuccessfulTransfertPage } from '../successful-transfert/successful-transfert';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Config } from '../../config/config'
import { InvoicePrint } from '../../lib/models/invoicePrint'

@IonicPage()
@Component({
  selector: 'page-confirm-pass',
  templateUrl: 'confirm-pass.html',
})
export class ConfirmPassPage {

  user: {
    password?: string
  } = {}
  invoice: Invoice = new Invoice()
  qrcode: Qrcode
  loading: Loading
  facture: InvoicePrint  = new InvoicePrint()
  idAgent: string;
  idTransaction: string;
  credential:Credential
  session : Session
  //idAgent: any;
  //idTransaction: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	private accountPrvd: AccountProvider,
    private paymentPrvd: PaymentProvider, 
    private alertCtrl: AlertController,
    private firebasePrvd: FirebaseProvider,
    private loadingCtrl: LoadingController,
    ) {
  }

  protected pushToSuccess() {
    this.loading.dismiss().then(() => {
      this.navCtrl.push(SuccessfulTransfertPage, {
         amount: this.invoice.total_cost,
         invoice: this.invoice,
        })
    })
  }
  ionViewCanEnter() {
    this.qrcode = this.navParams.get('qrcode')
    this.invoice = this.navParams.get('invoice')
    this.idAgent = this.navParams.get('idAgent')
    if (!this.qrcode && !this.invoice)
      return false
  }

  protected confirm() {
    this.session = CyclosProvider.session
    this.credential = new Credential({
      name: this.session.principal,
      password: this.user.password
    })
  	this.accountPrvd.getAccountList(this.credential)
  	.then((acccount) => {
      this.pay()
  	}, (error) => {
      this.alertCtrl.create({
        title: "Attention",
        message: "Mots de passe invalide",
        buttons: [{
          text: 'OK'
        }]
      })
      .present()
    })
  }

  protected presentLoading() {
    this.loading =  this.loadingCtrl.create()
    return this.loading.present()
  }

  protected createPayObject(amount: number, subject: string, customValues?: CustomValues) : Payment{
    let payment: Payment = {
      amount: amount,
      description: this.invoice.ref,
      subject: subject,
      customValues: customValues,
      type: PaymentType.USER_TRADE
    }
    return payment;
  }

  protected pay() {
    console.log("----")
    console.log(this.invoice)
    //this.tpePrint()

    this.presentLoading()
    .then(() => {
      let paymentToJirama = this.createPayObject(
        this.invoice.total_cost,
        this.qrcode.fiid,
        {
          transferFees : Config.transfertFees.toString(),
          idAgent: this.idAgent
        })
      let paymentToFintek = this.createPayObject(
        Config.transfertFees,
        Config.FINTEK_ID,
        {
          idAgent: this.idAgent
        });
      // let transfer: Transfer = {
      //   creditedAccountId:'1',
      //   debitedAccountId:'3',
      //   amount: this.invoice.total_cost,
      //   wording: this.invoice.cust_ref + "_" + this.invoice.ref
      // }

      this.paymentPrvd.setTransaction(paymentToJirama, this.session)
      .then((payment: any) => {
        console.log(payment)
          this.idTransaction = payment.id
          this.paymentPrvd.setTransaction(paymentToFintek, this.session);
        //this.orchidPrvd.setTransfer(transfer).then(() => {
          this.firebasePrvd.payInvoice(this.qrcode)
          .then(() => {
            this.facture = this.facture.tpePrint(this.invoice)
            //this.tpePrint()
            this.saveHistory()
            this.pushToSuccess()
          })
        //})
      })
      .catch((error) => {
        console.log(error)
        this.loading.dismiss()
      })
    })
  }

  // protected pay() {
  //   console.log("----")
  //   console.log(this.invoice)
  //   //this.tpePrint()

  //   this.presentLoading()
  //   .then(() => {
  //     let payment: Payment = {
  //       amount: this.invoice.total_cost,
  //       description: this.invoice.ref,
  //       subject: this.qrcode.fiid,
  //       customValues: {
  //         transferFees : Config.transfertFees.toString(),
  //         idAgent : this.idAgent
  //       },
  //       type: PaymentType.USER_TRADE
  //     }
  //     // let transfer: Transfer = {
  //     //   creditedAccountId:'1',
  //     //   debitedAccountId:'3',
  //     //   amount: this.invoice.total_cost,
  //     //   wording: this.invoice.cust_ref + "_" + this.invoice.ref
  //     // }

  //     this.payementPrvd.setTransfer(payment, this.credential)
  //     .then((payment: any) => {
  //       console.log(payment)
  //       this.idTransaction = payment.id
  //       //this.orchidPrvd.setTransfer(transfer).then(() => {
  //         this.firebasePrvd.payInvoice(this.qrcode)
  //         .then(() => {
  //           this.facture = this.facture.tpePrint(this.invoice)
  //           //this.tpePrint()
  //           this.saveHistory()
  //           this.pushToSuccess()
  //         })
  //       //})
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //       this.loading.dismiss()
  //     })
  //   })
  // }

  tpePrint() {
    // console.log(this.facture)
    this.firebasePrvd.print('test', this.facture).then((resp:any) => {
      console.log(resp)
    }).catch((error) => {
      console.log(error)
    })
  }

  saveHistory() {
    this.firebasePrvd.saveTransaction(this.idTransaction.toString(), this.facture).then((success) => {
      console.log(success)
    }).catch((error) => { 
      console.log(error)
    })
  }

  ionViewCanLeave() {
    this.loading.dismissAll()
    return true
  }

}
