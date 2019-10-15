import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Account } from '../../lib/models/account';
import { Session } from '../../lib/models/session';
import { AccountProvider } from '../../providers/cyclos/account';

export interface Histories {
    amount?: string,
    currency?: string,
    description?: string,
    type?:{
      internalName?:string,
      name?:string
    },
    transition?:{
      id?: string
    },
    relatedKind? :string,
    relatedUser: {
      display?:string
    }
}

@IonicPage()
@Component({
  selector: 'page-account-detail',
  templateUrl: 'account-detail.html',
})
export class AccountDetailPage {

  accounts: [Account];
  idAgent : string;
  histories;
  historiesRefresh;
  searchDescription: string = ""
  searchDate: string = ""
  session: Session
  availableBalance: string
  
  historiess:[Histories]

  constructor(
    public accountPrvd: AccountProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.accountPrvd.getHistory(this.session).then((response : [Histories]) => {
      this.historiess = response
      console.log(this.historiess)
    }).catch((error) => {
      console.log(error)
    })
  }

  ionViewCanEnter() {
    this.session = this.navParams.get('session')
    this.availableBalance = this.navParams.get('availableBalance')
    console.log(this.session.sessionToken)
    if (!this.session)
      return false
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

}
