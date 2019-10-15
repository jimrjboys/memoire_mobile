import { Component } from '@angular/core';
import { IonicPage/*, NavController, LoadingController, Loading, NavParams*/ } from 'ionic-angular';
/*import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
//import { UpdateProvider } from '../../providers/update/update';
//import { AppVersion } from '@ionic-native/app-version';
import { Config } from '../../config/config';
//import { PictUploadPage } from '../pict-upload/pict-upload';
import { LoginPage } from '../login/login';*/

@IonicPage()
@Component({
  selector: 'page-version',
  templateUrl: 'version.html',
})
export class VersionPage {
/*
  private apk_url;
  //loading: Loading;
  percent: number = 0;

  constructor(
  	public navCtrl: NavController, 
  	/*public navParams: NavParams,
  	private transfer: FileTransfer,
  	private file: File,
  	private fileOpener: FileOpener,
    //private updatePrvd: UpdateProvider,
    //private appVersion: AppVersion,
    //private loadingCtrl: LoadingController
  	) {

    this.navCtrl.setRoot(LoginPage)

    /*this.appVersion.getVersionNumber().then((version) => {
      this.loading = this.loadingCtrl.create({
        enableBackdropDismiss: false
      });
      this.loading.present().then(() => {
        let app_version = Number(version.replace('.', '').replace('.', ''));
        this.updatePrvd.check(app_version).then((update: any) => {
          if (update.available)
            this.download(update.version).then(() => {
              this.loading.dismiss();
            })
          else {
            this.loading.dismiss()
            //this.navCtrl.setRoot(PictUploadPage)
            this.navCtrl.setRoot(LoginPage)
            //alert('No new version available')
          }
        }, (error) => {
          alert(JSON.stringify(error))
        }).catch((error) => {
          alert(JSON.stringify(error))
          this.loading.dismiss();
        })
      })
    })

  }

  install() {
    return this.fileOpener.open(this.apk_url, 'application/vnd.android.package-archive')
  }

  /*download(version: string) {
    return new Promise((resolve) => {
      const fileTransfer: FileTransferObject = this.transfer.create()

      fileTransfer.download(`${Config.apk_beta.url}finpay_beta.v${version}.apk`, this.file.externalCacheDirectory + 'finpay_beta.apk')
      .then((entry) => {
        this.apk_url = entry.toURL();
        this.install().then(() => {
          resolve()
        }, (error) => {
          alert(JSON.stringify(error))
        })
      }, (error) => {
        alert(JSON.stringify(error))
      })

      fileTransfer.onProgress((event) => {
        //alert(JSON.stringify(event))
        this.percent = Math.floor(event.loaded / event.total * 100);

        this.loading.setContent( 'télechargement ' + this.percent.toString() + '%');

      })
    })
  }*/

  /*ionViewDidLoad() {
    console.log('ionViewDidLoad VersionPage');
  }*/

}
