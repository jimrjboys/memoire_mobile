import { Component, OnInit } from '@angular/core';
import { IonicPage, ToastController, LoadingController, 
  AlertController, NavController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { OrchidProvider } from '../../providers/orchid/orchid';
import { PictUploadPage } from '../pict-upload/pict-upload';
//import { IndividuelPage } from '../individuel/individuel';
import { Individual } from '../../lib/entities/individual';
import { /*FormControl,*/ FormGroup/*, Validators */} from '@angular/forms';
import { AuthProvider } from '../../providers/cyclos/auth';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage implements OnInit {
  signupform: FormGroup;
  id : string ;
  userData = { "email": ""};

  icon = {
    url: './assets/icon/folders.png',
    alt: 'icon folders',
    //label: 'Selfie'
  }

  ngOnInit() {
  }

	protected customer: any = {
    phone: '',
    //phone: '0347442059',
    cin: '',
    //cin: '101081057023',
    account: '',
    //account: '0002500166',
    email:'',
  };
  protected phoneValid: boolean = false;
  protected emailValid:boolean = false;
  protected cinValid: boolean = false;
  protected accountValid: boolean = false;
	protected newCustomer: boolean = false;

  constructor(
    private auth:AuthProvider,
    private firebasPrvd: FirebaseProvider,
    private loadingCtrl: LoadingController,
  	private toastCtrl: ToastController,
    private orchidProvider: OrchidProvider,
    private alertCtrl: AlertController,
  	private navCtrl: NavController/*, 
    private navParams: NavParams*/) {
  }

  infoLogin(infoLogin :any) {
    console.log(infoLogin);
    let individual:Individual = new Individual();
    console.log(this.customer)
    individual.setCin(this.customer.cin, true)
    individual.email = infoLogin.email
    individual.password = infoLogin.password
    individual.setPhone(this.customer.phone,true)

    let isCustomerRef = FirebaseProvider.CUSTOMER_REF + "/" + individual.phone
    this.firebasPrvd.notExistRef(isCustomerRef).then(() => {
      this.navCtrl.push(PictUploadPage, { customer :individual })
    }).catch(() => {
      //do nothing
    })
  }


  // ngOnInit() {
  //   let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
  //   this.signupform = new FormGroup({
      
  //     email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
  //   });
  // }

  // profile() {
  //   if (!this.customer.account)
  //     delete this.customer.account
  //   this.navCtrl.push(IndividuelPage, { customer: this.customer, id: this.id })
  // }

  validateAccount() {
    //if (this.customer.account.length < 11) {
    if (this.customer.account.length < 10) {
      this.presentError('Le numéro de compte doit avoir au moins 10 chiffres')
      //this.presentError('Le numéro de compte doit avoir au moins 11 chiffres')
      return
    }

    let cin = this.customer.cin.split(" - ").join("")

    let loading = this.loadingCtrl.create();

    loading.present()

    this.orchidProvider
    .valideAccount(cin, this.customer.account)
    .then((valid) => {
      loading.dismiss()
      console.log(valid)
      if (!valid) {
        this.presentAlert('Compte invalide', 'Erreur')
        return
      }

      this.accountValid = true

    })
  }

  modify(item: string) {
    this[item + 'Valid'] = false
    this.cinValid = false
    this.newCustomer = false
  }

  verifyLength(item: string) {
    switch (item) {
      case "phone":
        if (this.customer.phone.length > 13) {
          this.customer.phone = this.customer.phone.slice(0, 13)
        }

        break;

      case "cin":
        if (this.customer.cin.length > 21) {
          this.customer.cin = this.customer.cin.slice(0, 21)
        }
        break;

      case "account":
        /*if (this.customer.account.length > 11) {
          this.customer.account = this.customer.account.slice(0, 11)
        }*/
        if (this.customer.account.length > 10) {
          this.customer.account = this.customer.account.slice(0, 10)
        }
        break;
    }
  }

  folders() {
    this.navCtrl.push(PictUploadPage, { pict: this.customer.pict })
  }

  validate(item: string) {
  	let func = 'validate' + item
  	this[func]()
  }
  validateEmail(){
     if (this.customer.email.valid){
       this.presentError('Le numéro CIN doit avoir au moins 12 chiffres')
        return
     }
  }

  validateCin() {
   
    let customer_cin = this.customer.cin;
    let sixSt = customer_cin[8];

    if (sixSt != 1 && sixSt !=2) {
      this.presentError('Le 6 ème chiffre du numéro CIN doît être égale à 1 ou 2')
      return
    }

    let onest = customer_cin[0];

    if (onest < 1  || onest > 6) {
    this.presentError('Le 1 ère chiffre du numéro CIN doît être entre 1 et 6')
    return
    }

    if (this.customer.cin.length < 21) {
      this.presentError('Le numéro CIN doit avoir au moins 12 chiffres')
      return
    }

    this.auth.isValideField("cin",customer_cin.split(" - ").join("")).then((response:any) => {
      console.log("success")
      console.log(response)
      console.log(response.status)
      if(response.status == 200) {
        console.log(response._body)
        this.presentError(response._body)
        return
      }else{
        this.cinValid = true
        this.newCustomer = true
      }
    })

    // this.already().then((used) => {

    //   if (used) {
    //     this.presentAlert('CIN déjà utilisé')
    //     return
    //   }
      

    //   let loading = this.loadingCtrl.create();

    //   loading.present()
    //   .then(() => {
    //     var validCin = this.customer.cin.slice(0, 21)

    //     let nbSpace = 3

    //     for (var i = nbSpace - 1; i >= 0; i--) {
    //       validCin = validCin.replace(' - ', '')
    //     }

    //     ///this.orchidProvider.alreadyMember(validCin).then((used) => {
    //       let used = false
           //this.cinValid = true
    //       loading.dismiss()
    //       if (!used) {
             //this.newCustomer = true
    //         return
    //       }

    //       this.presentAlert('Veuillez saisir votre numéro de compte', 
    //         'Vous avez déjà un compte SIPEM')

    //     //})
    //   })
    // })


  }

  // already() {
  //   return new Promise((resolve) => {
  //     this.firebasPrvd.alreadyUsed(this.customer)
  //     .then(() => {
  //       let individual = new Individual(this.customer)
  //       this.orchidProvider.alreadyMember(individual)
  //       .then((member) => {
  //         if (member)
  //           resolve(true)
  //         else
  //           resolve(false)
  //       })
  //     })
  //   })
  // }
   validatePhone() {

     let phon_number = this.customer.phone;
     let oneSt = phon_number[0];
     let twoSt = phon_number[1];

   if (oneSt != 0 || twoSt != 3)
    {

      this.presentError('Le numéro de téléphone commence par 03')
        return
     }

  	if (this.customer.phone.length < 13) {
      this.presentError('Le numéro de téléphone doit avoir au moins 10 chiffres')
      return
    }
    console.log(phon_number.split(" ").join(""))
    this.auth.isValideField("username",phon_number.split(" ").join("")).then((response:any) => {
      console.log("success")
      console.log(response)
      console.log(response.status)
      if(response.status == 200) {
        console.log(response._body)
        this.presentError('Le numéro de téléphone ou ' + response._body)
        return
      }else{
        this.phoneValid = true
      }
    })

    // this.customer.phone = this.customer.phone.slice(0, 13)

    // let loading = this.loadingCtrl.create();

    // loading.present()

    // this.already().then((used) => {
    //   loading.dismiss()
    //   if (used) {
    //     this.presentAlert('Numéro téléphone déjà utilisé')
    //     return
    //   }      
      // this.phoneValid = true
    // }) 
  }

  protected presentAlert(message: string, title: string = 'Attention') {
    this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [{
        text: 'OK'
      }]
    }).present();
  }

  public presentError(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom',
    });

    toast.onDidDismiss(() => {
      
    });

    toast.present();
  }


  ionViewWillEnter() {
    /*let pict = this.navParams.get('pict')
    this.id = this.navParams.get('id')
    if(pict) {
      this.customer.pict = pict
      this.accountValid = true
    }*/
  }

  login(){
    this.navCtrl.pop();
  }

  return() {
    this.navCtrl.pop();
  }

  /*ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }*/

}
