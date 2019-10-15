import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Injectable()
export class CameraProvider {

  constructor(
  	private camera: Camera
  	) {
    console.log('Hello CameraProvider Provider');
  }

  public getPicture() {
  	return new Promise((resolve) => {
  		const options: CameraOptions = {
        quality: 20,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        //targetHeight: 1024,
        //targetWidth: 730,
        //targetHeight: 1024,
        //targetWidth: 730,
        cameraDirection: this.camera.Direction.FRONT
      }
      
      this.camera.getPicture(options).then((imageData) => {
      	resolve(imageData);
      });
  	})
  }

}
