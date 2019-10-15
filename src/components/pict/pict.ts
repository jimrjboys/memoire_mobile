import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CameraProvider } from '../../providers/camera/camera';
import { FirebaseProvider } from '../../providers/firebase/firebase';

@Component({
  selector: 'pict',
  templateUrl: 'pict.html'
})
export class PictComponent {

  @Input() card
	@Input() id : string
  @Input() show : string =""
  @Output() getUrl = new EventEmitter<string>()

  pict = new Array<string>();

  constructor(
    private cameraPrvd: CameraProvider,
    private firebasePrvd: FirebaseProvider,
  	) {
  	//console.log(this.name)
  }
  
  takePicture(picture: string) {
    this.cameraPrvd.getPicture().then((imageData) => {
      let image = `data:image/jpeg;base64,${imageData}`;
      this.firebasePrvd.storeImage(this.id + '/' + picture, image)
      .then((url: string) => {
        this.pict[picture] = url
        this.getUrl.emit(url)
      })
    }).catch(() => {
      console.log('error')
    });
    //this.getUrl.emit("test")
  }
}
