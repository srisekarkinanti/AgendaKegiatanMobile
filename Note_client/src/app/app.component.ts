import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
 import { Router } from '@angular/router';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx'; 
import { Storage } from '@ionic/storage';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public rootPage: any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private router : Router,
    private push: Push,
     public alertController: AlertController,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.router.navigateByUrl('login');
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.initPushNotification();
    });
  }

  async presentAlert(notification) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: notification.header,
      message: notification.message,
      buttons: [{
        text: 'Oke',
        handler: () => {
      this.router.navigateByUrl('/'+notification.additionalData.page+'/'+notification.additionalData.idevent);
         
        }
      }]
    });

    await alert.present();
  }

  initPushNotification()
  {
    // to check if we have permission


this.push.hasPermission()
  .then((res: any) => {

    if (res.isEnabled) {
      console.log('We have permission to send push notifications');
    } else {
      console.log('We don\'t have permission to send push notifications');
    }

  });

// to initialize push notifications

const options: PushOptions = {
   android: {
       senderID: '768688718340'
   },
   ios: {
       alert: 'true',
       badge: true,
       sound: 'false'
   },
   windows: {}
};

const pushObject: PushObject = this.push.init(options);

pushObject.on('notification').subscribe((notification) =>{
  // console.log(notification.additionalData);
  console.log(notification)

   this.presentAlert(notification)
  
});

pushObject.on('registration').subscribe((registration: any) => {
  this.storage.set('device_token', registration.registrationId);
  console.log(registration.registrationId)
});

pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }
}
