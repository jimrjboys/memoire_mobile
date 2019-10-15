import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { CyclosProvider } from './cyclos';
import { Config } from '../../config/config';
import { Headers } from '@angular/http';
import { LoadingController, ToastController } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

@Injectable()
export class ImageProvider extends CyclosProvider {

  constructor(protected http: Http,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private transfer: FileTransfer) {
  	super(http);
  }

  public deleteImage(id:any) {
    return new Promise((resolve, reject) => {
      this.fetch('images/' + id , 'DELETE', '', new Headers()).subscribe((response) => {
        resolve(response);
      },(error) => {
        switch (error.status) {
          case 422:
              let propertyE = error.json().propertyErrors;
              let firstEKey = Object.keys(propertyE)[0];
              let firstEMessage = propertyE[firstEKey];
              reject(firstEMessage);
            break;
          case 0:
              this.displayErrorConnectingServer();
            break;
        }
      })
    });
  }

  public uploadFile(imageURI:any) {
    return new Promise((resolve, rejet) =>{
        const fileTransfer: FileTransferObject = this.transfer.create();
        let options: FileUploadOptions = {
          fileKey: 'image',
          httpMethod: 'POST',
          chunkedMode: true,
          mimeType: "image/jpeg",
          headers: {
            'Accept': 'application/json'
          }
        }
        let resource = 'images/temp';
        let url = Config.endpoints.cyclos + resource;
        fileTransfer.upload(imageURI, encodeURI(url), options)
          .then((imageId) => {
            resolve(imageId.response);
        }, (error) => {
          rejet(error);
      });
    }); 
  }

}
