import { FormGroup } from '@angular/forms';
import { ToastController } from 'ionic-angular';

export abstract class FormPage {
  
  protected abstract form: FormGroup;
  error: boolean = false;

  public constructor(protected toastCtrl: ToastController) {}
  
  public validate(key) {
    let validators = ['required', 'pattern', 'minlength'];
    let control: any = this.form.controls[key];
    for (let validator of validators) {
      if (control.hasError(validator)) {
        this.error = true;
        this.presentError(this.getMessageError(key,validator));
      }
    }
  }

  public reportError() {
    for (var key in this.form.value) {
      this.validate(key);
      if (this.error) {
        this.error = false;
        break;
      }
    }
  }

  public getMessageError(key?: string, validator?: string): string {
    return '';
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

  
}