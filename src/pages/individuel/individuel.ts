import { Component/*, ViewChild*/ } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder,  Validators } from '@angular/forms';
import { BankcardProvider } from '../../providers/bankcard/bankcard';
import { Card } from '../../entity/card';
import { AngularFireDatabase } from 'angularfire2/database';
//import { SuccessfulPage } from '../successful/successful'
import { LoginPage } from '../login/login'
//import { PictUploadPage } from '../pict-upload/pict-upload'
import { Individual } from '../../lib/entities/individual';
import { AuthProvider } from '../../providers/cyclos/auth';
import { User } from '../../lib/models/user';
import { Member } from '../../lib/entities/member';
import { LoginPassword } from '../../lib/entities/loginPassword';

@IonicPage()
@Component({
  selector: 'page-individuel',
  templateUrl: 'individuel.html',
})

export class IndividuelPage {

  //@ViewChild('birth_date') birthDateInput//: ElementRef;

	protected form: FormGroup;
	//protected genreOptions;
  protected id;
  //protected pict;
  protected customer: Individual;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
  	public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
  	public loadingCtrl: LoadingController,
    private bankcardPrvd: BankcardProvider,
    private authPrvd: AuthProvider,
    private af: AngularFireDatabase
  	) {
  	this.form = formBuilder.group({
      //phone: ['', [Validators.required, Validators.maxLength(13), Validators.minLength(13)]],
      password: ['', Validators.compose([
        Validators.required, 
        Validators.minLength(4)
        ])],
      //cardNumber: ['', [Validators.required,  Validators.minLength(19), Validators.maxLength(19)]],
      /*pin: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      pinConf: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],*/
      confirmPswd:['', Validators.required],
  		/*name: ['', Validators.required],
  		first_name: ['', Validators.required],
  		nickname: [''],
  		birth_date: ['', Validators.required],
  		birth_place: [''],
  		gender: ['', Validators.required],
  		cin_number: ['', Validators.required]*/
    }, { validator : this.matchingPasswords('password', 'confirmPswd') });
  	//}, { validator : this.matchingPin('pin', 'pinConf') });
  	/*this.genreOptions = {
		  title: 'Genre',
		};*/
    //this.id = this.navParams.get('id')
    //this.pict = this.navParams.get('pict')
    /*this.createCyclosUser();
    return*/
    this.customer = this.navParams.get('customer')
    this.id = this.navParams.get('id')
    console.log(this.customer)
    /*this.pict = {
      both: "https://firebasestorage.googleapis.com/v0/b/fin...",
      residence: "https://firebasestorage.googleapis.com/v0/b/fin...",
      sides: "https://firebasestorage.googleapis.com/v0/b/fin..."
    }*/
  }

  profil(url) {
    this.customer.url = url
  }

  /*protected matchingPin(pin: string, pinConf: string)
  {
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[pin];
      let confirmPassword = group.controls[pinConf];
 
      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }*/
  
  protected matchingPasswords(passwordKey: string, confirmPasswordKey: string)
  {
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];
 
      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  /*public openBirthDatePicker() {
    this.birthDateInput.open();
  }*/

 /* protected card() : Card {
    //delete this.form.value.confirmPswd
    //delete this.form.value.pinConf
    let value: Card = this.form.value;
    console.log(value)
    return
    return value
    value.pin = value.pin.slice(0,4);
    let spaceNb = 3
    for (let i = spaceNb; i>=0; i--) {
      value.cardNumber = value.cardNumber.replace(' ','');
      value.phone = value.phone.replace(' ','');
    }
    let card = value;
    card.identifiant = card.phone
    //card.password = card.pin
    card.cardNumber = card.cardNumber.slice(0,16);
    return card;
  }*/

  protected createCyclosUser() {
    //
    let loginPassword = new LoginPassword({
      value : "jotest", 
      confirmationValue: "jotest"
    });
    let user: User = new Member({
      name: "jotest",
      username: "jotest",
      passwords: [loginPassword],
    })
    this.authPrvd.register(user)
    .then((create) => {
      console.log(create)
    })
    return
    //
  }

  public register() {
    let controls = this.form.controls;
    if (this.form.valid) {

      if (!this.customer.url) {
        this.presentError('Capturer votre profil');
        return
      }
      let loading = this.loadingCtrl.create()
      loading.present()

      let ref = 'customer';

      if (this.customer.pict) {
        ref = 'newCustomer'
      }

      let phone = this.customer.phone.split(" ").join("")
      let cin = this.customer.cin.split(" - ").join("")
      let customerRef = `${ref}/${phone}`;
      this.customer.cin = cin
      let card: Card = {
        password : this.form.value.password,
        identifiant: phone,
        phone: phone
      }
      this.bankcardPrvd.save(card).then((saved) => {
        if (!saved) {
          this.presentAlert("Vous êtes déjà inscrit sur FINPAY")
          loading.dismiss()
          return
        }
        delete this.customer.phone

        this.createCyclosUser();

        this.af.object(customerRef).set(this.customer).then(() => {
          this.af.object(`cin/${cin}`).set({ phone: phone }).then(() => {
            loading.dismiss()
            this.navCtrl.setRoot(LoginPage).then(() => {
              //this.navCtrl.push(SuccessfulPage)
              this.presentAlert("Demande envoyée","");
            })
          })
        }).catch(() => {
          this.presentAlert('Erreur de connexion')
          loading.dismiss()
        })
      })
      /*let card = this.card()
      this.bankcardPrvd.alreadyUsed(card.cardNumber).then((carUsed) => {
        if (carUsed) {
          this.presentAlert('Carte déjà utilisé')
          loading.dismiss()
          return
        }
        this.bankcardPrvd.alreadyUsed(card.phone).then((phoneUsed) => {
          if (phoneUsed) {
            this.presentAlert('Numéro téléphone déjà utilisé')
            loading.dismiss()
            return
          }
          this.bankcardPrvd.save(card).then((saved) => {
            if (!saved) {
              loading.dismiss()
              return
            }*/
            /*let objectRef = 'customer/' + this.form.value.phone;
            let customerRef = 'customer/' + this.form.value.phone;
            let newCustomerRef = 'newCustomer/' + this.form.value.phone;
            this.af.database.ref(newCustomerRef).once('value').then((snapshot) => {
              if(snapshot.exists()) {
                loading.dismiss()
                this.presentAlert('Numéro téléphone déjà utilisé')
                return
              }
              this.af.database.ref(customerRef).once('value').then((snapshot) => {
                if(snapshot.exists()) {
                  loading.dismiss()
                  this.presentAlert('Numéro téléphone déjà utilisé')
                  return
                }

                if (this.customer) {
                  this.af.object(customerRef).set(this.customer).then(() => {
                    loading.dismiss()
                    this.navCtrl.setRoot(SuccessfulPage)
                  }).catch(() => {
                    this.presentAlert('Erreur de connexion')
                    loading.dismiss()
                  })
                  return
                }

                loading.dismiss().then(() => {
                  this.navCtrl.push(PictUploadPage, { info : {
                      phone: this.form.value.phone,
                      password: this.form.value.password
                    }
                  })
                })
              })

              /*this.af.object(objectRef).set({
                //phone: card.phone,
                pict: this.pict
              }).then(() => {
                loading.dismiss()
                this.navCtrl.setRoot(SuccessfulPage)
              }).catch(() => {
                this.presentAlert('Erreur de connexion')
                loading.dismiss()
              })*/
            /*})*/
          /*})
        })
      })*/
      /*if (!this.verifyCIN())
        return;
        */
  	} 
    else if (controls['password']['errors'] && controls['password']['errors']['minlength'])
      this.presentError('Le mot de passe doit avoir au moins 4 caractères')
    else if (this.form.get('password').value != this.form.get('confirmPswd').value) 
      this.presentError('Les deux mots de passe ne sont pas identiques');
    /*else if (controls['phone']['errors'] && controls['phone']['errors']['minlength'])
      this.presentError('Le numéro de téléphone doit avoir au moins 10 chiffres')*/
    /*else if (controls['cardNumber']['errors'] && controls['cardNumber']['errors']['minlength'])
      this.presentError('Le numéro de carte bancaire doit avoir au moins 16 chiffres')
    /*else if (controls['pin']['errors'] && controls['pin']['errors']['minlength'])
      this.presentError('Le pin doit avoir au moins 4 chiffres')
    else if (this.form.get('pin').value != this.form.get('pinConf').value) 
      this.presentError('Les codes PIN ne sont pas identiques');*/
    else
      this.presentError("Veuillez compléter tous les champs")
  }

  protected presentError(message: string, duration: number = 3000) {
    this.toastCtrl
      .create({ message : message, duration: duration, position: 'bottom'})
      .present();
  }

  protected presentAlert(message: string, title: string = "Attention") {
    this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [{
        text: 'OK'
      }]
    }).present();
  }

  /*protected verifyCIN() {
    let errorMessages = new Array<string>();
    let errorDurations = new Array<number>();

    let dot_count = 9;
    let cin_count = 12 + dot_count;
    let form_value = this.form.value;
    let cin_number = form_value.cin_number;
    if (cin_number.length != cin_count)
      errorMessages.push("Le numéro CIN doit être de 12 chiffres")

    for (var i = dot_count - 1; i >= 0; i--) {
      cin_number = cin_number.replace(' - ', '');
    }
    let sixst = cin_number[5];
    if (sixst != 1 && sixst != 2) {
      errorMessages.push("Le 6 ème chiffres du numéro CIN doît être égale à 1 ou 2")
      errorDurations.push(5000);
    }

    let genderNumber = {
      Masculin: 1,
      Féminin: 2
    }
    let genderValue = form_value.gender

    if (sixst != genderNumber[genderValue])
      errorMessages.push("Le genre ne correspond pas à la CIN")

    if (errorMessages.length) {
      let key = 0;
      this.presentError(errorMessages[key], errorDurations[key])
      return false
    }
    return true;

  }*/
}
