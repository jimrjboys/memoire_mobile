import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { Session } from '../../lib/models/session';
import { StorageProvider } from '../../providers/storage/storage';
import { Account } from '../../lib/models/account';
import { AccountProvider } from '../../providers/cyclos/account';
import { AccountDetailPage } from '../account-detail/account-detail';

@IonicPage()
@Component({
  selector: 'page-compte',
  templateUrl: 'compte.html',
})
export class ComptePage {

  availableBalance: string
  currency: string
  loading:Loading
  session :Session
  constructor(
    private loadingCtrl: LoadingController,
    public accountPrd: AccountProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public storagePrvd: StorageProvider
    ) {
      
  }

  ionViewDidLoad() {
    this.presentLoading()
    this.storagePrvd.getSession().then((session :Session) => {
      console.log("response", session)
      this.accountPrd.getAccountType(session).then((account:Account) => {
        this.session = session
        this.currency =  account.currency.name
        this.availableBalance = account.status.availableBalance
        this.loading.dismiss()
      }).catch((error) => {
        console.log(error)
        this.loading.dismiss()
      })
    }).catch((error) => {
      console.log(error)
      this.loading.dismiss()
    })
  }

  account() {
    this.navCtrl.push(AccountDetailPage, { session: this.session , availableBalance : this.availableBalance})
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
