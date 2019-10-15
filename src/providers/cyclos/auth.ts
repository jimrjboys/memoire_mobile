import { Injectable } from '@angular/core';
import { Headers, RequestOptionsArgs, ResponseContentType } from '@angular/http';
import { Credential } from '../../lib/credential';
import { User } from '../../lib/models/user';
import { CyclosProvider } from './cyclos';
import { AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { CustomValues } from '../../lib/models/customValues';
import { Session } from '../../lib/models/session';
import { Config } from '../../config/config';

@Injectable()
export class AuthProvider extends CyclosProvider {

  private static ORCHID_ACCOUNT_FIELD  = "orchid_account"
  private static CIN_FIELD = "cin"
  private static URL = "http://frhb12419ds.ikexpress.com:5788/cyclos/"

  constructor(protected http: Http, private alertCtrl: AlertController) {
    super(http)
  }

  protected session_resource: string = 'auth/session';

  public logout() {
    return new Promise((resolve, reject) => {
      this.fetch(this.session_resource, 'DELETE').subscribe((response) => {
        if (response.status == 200)
            resolve();
        else
            reject();
      },(error) => {
        console.error(error);
        reject();
      })
    });
  }

  public allowed() {
    return new Promise((resolve, reject) => {
      this.fetch('auth', 'GET').subscribe((response) => {
        if (response.status == 200) 
            resolve(response.json());          
        else
            reject();

      }, (error) => {
        this.manageError(error);
        reject(error);
      })
    });
  }

  protected presentAlert(message: string) {
    this.alertCtrl.create({
      message: message,
      buttons: [{
        text: "OK"
      }]
    }).present()
  }

  public login(credential: Credential) {
    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Access-Control-Allow-Origin', '*');
      headers.append('Authorization', 'Basic ' + credential.getHash());

      this.fetch('auth/session', 'POST', { timeoutInSeconds : 300 }, headers)
      .subscribe((response) => {
        if (response.status == 200)
            resolve(response.json())
      }, (error) => {
        this.manageError(error);
        switch (error.status) {
          case 401:
              let eBody = error.json();
              if (eBody.code == "login") {
                    if (eBody.passwordStatus) {
                      if (eBody.passwordStatus == 'temporarilyBlocked')
                        this.presentAlert('Votre compte est temporairement bloqué, veuillez réessayer plus tard');
                    } else this.presentAlert('Numéro ou mots de passe incorrect');
              } else
                  this.presentAlert('L\'application n\'est pas autorisé à se connecter');
            break;
          case 0:
            this.displayErrorConnectingServer();
            break;
        }
        reject(error);
      })
  	});
  }

  public register(user: User) {
    console.log(user);
    return new Promise((resolve, reject) => {
      this.fetch('users', 'POST', user, new Headers()).subscribe((response) => {
        resolve(response);
      },(error) => {
        this.manageError(error);
        console.error(error);
        switch (error.status) {
          case 422:
              let json = error.json();
              let propertyE = json.propertyErrors;
              let firstEMessage: string = "Unknown error";
              if (propertyE) {
                let firstEKey = Object.keys(propertyE)[0];
                firstEMessage = propertyE[firstEKey];
              } else {
                let customFieldErrors = json.customFieldErrors;
                if (customFieldErrors) {
                  let key = Object.keys(customFieldErrors)[0];
                  firstEMessage = customFieldErrors[key];
                } 
              }
              reject(firstEMessage);
            break;
          case 0:
              this.displayErrorConnectingServer();
            break;
        }
      })
    });
  }

  public validateAccount(credential: Credential, orchidAccount?:string) {
    return new Promise((resolve,reject) => {
      this.getVersion(credential).then(version => {
        console.log(version)
        this.putOrchidId(credential,version,orchidAccount).then((response) => {
          resolve(response)
        }).catch((error) => {
          reject(error)
        })
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  }

  private putOrchidId(credential: Credential,version:any, orchidAccount:string) {
    let user:User = {
      customValues: {
        orchid_account:orchidAccount
      },
      version:version
    }
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Authorization', 'Basic ' + credential.getHash());
    return new Promise((resolve,reject) => {
      this.http.put(AuthProvider.URL + "/api/users/self", user,this.defaultRequestOptionArgs(headers))
        .toPromise()
        .then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
      })
    }) 
  }

  private getVersion(credential: Credential) {
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Authorization', 'Basic ' + credential.getHash());
    let reqOptArg: RequestOptionsArgs = {
      responseType:ResponseContentType.Json,
      headers: headers
    };
    
    return new Promise((resolve,reject) => {
      this.http.get(AuthProvider.URL +"/api/users/self/data-for-edit", reqOptArg).toPromise().then((response :any) => {
       // console.log(response)
        resolve(response._body.user.version)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  private defaultHeaders(credential:Credential) {
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Authorization', 'Basic ' + credential.getHash());
    return headers
  }

  public isExistIdOrhid(credential:Credential,idOrchid?:string) {
    return new Promise((resolve,reject) => {
      let query : string = "?fields=customValues.field.internalName,customValues.stringValue"
      this.http.get(AuthProvider.URL + "/api/users/self" + query,
      this.defaultRequestOptionArgs(this.defaultHeaders(credential)))
      .toPromise().then((response :any) => {
        let array: any= response._body.customValues
        let customValues:CustomValues = {};
        array.forEach(element => {
          console.log(element.stringValue)
          if(element.field.internalName == AuthProvider.ORCHID_ACCOUNT_FIELD)
            customValues.orchid_account = element.stringValue
          if(element.field.internalName == AuthProvider.CIN_FIELD)
            customValues.cin = element.stringValue
        });
        console.log(customValues)
        if(customValues.orchid_account) {
          console.log("id oui")
          resolve(customValues)
        }else
          reject(customValues) 
      }).catch((error) => {
        reject(error)
      })
    })
  }

  public isNotExpired(session :Session) {
    let header:Headers = this.tokenHeader(new Headers,session.sessionToken)
    let reqOptArg:RequestOptionsArgs = this.defaultRequestOptionArgs(header)
    return new Promise((resolve,reject) => {
      this.http.get(Config.endpoints.cyclos + "auth", reqOptArg).toPromise().then((response :any) => {
       // console.log(response)
        resolve(response._body)
      }).catch((error) => {
        let message = "Votre session actuelle a expiré. veuillez vous reconnecter pour continuer."
        this.alertCtrl.create({
          message: message,
          buttons: [{
            text: "OK",
            handler:() => {
              reject(error)
            }
          }]
        }).present()
      })
    })
  }

  public isValideField(field:string, value:string) {
    return new Promise((resolve,reject) => {
      let reqOptArg: RequestOptionsArgs = {
        responseType:ResponseContentType.Text
      };

      this.http.get(Config.endpoints.cyclos + "users/validate/members/"+ field +"?value="+ value, reqOptArg).toPromise().then((response :any) => {
       // console.log(response)
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  }

}
