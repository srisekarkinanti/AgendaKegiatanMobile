import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service'
import { Router } from  "@angular/router";
import { Storage } from  '@ionic/storage';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public authUser: any;
  constructor(private auth: AuthService,private  router:  Router, private storage: Storage) {
  	this.auth.authSubject.subscribe((res:any) => {
    this.authUser = res
    console.log(this.authUser)
  })
}

async logout() {
    await this.storage.remove("ACCESS_TOKEN");
    await this.storage.remove("EXPIRES_IN");
    this.auth.authSubject.next('');
      this.router.navigateByUrl('login');

  }



}
