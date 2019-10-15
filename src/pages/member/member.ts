import { Component } from '@angular/core';
import { IonicPage, ToastController, AlertController, LoadingController/*, NavParams, NavController*/ } from 'ionic-angular';
//import { IndividuelPage } from '../individuel/individuel';
import { FormPage } from '../../lib/form-page';
import { FormGroup/*, FormBuilder*/, Validators, FormControl } from '@angular/forms';
import { Constant } from '../../constant';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { OrchidProvider } from '../../providers/orchid/orchid';

@IonicPage()
@Component({
  selector: 'page-member',
  templateUrl: 'member.html',
})
export class MemberPage extends FormPage {

  protected form : FormGroup ;
  protected cinValid: boolean = false;

  constructor(
    private firebasPrvd: FirebaseProvider,
//    private formBuilder : FormBuilder, 
    protected toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private orchidProvider: OrchidProvider,
    /*private navCtrl: NavController, public navParams: NavParams*/) {
    super(toastCtrl)

    this.form = new FormGroup({
      phone: new FormControl('', [Validators.required, Validators.maxLength(13), Validators.minLength(13)]),
      cin_number: new FormControl('', [Validators.required]),
    });
  }

  individuel() {
    let controls = this.form.controls;
    if (this.form.valid) 
      this.process()
    else if (controls['phone']['errors'] && controls['phone']['errors']['maxlength']) {
      this.form.value.phone = this.form.value.phone.slice(0, 13)
      this.process()
    }
    else if (controls['phone']['errors'] && controls['phone']['errors']['minlength'])
      this.presentError('Le numéro de téléphone doit avoir au moins 10 chiffres')
    else {
      this.reportError()
    }
  }

  protected process() {
    let value = this.form.value
    /*let spaceNb = 3
    for (let i = spaceNb; i>=0; i--) {
      value.phone = value.phone.replace(' ','');
    }*/

    let loading = this.loadingCtrl.create();

    loading.present()
    this.firebasPrvd.alreadyUsed(value.phone).then((used) => {
      loading.dismiss()
      if (used) {
        this.presentAlert('Numéro téléphone déjà utilisé')
        return
      }      

      let cin = this.form.value.cin_number

      this.orchidProvider.alreadyMember(cin)
      /*this.phoneValid = true

      this.form = new FormGroup({
        phone_valid: new FormControl({value: value.phone, disabled: true}, [Validators.required, Validators.maxLength(13), Validators.minLength(13)]),
        cin_number: new FormControl('', [Validators.required]),
      });*/

    }) 
  }

  protected presentAlert(message: string) {
    this.alertCtrl.create({
      title: 'Attention',
      message: message,
      buttons: [{
        text: 'OK'
      }]
    }).present();
  }

  public getMessageError(key: string, validator: string) {
    return Constant.error_empty_field;
  }

  /*ionViewDidLoad() {
    console.log('ionViewDidLoad MemberPage');
  }*/

}
