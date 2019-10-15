import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Platform ,AlertController, AlertOptions, Alert } from 'ionic-angular';

@Injectable()
export class NetworkProvider {

  private alert: Alert;

  constructor(private network: Network, private alertCtrl: AlertController, private platform: Platform,
    private diagnostic: Diagnostic) {}

  public checkConnection() {
    this.network.onDisconnect().subscribe(() => {
      console.log('disconnect');
  	  let alertOption: AlertOptions = {
        title: 'Erreur de connexion',
  	    message: 'Verifier votre connection avant de continuer',
  	    enableBackdropDismiss: false,
  	    buttons: [{
  	  	  text: 'Paramètre',
          handler: () => this.diagnostic.switchToWirelessSettings()
  	    },
  	    {
  	  	  text: 'Quitter',
  	  	  handler: () => this.platform.exitApp()
  	    }]
  	  }
      if (!this.alert) {
    	  this.alert = this.alertCtrl.create(alertOption);
        this.alert.present();
      }
    });
    this.network.onConnect().subscribe(() => {
      console.log('connected');
      this.alert.dismiss();
      this.alert = null
    })
  }

}
