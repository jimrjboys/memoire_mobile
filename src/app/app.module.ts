import { BrowserModule } from '@angular/platform-browser';
import { BrMaskerModule } from 'brmasker-ionic-3';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Network } from '@ionic-native/network';
import { Diagnostic } from '@ionic-native/diagnostic';
import { FileOpener } from '@ionic-native/file-opener';
import { HttpModule } from '@angular/http';
import { Device } from '@ionic-native/device'
import { Uid } from '@ionic-native/uid';
import { AndroidPermissions } from '@ionic-native/android-permissions';

import { MyApp } from './app.component';
import { IndividuelPage } from '../pages/individuel/individuel';
import { CinPage } from '../pages/cin/cin';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { CameraProvider } from '../providers/camera/camera';
import { PrintProvider } from '../providers/print/print';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { PictUploadPage } from '../pages/pict-upload/pict-upload';
import { SuccessfulPage } from '../pages/successful/successful';
import { BankcardProvider } from '../providers/bankcard/bankcard';
import { VersionPage } from '../pages/version/version';
import { UpdateProvider } from '../providers/update/update';
import { AppVersion } from '@ionic-native/app-version';
import { PictComponent } from '../components/pict/pict';
import { NetworkProvider } from '../providers/network/network';
import { SplashPage } from '../pages/splash/splash';
import { MemberPage } from '../pages/member/member';
import { LoginPage } from '../pages/login/login';
import { AccountPage } from '../pages/account/account';
import { AccountDetailPage } from '../pages/account-detail/account-detail';
import { RegisterPage } from '../pages/register/register';
import { OrchidProvider } from '../providers/orchid/orchid';
import { SfProvider } from '../providers/sf/sf';
import { BankingPage } from '../pages/banking/banking';
import { PrinterListPage } from '../pages/printer-list/printer-list';
import { IonicStorageModule } from '@ionic/storage';
import { ToolHeadComponent } from '../components/tool-head/tool-head';
import { ToolTitleComponent } from '../components/tool-title/tool-title';
import { ToolButtonComponent } from '../components/tool-button/tool-button';
import { InfoLoginComponent } from '../components/info-login/info-login';
import { TransferPage } from '../pages/transfer/transfer';
import { SuccessfulTransfertPage } from '../pages/successful-transfert/successful-transfert';
import { ExchangePage } from '../pages/exchange/exchange';
import { ConfirmPassPage } from '../pages/confirm-pass/confirm-pass';
import { TransferFeesPage } from '../pages/transfer-fees/transfer-fees'

import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { PaymentProvider } from '../providers/cyclos/payment';

//CYCLOS
//import { CyclosProvider } from '../providers/cyclos/cyclos';
import { AuthProvider } from '../providers/cyclos/auth';
import { ProgressBarModule } from "angular-progress-bar"
import { AccountProvider } from '../providers/cyclos/account';
import { StorageProvider } from '../providers/storage/storage';
import { ComptePage } from '../pages/compte/compte';
import { SoldePage } from '../pages/solde/solde';
import { HistoriqueProvider } from '../providers/historique/historique';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp,
    IndividuelPage,
    PictUploadPage,
    SuccessfulPage,
    CinPage,
    VersionPage,
    PictComponent,
    SplashPage,
    MemberPage,
    LoginPage,
    BankingPage,
    RegisterPage,
    AccountPage,
    AccountDetailPage,
    PrinterListPage,
    ToolHeadComponent,
    ToolTitleComponent,
    ToolButtonComponent,
    InfoLoginComponent,
    TransferPage,
    SuccessfulTransfertPage,
    ExchangePage,
    ConfirmPassPage,
    TransferFeesPage,
    ComptePage,
    SoldePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
        monthNames: [
          'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
          'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
        ]
    }),
    BrMaskerModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    ProgressBarModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    IndividuelPage,
    PictUploadPage,
    SuccessfulPage,
    CinPage,
    VersionPage,
    PictComponent,
    SplashPage,
    MemberPage,
    LoginPage,
    BankingPage,
    RegisterPage,
    AccountPage,
    AccountDetailPage,
    PrinterListPage,
    ToolHeadComponent,
    ToolTitleComponent,
    ToolButtonComponent,
    InfoLoginComponent,
    TransferPage,
    SuccessfulTransfertPage,
    ExchangePage,
    ConfirmPassPage,
    TransferFeesPage,
    ComptePage,
    SoldePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    CameraProvider,
    FirebaseProvider,
    BankcardProvider,
    FileTransfer,
    File,
    FileOpener,
    UpdateProvider,
    AppVersion,
    NetworkProvider,
    Network,
    Diagnostic,
    OrchidProvider,
    SfProvider,
    AuthProvider,
    BluetoothSerial,
    PrintProvider,
    AccountProvider,
    ScreenOrientation,
    BarcodeScanner,
    PaymentProvider,
    Device,
    Uid,
    AndroidPermissions,
    StorageProvider,
    HistoriqueProvider
  ]
})
export class AppModule {}
