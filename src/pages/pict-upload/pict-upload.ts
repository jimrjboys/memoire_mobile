import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform, LoadingController } from 'ionic-angular';
//import { CameraProvider } from '../../providers/camera/camera';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { AngularFireDatabase } from 'angularfire2/database';
//import { IndividuelPage } from '../individuel/individuel';
//import { CinPage } from '../cin/cin';
import { Individual } from '../../lib/entities/individual';
//import { timestamp } from 'rxjs/operator/timestamp';
//import { isPresent } from 'ionic-angular/umd/util/util';

@IonicPage()
@Component({
  selector: 'page-pict-upload',
  templateUrl: 'pict-upload.html',
})
export class PictUploadPage {
  icon = {
    url: './assets/icon/profil.png',
    alt: 'icon profile',
    label: 'Selfie'
  }
  cards = {
    both: {
      id: "both",
      name: "CIN Recto",
      icon: "./assets/icon/cin.png"
    },
    sides: {
      id: "sides",
      name: "CIN Verso",
      icon: "./assets/icon/cin-sides.png"
    },
    residence: {
      id: "residence",
      name: "Résidence",
      icon: "./assets/icon/residence.png"
    }
  }


  pict = new Array<string>()
  id: string
  imgHeight: number
  //private info;
  //customer: Customer
  customer: Individual
  showAlertMessage
  saved:boolean = false
  urlCin:any = {
    both : "",
    sides: "",
    residence: ""
  }

  constructor(
    //private cameraPrvd: CameraProvider,
    public loadingCtrl: LoadingController,
    private firebasePrvd: FirebaseProvider,
    private database: AngularFireDatabase,
    private navCtrl: NavController,
    private platform: Platform,
    private navParams: NavParams,
    private alertCtrl: AlertController,
    ) {

    this.platform.ready().then((readySource) => {
      this.imgHeight = platform.height()/3.2
      //this.imgHeight = '200px';
    })
    this.id = this.database.createPushId() + "testtest"
    console.log(this.id)
    //this.info = this.navParams.get('info')*/
    /*this.customer = {
      image_urls: {
        cin: 'test',
        residence: 'test'
      }
    };
    this.firebasePrvd.addCustomer(this.customer);*/
    this.customer =  this.navParams.get('customer')
    console.log('------')
    console.log(this.customer)
  }

  // ionViewWillEnter() {
  //   this.showAlertMessage = true
  //   let pict = this.navParams.get('pict')
  //   if(pict) {
  //     this.pict = pict
  //   }
  // }

  /*takePicture(picture: string) {
    if (picture == 'cin') {
      this.showAlertMessage = false
      this.navCtrl.push(CinPage, { id: this.id, pict: this.pict })
      return;
    }
    this.cameraPrvd.getPicture().then((imageData) => {
      let image = `data:image/jpeg;base64,${imageData}`;
      this.firebasePrvd.storeImage(this.id + '/' + picture, image).then((url) => {
        this.pict[picture] = url
      })
    });
  }*/


  cardBoth(url:any) {
    this.urlCin.both = url
  }

  cardSides(url:any) {
    this.urlCin.sides = url
  }

  cardResidence(url:any) {
    this.urlCin.residence = url
  }

  ionViewWillLeave() {
    //this.navCtrl.getPrevious().data.pict = this.pict;
    //this.navCtrl.getPrevious().data.id = this.id;
    return true;
  }

  submit() {
    this.customer.pict = this.urlCin
    this.saveIfComplete()
    //console.log("ok")
    //console.log(this.customer)
  }

  saveIfComplete(){
    if(this.urlCin.both=="") {
       this.presentAlert("Veuillez remplir tous les dossiers","",false)
      //return false
    }else if(this.urlCin.sides=="") {
       this.presentAlert("Veuillez remplir tous les dossiers","",false)
      //return false
    }else if(this.urlCin.residence=="") {
       this.presentAlert("Veuillez remplir tous les dossiers","",false)
      //return false
    }else {
       this.presentAlert("Voulez-vous confirmer","",true)
      //return true
    }
    // this.presentAlert("Vouler vous confirmer","",true)
    // return true;
  }

  presentAlert(message:string , title:string ="", status:boolean) {
     this.alertCtrl.create({
      title:  title,
      message: message,
      buttons: [{
        text: 'ok',
        handler: () => {
           this.saving(status)
        }
      }]
    }).present();
  }

  saving(status:boolean) {
    if(status) {
      this.firebasePrvd.newCustomer(this.customer).then((succes) => {
        console.log("ok")
        //this.navCtrl.setRoot(BankingPage)
        this.saved = true
      }).catch(error => {
        console.log(error)
      })
    }
  }

  ionViewCanLeave() {
    this.loadingCtrl.create().dismissAll()
    if(this.saved) {
      console.log("true")
    }else {
      if(this.urlCin.both!="") 
        this.firebasePrvd.remove(this.urlCin.both)
      if(this.urlCin.sides!="")
        this.firebasePrvd.remove(this.urlCin.sides)
      if(this.urlCin.residence!="")
        this.firebasePrvd.remove(this.urlCin.residence)
      console.log("true")
    }
    /*if (!this.showAlertMessage)
      return true
    if (!(this.pict['both'] && this.pict['sides'] && this.pict['residence'])) {
      this.alertCtrl.create({
        title:  'Attention',
        message: 'Veuillez remplir tous les dossiers avant de continuer',
        buttons: [{
          text: `Quitter l'application`,
          handler: () => {
            this.platform.exitApp()
          }
        },
        {
          text: 'OK'
        }]
      }).present();
      return false
    } else return true
    */
  }

  save() {
    //console.log(this.info)
    this.navCtrl.pop()
    //this.navCtrl.push(IndividuelPage, { pict: this.pict, id: this.id }))*/
  }

}
