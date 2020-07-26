import { Component } from '@angular/core';
import { EventService} from '../event.service'
import { HttpResponse } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { DetailEventPage } from '../detail-event/detail-event.page';
import { AuthService } from '../auth/auth.service'
import { UserService } from '../user.service'
import { Storage } from '@ionic/storage';
 import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { interval } from 'rxjs';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page  {
  public authUser: any;
  public token: '';
  public length: '';
  total = {}
  dataToken = {
    token: ''
  }
  hapus = {
    iduser: ''
  }
  data : any;
  constructor(
  	public eventService: EventService,
    public modalController: ModalController,
    private auth: AuthService,
    public userService : UserService,
    private storage: Storage,
     public alertController: AlertController,
    private router : Router,
    

  	) {
    this.auth.authSubject.subscribe((res) => {
    if(res){
      this.authUser = res
      this.eventUser(res.iduser)
      this.getTotal(res.iduser)
      this.getToken(res.iduser);


    }
    });

  }


  
  refresh(event){
    this.eventUser(this.authUser.iduser)
      this.getTotal(this.authUser.iduser)
      if (event){
          event.target.complete();

      }

  }
 
   getToken(iduser){
    var promise1= this.storage.get('device_token');

    Promise.all([promise1]).then((token) => {
      this.dataToken.token = token[0]
    });
    this.updateUserToken(iduser, this.dataToken)
  }

  eventUser(iduser){
    this.eventService.eventUser(iduser).subscribe((response: Response) => {
      this.data = response
      this.length = this.data.length
      console.log(this.length)

    })
  }

  getTotal(iduser){
    this.eventService.getTotal(iduser).subscribe((response: Response) => {
      this.total = response
      console.log(this.total)
    })
  }

  updateUserToken(iduser, token){
     this.userService.updateUserToken(iduser, token).subscribe((response: Response) => {
    });
  }
  
  loadEvent(){
  	this.eventService.loadEvent().subscribe((response: Response) => {
  		// console.log(response)
  		this.data = response
  	})
  }
  deleteEvent(idevent){
    this.presentAlert(idevent)
    
  }
  eventKonfirmasi(){
    this.router.navigateByUrl('/konfirmasi/'+this.authUser.iduser)
  }

  async presentAlert(idevent) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: "Hapus",
      message: "Hapus agenda?",
      buttons: [{
          text: 'Tidak',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('batal');
          }
        },{
        text: 'Hapus',
        handler: () => {
       this.eventService.hapus(this.authUser.iduser, idevent).subscribe(res => {
      this.eventService.message('data berhasil dihapus')
       this.eventUser(this.authUser.iduser)
    })
        }
      }]
    });

    await alert.present();
  }
   async detailEvent(event){
    const modal = await this.modalController.create({
      component: DetailEventPage,
      componentProps: {value:event}
     
    });
    // modal.onDidDismiss().then(() => {this. eventUser(iduser) });
    return await modal.present();
  }

}
