import { Http, Headers, RequestOptionsArgs } from '@angular/http';
import { Injectable } from '@angular/core';
import { CyclosProvider } from './cyclos';
import { Observable } from 'rxjs';
import { Credential } from '../../lib/credential';
import { Config } from '../../config/config';
import { Session } from '../../lib/models/session';
import { LoadingController, Loading } from 'ionic-angular';

@Injectable()
export class AccountProvider extends CyclosProvider {

  public static readonly DEFAULT_ACCOUNT_TYPE ="user"
  loading:Loading

  constructor(public http: Http,public loadingCtrl: LoadingController) {
  	super(http);
  }

  protected subResponse($ref: Observable<any>) {
    return new Promise((resolve, reject) => {
      $ref.subscribe((response) => {
        resolve(response.json());
      }, (error) => {
        console.error(error);
        this.manageError(error);
        reject(error);
      })
    })
  }

  getAccountList(credential?: Credential) {

    let headers = new Headers();
    if (credential) {
      headers.append('Access-Control-Allow-Origin', '*');
      headers.append('Authorization', 'Basic ' + credential.getHash());
    }

    //return this.subResponse(this.fetch(CyclosProvider.session.user.id  + '/accounts', 'GET', {}, headers))
    return this.subResponse(this.fetch('self/accounts', 'GET', {}, headers))
  }

  getHistory(session : Session) {
    let header: Headers = this.tokenHeader(new Headers,session.sessionToken)
    let reqOptArg: RequestOptionsArgs = this.defaultRequestOptionArgs(header)
    return new Promise((resolve,reject) => {
      this.presentLoading()
      this.http.get(Config.endpoints.cyclos + "self/transactions", reqOptArg).toPromise().then((response :any) => {
        this.loading.dismiss()
        resolve(response._body)
      }).catch((error) => {
        this.loading.dismiss()
        reject(error)
      })
    })
  }

  getAccountType(session: Session) {
    let header:Headers = this.tokenHeader(new Headers,session.sessionToken)
    
    let reqOptArg:RequestOptionsArgs = this.defaultRequestOptionArgs(header)
    return new Promise((resolve,reject) => {
      this.http.get(Config.endpoints.cyclos + "self/accounts/" + AccountProvider.DEFAULT_ACCOUNT_TYPE, reqOptArg).toPromise().then((response :any) => {
       // console.log(response)
        resolve(response._body)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  protected presentLoading() {
    this.loading =  this.loadingCtrl.create()
    return this.loading.present()
  }

}
