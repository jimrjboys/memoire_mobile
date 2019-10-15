import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Session } from '../../lib/models/session';
import { Account } from '../../lib/models/account';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { Credential } from '../../lib/credential';
import { StorageProvider } from '../../providers/storage/storage'
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { InvoicePrint } from '../../lib/models/invoicePrint'

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  accounts: [Account];
  idAgent : string;
  histories;
  historiesRefresh;
  facture: InvoicePrint  = new InvoicePrint()
  searchDescription: string = ""
  searchDate: string = ""

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public storagePrvd: StorageProvider,
    public fire: FirebaseProvider) {
  }

  ionViewDidLoad() {
    this.storagePrvd.getSession().then((session :Session)=>{
      console.log(session)
      console.log("ok")
      this.idAgent = session.user.id
      this.getAccountHistories().then((histories)=> {
        this.histories = histories;
        this.historiesRefresh = this.histories;
      }).catch((error)=>{
        console.log(error)
      })
    }).catch((error)=>{
      console.log(error)
    })
  }

  protected missingAuthorization() {
		this.navCtrl.setRoot(LoginPage);
  }

  filter() {
    let date  = new Date(this.searchDate)
    let data:any = new Array();
    if(this.searchDate =="" && this.searchDescription) {
      Object.keys(this.histories).forEach((element) => {
        if(this.histories[element].description.includes(this.searchDescription)) 
          data.push(this.histories[element])
      });
    }else if(this.searchDate && this.searchDescription =="") {
      Object.keys(this.histories).forEach((element) => {
        let aDate = new Date(this.histories[element].date)
        if(aDate.toLocaleDateString().includes(date.toLocaleDateString())) 
          data.push(this.histories[element])
      });
    }else {
      console.log("desc and search")
      Object.keys(this.histories).forEach((element) => {
        if(this.histories[element].description.includes(this.searchDescription)) {
          let aDate = new Date(this.histories[element].date)
          if(aDate.toLocaleDateString().includes(date.toLocaleDateString())) {
            data.push(this.histories[element])
          }
        }
      });
    }

  if(data.length > 0 ) {
      this.historiesRefresh = data
    } else if(this.searchDescription == "" && this.searchDate == "") {
      this.historiesRefresh = this.histories
    } else
      this.historiesRefresh = data;
  }

  tpePrint(facture : InvoicePrint) {
    this.fire.print('test', facture).then((resp:any) => {
      console.log(resp)
    }).catch((error) => {
      console.log(error)
    })
  }

  private getAccountHistories(credential?:Credential) {
    return new Promise((resolve,reject) => {
      
    })
  }
}
