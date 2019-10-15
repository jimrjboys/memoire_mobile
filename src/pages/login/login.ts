import { Component } from '@angular/core';
import { IonicPage, NavController/*, NavParams*/, ToastController, LoadingController, 
  Loading/*, Events*/, MenuController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormPage } from '../../lib/form-page';
import { Constant } from '../../constant';
//import { MemberPage } from '../member/member'
//import { IndividuelPage } from '../individuel/individuel'
import { RegisterPage } from '../register/register'
import { Credential } from '../../lib/credential';
import { AuthProvider } from '../../providers/cyclos/auth';
import { Session } from '../../lib/models/session';
import { BankingPage } from '../banking/banking';
import { Storage } from '@ionic/storage';
import { Config } from '../../config/config';
import { CyclosProvider } from '../../providers/cyclos/cyclos';
import { OrchidProvider } from '../../providers/orchid/orchid';
import { CustomValues } from '../../lib/models/customValues';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends FormPage {

  protected form : FormGroup;
  protected secondPage: any = BankingPage ;
  config = Config;

  constructor(
    public navCtrl: NavController, 
    public menuCtrl: MenuController,
    //public navParams: NavParams,
  	public formBuilder : FormBuilder, 
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    public auth: AuthProvider, 
    private storage: Storage, 
    private orchidPrv: OrchidProvider
  	) {
    super(toastCtrl);

    this.form = formBuilder.group({
      // name: ['', Validators.required],
      password: ['',Validators.required],
      agent: ['']
    });

    //this.storage.remove(Config.SESSION_STO);

  }

  protected rootToSecondPage() {
    this.navCtrl.setRoot(this.secondPage);
  }

  protected session() {
    return new Promise((resolve) => {
      this.storage.get(Config.SESSION_STO).then((session: Session) => {
        if (!session) {
          resolve()
          return
        } 

        CyclosProvider.session = session;

        this.auth.isNotExpired(session).then(() => {
          this.rootToSecondPage();
          resolve()
        }).catch(() => {
          resolve()
        })
        // this.auth.allowed().then((auth: Session) => {
        //   if (auth.permissions.banking) {
        //     this.rootToSecondPage();
        //     resolve();
        //   } else {
        //     resolve();
        //   }
        // }, () => {
        //   resolve();
        // }).catch((error) => {
        //   resolve();
        // });

      }).catch(() => {
        resolve();
      });
    })
  }


  ionViewCanEnter() {
    this.menuCtrl.enable(false)
    return this.session();
  }

  protected presentLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: Constant.loading_label
    });
    loading.present();
    return loading;
  }

  public login() {
    if (this.form.valid) {
      let value = this.form.value;
      if (this.form.value.agent)
        value.name = this.form.value.agent
      let credential = new Credential(value);
      let loading = this.presentLoading();
      this.auth.login(credential).then((session: Session) => {
        CyclosProvider.session = session;
        console.log(session)
        /* validation account orchid-cyclos*/ 
        this.auth.isExistIdOrhid(credential).then((customValues :CustomValues) => {
          console.log(customValues)
          console.log("compte validé")
          this.setStorage(session,loading)
          //this.alert("Compte déja validé")
        }).catch((customValues:CustomValues) => {
          console.log("in erreur")
          this.orchidPrv.isExistAccount(customValues.cin).then((account:any) => {
              console.log(account.idOrchid)
              if(account.status) {
                console.log("ok")
                this.auth.validateAccount(credential, account.idOrchid).then((success) => {
                  console.log(success)
                  this.alert("Votre compte a bien été validé")
                  this.setStorage(session,loading)
                  //loading.dismiss();
                }).catch(error => {
                  //console.log(error)
                  //console.log("Erreur lors de la validation de votre compte")
                  this.alert("Erreur lors de la validation de votre compte")
                  loading.dismiss();
                })
              }else {
                //console.log("Votre compte est en cours de validation")
                this.alert("Votre compte est en cours de validation")
                loading.dismiss();
              }
            }).catch((error) => {
              //console.log(error)
              this.alert("vous n'avez pas encore de compte créez-en un")
              loading.dismiss();
          })
        })
        /* validation account orchid-cyclos */ 
      }).catch((error) => {
        console.error(error);
        loading.dismiss();
      })
    } else {
      this.reportError();
    }
  }

  private setStorage(session,loading) {
    this.storage.set(Config.SESSION_STO, session).then(() => {
      loading.dismiss().then(() => {
        this.rootToSecondPage();
      })
    })
      /*
        CyclosProvider.session = session;
        this.events.publish(Config.LOGIN_EVENT);
      */
  }

  public getMessageError(key: string, validator: string) {
    return Constant.error_empty_field;
  }

  private alert(message:any,title?:any) {
    this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [{
        text: 'OK'
        }]
    }).present()
  }

  public register() {
    this.navCtrl.push(RegisterPage);
  }

  /*ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }*/
}


