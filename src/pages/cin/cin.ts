import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CameraProvider } from '../../providers/camera/camera';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { Platform } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-cin',
  templateUrl: 'cin.html',
})
export class CinPage {

  pict = new Array<string>()
  id: string
  imgHeight

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
    private cameraPrvd: CameraProvider,
    private firebasePrvd: FirebaseProvider,
    private platform: Platform,
  	) {
    this.platform.ready().then((readySource) => {
      this.imgHeight = platform.height()/3.2
      //this.imgHeight = '200px';
    })
    this.id = this.navParams.get('id');
  	this.pict = this.navParams.get('pict');
  }

  takePicture(picture: string) {
    this.cameraPrvd.getPicture().then((imageData) => {
      let image = `data:image/jpeg;base64,${imageData}`;
      this.firebasePrvd.storeImage(this.id + '/' + picture, image).then((url) => {
        this.pict[picture] = url
      })
    });
  }

  ionViewWillLeave() {
   this.navCtrl.getPrevious().data.pict = this.pict;
  }

}
