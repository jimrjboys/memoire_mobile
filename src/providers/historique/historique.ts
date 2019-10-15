import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credential } from '../../lib/credential';

/*
  Generated class for the HistoriqueProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HistoriqueProvider {

  url = "http://192.168.1.165:8080/cyclos/api/self/accounts/user/history";
  urlTransac = "http://192.168.1.165:8080/cyclos/api/transactions/";
  userFindUser = "http://192.168.1.165:8080/cyclos/api/users/self";

  //api MiniOrchid
  urlorchid = "http://192.168.1.165/miniOrchid/app/account/api/cin"
  constructor(
    public http: HttpClient,
    ) {
    console.log('Hello HistoriqueProvider Provider');
  }

  getHistorique(credential:string){
    let header = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Authorization': 'Basic ' +credential
    });
    return this.http.get(this.url,{headers:header});
  }

  transactionid(credential: Credential , idtransac:string){
    let header = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Authorization': 'Basic ZmFuYW1iaW5hbnRzb2E6YW5kcnk='
    });

    return this.http.get(this.url+""+idtransac , {headers:header});
  }

  findUserConnect(credential:string){
    let header = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Authorization': 'Basic ' +credential
    });
    return this.http.get(this.userFindUser,{headers:header});
  }

  findCompte(cin:string){
    return this.http.get(this.urlorchid+"/"+cin);
  }



}
