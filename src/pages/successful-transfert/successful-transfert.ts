import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Payment } from '../../lib/models/payment';
import { PrintProvider } from '../../providers/print/print';
import { BankingPage } from '../banking/banking';
import { Bill } from '../../lib/models/bill';
import { CyclosProvider } from '../../providers/cyclos/cyclos';
// import { Uid } from '@ionic-native/uid';
// import { AndroidPermissions } from '@ionic-native/android-permissions';
// import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Invoice } from '../../lib/models/invoice'
import { InvoicePrint } from '../../lib/models/invoicePrint'
// import { database } from 'firebase';

@IonicPage()
@Component({
  selector: 'page-successful-transfert',
  templateUrl: 'successful-transfert.html',
})
export class SuccessfulTransfertPage {

  payment: Payment;
	billDetail: Bill;
  session;
  frMounth = ['Janvier','Fevrier','Mars','Avril','Mais', 'Juin', 'Juillet','Août','Septembre','Novembre','Décembre']
  hasPermission: boolean;
  permissionRequested: boolean;
  invoice : Invoice = new Invoice()
  mac: string;
  facture : InvoicePrint ;

  constructor(
    //private fire:FirebaseProvider,
    //private alertCtrl:AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    protected printPrvd: PrintProvider,
    //private uid: Uid,
    /*private androidPermissions: AndroidPermissions*/) {
    this.payment = this.navParams.get('payment');
    this.invoice = this.navParams.get('invoice')
  	this.billDetail = this.navParams.get('billDetail');
    this.session = CyclosProvider.session;
  }

  public print() {
  	this.printPrvd.print(this.payment, this.billDetail);
  }

  public ok() {
  	this.navCtrl.setRoot(BankingPage)
  }
  
  // public returnLogin(){
  //   this.navCtrl.push(LoginPage)
  // }
  

  /*tpePrint() {
    this.facture = this.facture.tpePrint(this.invoice)
    this.fire.print('test', this.facture).then((resp:any) => {
      console.log(resp)
    }).catch((error) => {
      console.log(error)
    })
  }*/

  /*async ngOnInit() {
    const { hasPermission } = await this.androidPermissions.checkPermission(
      this.androidPermissions.PERMISSION.READ_PHONE_STATE,
    );
    this.hasPermission = hasPermission;
    this.mac = this.uid.MAC;
  }
  
  async getPermission() {
    const result = await this.androidPermissions.requestPermission(
      this.androidPermissions.PERMISSION.READ_PHONE_STATE,
    );
  
    if (!result.hasPermission) {
      throw new Error('Permissions required');
    }
    this.permissionRequested = true;
  }*/
}
