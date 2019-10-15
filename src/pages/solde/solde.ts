import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HistoriqueProvider } from '../../providers/historique/historique'
//import { Credential } from '../../lib/credential';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the SoldePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-solde',
  templateUrl: 'solde.html',
})
export class SoldePage {

  accounts : any;
  login:string;
  password:string;
  credential:any;
  solde : any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public historiqueprovider : HistoriqueProvider,
    private storeuser:Storage
    ) {
     }

  ionViewDidLoad() {
    this.storeuser.get('credentials').then((cred) => {
      this.credential = cred;
      this.historiqueprovider.getHistorique(this.credential)
          .subscribe(data=>{
            this.accounts = data;
            console.log(this.accounts);
        },(err) => {
          console.log(err);
        });
    });

  }

  backcompte(){
     this.navCtrl.pop();
  }

}
