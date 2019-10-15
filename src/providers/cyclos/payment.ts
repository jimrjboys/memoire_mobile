import { Http, Headers, RequestOptionsArgs } from '@angular/http';
import { Injectable } from '@angular/core';
import { CyclosProvider } from './cyclos';
import { Payment } from '../../lib/models/payment';
import { AlertController } from 'ionic-angular';
import { Session } from '../../lib/models/session';
import { Config } from '../../config/config';
import { from } from 'rxjs/observable/from';

@Injectable()
export class PaymentProvider extends CyclosProvider {

  constructor(protected http: Http, private alertCtrl: AlertController) {
  	super(http);
  }

  setTransfer(payment: Payment, credential?:any) {
  	return new Promise((resolve, reject) => {
      // let credential = new Credential({ 
      //   name: Config.credential.fintek.login, 
      //   password: Config.credential.fintek.login
      // })
  		let resource: string = 'self/payments';
      let headers = new Headers();
      headers.append('Access-Control-Allow-Origin', '*');
      headers.append('Authorization', 'Basic ' + credential.getHash());
  		this.fetch(resource, 'POST', payment, headers).subscribe((response) => {
        if (response.status == 201)
  			    resolve(response.json());
        else {
            console.log(response);
            reject();
        }
  		}, (error) => {
  			this.manageError(error);
  			reject(error);
  		})
  	})
  }

  setTransaction(payment: Payment, session: Session) {
    return new Promise((resolve, reject) => {
      let header: Headers = this.tokenHeader(new Headers,session.sessionToken)
      let reqOptArg: RequestOptionsArgs = this.defaultRequestOptionArgs(header)
      this.http.post(Config.endpoints.cyclos + "self/payments", payment ,reqOptArg).toPromise().then((response :any) => {
        resolve(response._body)
      }).catch((error) => {
        this.manageError(error);
        reject(error)
      })
    })
  }

  protected manageError(error) {
    let eBody = error.json();
    if (error.status == 500) {
      if (eBody.code == 'insufficientBalance')
        this.presentAlert("Solde insuffisant")
      else 
      this.presentAlert("Erreur de transfert")
    } else 
      this.presentAlert("Erreur de transfert")
  }

  protected presentAlert(message: string) {
    this.alertCtrl.create({
      title: "Attention",
      message: message,
      buttons: [{
        text: 'OK'
      }]
    }).present()
  }

  // setPayment(session : Session) {
  //   let header: Headers = this.tokenHeader(new Headers,session.sessionToken)
  //   let reqOptArg: RequestOptionsArgs = this.defaultRequestOptionArgs(header)
  //   return new Promise((resolve,reject) => {
  //     this.presentLoading()
  //     this.http.get(Config.endpoints.cyclos + "self/transactions", reqOptArg).toPromise().then((response :any) => {
  //       this.loading.dismiss()
  //       resolve(response._body)
  //     }).catch((error) => {
  //       this.loading.dismiss()
  //       reject(error)
  //     })
  //   })
  // }

}
