import { Component, HostListener } from '@angular/core';
import {
  IonicPage, NavController,
  MenuController, ToastController , AlertController , LoadingController , Loading
} from 'ionic-angular';
import { HistoriqueProvider } from '../../providers/historique/historique'
import * as $ from 'jquery';
import { AccountPage } from '../account/account';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { TransferPage } from '../transfer/transfer'
import { RegisterPage } from '../register/register'
//import {AccountDetailPage} from '../account-detail/account-detail'
import { ComptePage } from '../compte/compte';
import { Constant } from '../../constant';
import { Storage } from '@ionic/storage';

export class QRCODETYPE {
  public static readonly qrcodeserver: string = 'q001'
}

@IonicPage()
@Component({
  selector: 'page-banking',
  templateUrl: 'banking.html',
})
export class BankingPage {
  cin:string;
  name : string;
  password : string;
  str: string = ""
  unused: string[] = ['Shift', 'Enter']
  azerty = {
    'BracketLeft': '{',
    'Quote': '"',
    'Semicolon': ':',
    'Comma': ',',
    'BracketRight': '}',
    'Minus': '_'
  }
  qrcode

  ionViewDidEnter() {
    this.qrcode = null
  }


  pushToTransfer() {
    this.navCtrl.push(TransferPage, { qrcode: this.qrcode })
    .then(() => {
      this.str = ""
    })
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {

    if (this.qrcode)
      return

    let keyt = event.key
    let codet = event.code

    if (this.azerty[codet] &&
      this.unused.indexOf(keyt) == -1) {
      this.str += this.azerty[codet]
    } else {
      if (this.unused.indexOf(keyt) == -1) {
        codet = codet.replace('Digit', '')
        if (!isNaN(parseInt(codet)))
          keyt = codet
        else {
          let kb = codet.replace('Key','')
          if (kb.length == 1) {
            if (event.shiftKey)
              keyt = kb.toUpperCase()
            else
              keyt = kb.toLowerCase()
          }
        }
        this.str += keyt
      }
    }
    if (codet == "Enter") {
      try {
        this.qrcode = JSON.parse(this.str)
        this.process()
      } catch(e) {
        this.str = ""
        this.toastCtrl.create({
          message: "Veuillez rescanner svp",
          duration: 2000
        }).present()
        return
      }
    }
  }


  constructor(
    private menuCtrl: MenuController,
    public navCtrl: NavController,
    private barcodeScanner: BarcodeScanner,
    private firebase: FirebaseProvider,
    private toastCtrl: ToastController,
    //private storeuser:Storage,
    public ALERT: AlertController,
    private loadingCtrl: LoadingController,
    public historiqueprovider : HistoriqueProvider,
    ) {
      // this.storeuser.get('name').then((val) => {
      //   this.name = val;
      //   console.log("name =" + this.name);
      // });
      // this.storeuser.get('password').then((val) => {
      //   this.password = val;
      //   console.log("password=" + this.password);
      // });

  }

  ionViewDidLoad(){
    /*this.storeuser.get('credentials').then((cred) => {
    this.historiqueprovider.findUserConnect(cred)
      .subscribe(data=>{
          this.user = data["customValues"][1].stringValue;
          this.storeuser.set('cin',this.user);
          this.storeuser.get('cin').then((cin) => {
                  console.log(cin);
                  this.historiqueprovider.findCompte(cin)
                  .subscribe(user =>{
                        if(user["account"].status == false){
                          this.displayMessage("Message" , "Compte en cours de validation");
                          this.navCtrl.pop();
                        }
                  }, (ex) =>{
                      console.log(ex);
                  });
          });
      },(err) => {
          console.log(err);
      });

    });*/
  }

  ionViewCanEnter() {
    this.menuCtrl.enable(true);
  }

  create_account() {
    this.navCtrl.push(RegisterPage)
  }

  account() {
    this.navCtrl.push(AccountPage);
  }

  historic () {
    //this.navCtrl.push(AccountPage)
  }

  process() {
    if (QRCODETYPE.qrcodeserver == this.qrcode.qr) {
      this.firebase.pushCiid(this.qrcode.fiid)
      .then(() => {})
    } else {
      this.pushToTransfer()
    }
  }

  flash() {
    this.barcodeScanner.scan()
    .then((barcodeData) => {
      this.qrcode = JSON.parse(barcodeData.text)
      this.process()
    })
  }


  show(){
    $('.pCard_card').toggleClass('pCard_on');
    $('.pCard_add i').toggleClass('fa-minus');
  }

  comptesipem(){
      this.navCtrl.push(ComptePage);
  }


  protected presentLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: Constant.loading_label
    });
    loading.present();
    return loading;
  }
}
