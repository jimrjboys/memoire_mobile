import { Injectable } from '@angular/core';
import { LoadingController, ToastController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { CyclosProvider } from '../cyclos/cyclos';
import { InvoicePrint } from '../../lib/models/invoicePrint';
import { Individual } from '../../lib/entities/individual';

@Injectable()
export class FirebaseProvider {
  public  static CUSTOMER_REF :string ="newCustomer" 
  constructor(
  	private loadingCtrl: LoadingController,
    private af: AngularFireDatabase,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  	) {
  }

  public alreadyUsed(customer) : Promise<boolean> {
    let phone = customer.phone.split(" ").join("")
    let cin = customer.cin.split(" - ").join("")
    let customerRef = `customer/${phone}`;
    let cinRef = `cin/${cin}`;

    return new Promise((resolve) => {
      if (customer.cin) {
        this.af.database.ref(cinRef).once('value').then((snapshot) => {
          if(snapshot.exists()) {
            resolve(true)
          } else {
            resolve(false)
          }
        })
      } else {
        this.af.database.ref(customerRef).once('value').then((snapshot) => {
          console.log(snapshot.exists())
          if(snapshot.exists()) {
            resolve(true)
          } else {
            customerRef = `newCustomer/${phone}`;
            this.af.database.ref(customerRef).once('value').then((snapshot) => {
              if(snapshot.exists()) {
                resolve(true)
              } else resolve(false)
            })
          }
        })
      }
    })
  }

  public newCustomer(customer:Individual) {
    let isCustomerRef =  FirebaseProvider.CUSTOMER_REF + "/" + customer.phone
    return new Promise((resolve,reject) => {
      
      this.notExistRef(isCustomerRef).then(() => {
        const data: firebase.database.Reference = firebase.database().ref(FirebaseProvider.CUSTOMER_REF);
        let dataList = {
          [customer.phone]:customer
        };
        data.update(dataList).then(success=> {
          this.successfullyToast("Le compte a été enregistré avec succès")
          resolve(success)
          }).catch( error => {
            reject(error)
          })
      }).catch((error) => {
        reject(error)
      })
    }) 
  }

  public notExistRef(ref:any) {
    return new Promise((resolve,reject) => {
      const data: firebase.database.Reference = firebase.database().ref(ref);
        data.once('value', dataSnapshot =>{
          if(dataSnapshot.val()) {
            console.log("exist")
            this.presentAlert("Le compte existe déjà")
            reject(dataSnapshot.val())
          }else {
            console.log("n'exist")
            resolve(dataSnapshot.val())
          }
        })
      }) 
  }

  public storeImage(path: string, image) {
  	return new Promise((resolve) => {
      let loading = this.loadingCtrl.create();
      loading.setBackButtonText("Annuler")
      loading.present()

      let picture = firebase.storage().ref(path)
      let ref = picture.putString(image, 'data_url')

      ref.on('state_changed',
          (snapshot) => {
            const snap = snapshot as firebase.storage.UploadTaskSnapshot;
            let percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);

            loading.data.content = percentage + ' %';
          }, (error) => {
            alert (JSON.stringify(error));
          }, () => {
            picture.getDownloadURL().then((url)=> {
              loading.dismiss()
              this.successfullyToast('l\'image a été enregistrée avec succès')
              resolve(url);
            })
          }
      );
  	})
  }

  public successfullyToast(message?:string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  public remove(url) {
    return new Promise((resolve) => {
      firebase.storage().refFromURL(url)
      .delete()
      .then(() => {
        resolve();
      })
    })
  }

  public pushCiid(fiid: string) {
    return new Promise((resolve) => {
      let $ref = this.af.list(`fiids`)
      $ref.update(fiid, {
        ciid: CyclosProvider.session.user.id,
        name: CyclosProvider.session.user.display
      })
      .then(() => {
        resolve()
      }, (error) => {
        console.error(error)
      })
    })
  }

  public getInvoice(qrcode) {
    /*let qrcode = {
      fiid: "5949340143459017786",
      key: "-LTh6ncnR4k8KIQ-MQuK",
      qr: "i002"
    }*/
    return new Promise((resolve, reject) => {
      this.af.object(`invoices/${qrcode.fiid}/${qrcode.key}`)
      .valueChanges()
      .subscribe((invoice) => {
        if (invoice)
          resolve(invoice)
        else
          reject()
      })
    })
  }

  payInvoice(qrcode) {
    return this.af.list(`invoices/${qrcode.fiid}`)
    .update(qrcode.key, {
      paid: true
    })
  }

  print(mac:string, facture:InvoicePrint) {
    return new Promise((resolve,reject) =>{
      const data: firebase.database.Reference = firebase.database().ref('40:45:da:45:b4:00');
      let dataList = {
        facture:facture,
        macAdresse: Math.random().toString(36).substring(7)
      };

      //list
      /*data.on('value',dataSnapshot=>{
        resolve(dataSnapshot.val())
      })*/

      data.update(dataList).catch(success => {
        resolve(success)
        }).catch(error=>{
          reject(error)
        })
      }) 
  }

  saveTransaction(idTransaction: any, facture: InvoicePrint,idAgent?:string) {
    return new Promise((resolve,reject) => {
      const data: firebase.database.Reference = firebase.database().ref('transactionHistory');
      let dataList = {
        [idTransaction]:{
          facture : facture,
          idAgent: idAgent
        },
      };
      data.update(dataList).catch(success => {
        resolve(success)
        }).catch(error => {
          reject(error)
        })
      }) 
  }

  getTransactionHistory(idTransaction?:any) {
    return new Promise((resolve,reject) =>{
      const data: firebase.database.Reference = firebase.database().ref('transactionHistory/' + idTransaction +'/facture');
        data.on('value', dataSnapshot =>{
          resolve(dataSnapshot.val())
        })
      }) 
  }

  presentAlert(message:string , title:string ="") {
    this.alertCtrl.create({
      title:  title,
      message: message,
      buttons: [{
        text: 'ok'
      }]
    }).present();
  }

}
