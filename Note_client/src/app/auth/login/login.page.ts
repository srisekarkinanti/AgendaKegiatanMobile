import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { AuthService } from '../auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private  authService:  AuthService, private  router:  Router, public alertController: AlertController) { }

  ngOnInit() {
  }
  login(form){
    this.authService.login(form.value).subscribe((res)=>{
      if(res.user){
      this.router.navigateByUrl('/tabs/tab1');
        
      }
      else{
        this.presentAlert()
        
      }
    });
  }

   async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Login',
      message: 'Incorrect Username Or Password',
      buttons: ['OK']
    });

    await alert.present();
  }

}