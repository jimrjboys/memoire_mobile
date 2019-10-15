import { Component, Output, EventEmitter } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder,  Validators } from '@angular/forms';
import { Individual } from '../../lib/entities/individual';
import { AuthProvider } from '../../providers/cyclos/auth';
import { User } from '../../lib/models/user';
import { Member } from '../../lib/entities/member';
import { LoginPassword } from '../../lib/entities/loginPassword';

@Component({
  selector: 'info-login',
  templateUrl: 'info-login.html'
})
export class InfoLoginComponent {

  protected form: FormGroup;
  protected formPwd:FormGroup;
  protected id;
  protected customer: Individual = new Individual();
  showPswrd:boolean=false;
  mailexact: boolean=false;
  passwords:any = { password:"", confirm:""};
  public static readonly PASSWORD_LENGTH: number = 4

  @Output() infoLogin = new EventEmitter();


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public frbld:FormBuilder,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private authPrvd: AuthProvider,
    ) {
   

   this.form = formBuilder.group({
      email: ['',Validators.compose([
        Validators.pattern(/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/),
        Validators.required
        ])],
      }, 
     );
    //this.customer = this.navParams.get('customer')
    //this.id = this.navParams.get('id')
  }

  validateInfoLogin() {
    console.log(InfoLoginComponent.PASSWORD_LENGTH)
    console.log(this.passwords)
    if(this.passwords.password=="" || this.passwords.confirm=="")
      this.presentError("Veuillez compléter tous les champs")
    else if(this.passwords.password.length < InfoLoginComponent.PASSWORD_LENGTH) 
      this.presentError('Le mot de passe doit avoir au moins 4 caractères')
    else if(this.passwords.password != this.passwords.confirm)
      this.presentError('Les deux mots de passe ne sont pas identiques');
    else {
      this.customer.password = this.passwords.password
      this.infoLogin.emit(this.customer);
    }
  }

  profil(url) {
    this.customer.url = url
  }

  /*protected matchingPasswords(passwordKey: string, confirmPasswordKey: string)
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
  }*/

  protected createCyclosUser() {
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
  }

  public register() {

    let controls = this.form.controls;
    console.log("ok")
    if (this.form.valid) {
      /*if (!this.customer.url) {
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
              this.presentAlert("Demande envoyée","");
            })
          })
        }).catch(() => {
          this.presentAlert('Erreur de connexion')
          loading.dismiss()
        })
      })*/
    } 

    else if (controls['email']['errors'] && controls['email']['errors']['pattern'])
      this.presentError('Address e-mail invalid!')
    else if (controls['password']['errors'] && controls['password']['errors']['minlength'])
      this.presentError('Le mot de passe doit avoir au moins 4 caractères')
    else if (this.form.get('password').value != this.form.get('confirmPswd').value) 
      this.presentError('Les deux mots de passe ne sont pas identiques');
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

  modify(modify: string) {
    if(modify=="mail"){
      this.showPswrd = false;
    }
  }

  public registermail() {
    let controls = this.form.controls;
    if (this.form.valid) {
      this.customer.email = this.form.controls['email']['value']
      this.showPswrd = true;
    } else if (controls['email']['errors'] && controls['email']['errors']['pattern'])
      this.presentError('Address e-mail invalid!')
  }

 
}
