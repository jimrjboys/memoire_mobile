import { Component } from '@angular/core';
import { Platform, ModalController, App } from 'ionic-angular';
//import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NetworkProvider } from '../providers/network/network';
import { AuthProvider } from '../providers/cyclos/auth';
//import { RegisterPage } from '../pages/register/register';
import { SplashPage } from '../pages/splash/splash';
//import { IndividuelPage } from '../pages/individuel/individuel';
import { LoginPage } from '../pages/login/login';
// import { VersionPage } from '../pages/version/version';
// import { MemberPage } from '../pages/member/member';
// import { PictUploadPage } from '../pages/pict-upload/pict-upload';
// import { ScreenOrientation } from '@ionic-native/screen-orientation';
// import { TransferPage } from '../pages/transfer/transfer';
//import { BankingPage } from '../pages/banking/banking';
//import { PictUploadPage } from '../pages/pict-upload/pict-upload';
// import { ExchangePage } from '../pages/exchange/exchange';
// import {SuccessfulPage} from '../pages/successful/successful';
// import { SuccessfulTransfertPage } from '../pages/successful-transfert/successful-transfert';
// import { TransferFeesPage } from '../pages/transfer-fees/transfer-fees';
//import { Storage } from '@ionic/storage';
import { StorageProvider } from '../providers/storage/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = LoginPage
  splashPage = SplashPage

  constructor(platform: Platform,
    //statusBar: StatusBar,
    splashScreen: SplashScreen,
    networkPrvd: NetworkProvider,
    private app: App,
    private authPrvd: AuthProvider,
    //private authPrvd: AuthProvider,
    private modalCtrl: ModalController,
    private storagePrvd: StorageProvider
    ) {
    // this.presentSplash();
    networkPrvd.checkConnection()
    platform.ready().then(() => {
      splashScreen.hide();
    });
  }

  presentSplash() {
    let splash = this.modalCtrl.create(SplashPage);
    splash.present();
    return splash;
  }

  logout() {
     this.storagePrvd.logOut()
    // this.authPrvd.logout().then(() => {
    //   // this.app.getActiveNav().setRoot(LoginPage);
    //    var nav = this.app.getRootNav()
    //    nav.setRoot(LoginPage)
    //  }).catch((error) => {
    //    console.log(error)
    //  })
  }
}

