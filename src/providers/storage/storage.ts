import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Config } from '../../config/config'
import { Session } from '../../lib/models/session';
import { LoginPage } from '../../pages/login/login';
import { App } from 'ionic-angular';
import { AuthProvider } from '../cyclos/auth';

@Injectable()
export class StorageProvider {
  constructor(public storage: Storage, public app: App, public authPrvd: AuthProvider) {
  }

  getSession() {
    return new Promise((resolve,reject) => {
      this.storage.get(Config.SESSION_STO).then((session: Session) => {
        this.authPrvd.isNotExpired(session).then((response) => {
          resolve(session)
        }).catch((error) => {
          this.logOut()
          reject(error)
        })
      }).catch((error) => {
        console.log(error)
        reject(error)
      });
    })
  }

  removeSession() {
    return new Promise((resolve,reject) => {
      this.storage.remove(Config.SESSION_STO).then((success)=>{
        resolve(success)
      }).catch((error) => {
        reject(error)
      })  
    })
  }

  public logOut() {
    return new Promise((resolve,reject) => {
      var nav = this.app.getRootNav();
       this.removeSession().then(() => {
        nav.setRoot(LoginPage)
        resolve(true)
       }).catch(() =>{
        nav.setRoot(LoginPage)
        reject()
       })
    })
  }

}
