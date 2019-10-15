import { Http, Request, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Card } from '../../entity/card';
import { Config } from '../../config/config';
import { Observable } from 'rxjs';

@Injectable()
export class BankcardProvider {

  private url = Config.endpoints.bankcard.url;

  constructor(
    public http: Http,
    private alertCtrl: AlertController,
    ) {
  }

  public save(card: Card) : Promise<boolean> {
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      Object.keys(card).forEach((key) => {
        formData.append(key, card[key]);
      })
      this.request(this.url + 'card/add', formData, 'POST').subscribe((saved) => {
        if (saved.json().status == 201)
          resolve(true)
        else {
          this.presentError()
          resolve(false)
        }
      }, (error) => {
        this.presentError();
        reject()
      })
    })
  	/*this.http
    .request(new Request(new RequestOptions({
      method: 'POST',
      url: url,
      body: formData,
      headers: new Headers({'X-AUTH-TOKEN': Config.endpoints.bankcard.token })
    })))
    //.post(this.url, formData)
    .map(() => {})
    .subscribe((response) => {
      console.log(response);
    }, (error) => {
      this.alertCtrl.create({
        title: 'Erreur',
        message: 'Erreur liée probablement au serveur. \n ' + 
        'Veuillez réessayer ultérieurement',
        buttons: [{
          text: 'OK'
        }]
      }).present();
    })*/
  }

  protected request(url: string, body: any = null, method: string = 'GET') : Observable<any>{
    return this.http
    .request(new Request(new RequestOptions({
      method: method,
      url: url,
      body: body,
      headers: new Headers({'X-AUTH-TOKEN': Config.endpoints.bankcard.token })
    })))
    /*.map((response) => { response = response.json() }, (error) => {
      this.alertCtrl.create({
        title: 'Erreur',
        message: 'Erreur liée probablement au serveur. \n ' + 
        'Veuillez réessayer ultérieurement',
        buttons: [{
          text: 'OK'
        }]
      }).present();
    })*/

  }

  public alreadyUsed(number: string) : Promise<boolean> {
    let type = 'phone';
    if (number.length > 10)
      type = 'number'
    return new Promise((resolve, reject) => {
      this.request(this.url + `card/${type}/` + number ).subscribe((response) => {
        let status = response.json().status
        let used: boolean = true
        if (status == 204)
          used = false
        
        resolve(used)
      }, (error) => {
        this.presentError()
        reject()
      })
    })
  }

  protected presentError() {
    this.alertCtrl.create({
      title: 'Erreur',
      message: 'Erreur liée probablement au serveur. \n ' + 
      'Veuillez réessayer ultérieurement',
      buttons: [{
        text: 'OK'
      }]
    }).present();
  }

}
