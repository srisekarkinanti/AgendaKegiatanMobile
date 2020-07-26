import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service'
import { HttpResponse } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service'
import { Router } from  "@angular/router";

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.page.html',
  styleUrls: ['./reminder.page.scss'],
})
export class ReminderPage implements OnInit {
  idevent: '';
  detail = {}
  iduser: ''
  data = {
    status: '',
    idevent: '',
    iduser : ''
  }
  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private auth: AuthService,
     public alertController: AlertController,
     private  router:  Router
    ) { 
    this.idevent = this.route.snapshot.params['idevent'];
    this.getEventById(this.idevent)
    this.auth.authSubject.subscribe((res) => {
    if(res){
      this.iduser = res.iduser
    }
    });
}
  ngOnInit() {
  }

  getEventById(idevent){
    this.eventService.getById(idevent).subscribe((response) => {
      this.detail = response
    })
  }

  setujui(idevent, iduser){
    this.data.status = '1'
    this.data.idevent = idevent
    this.data.iduser = iduser
    var pesan = "SETUJUI"
    this.presentAlert(this.data, this.data, pesan)
  }
  tolak(idevent, iduser){
    this.data.status = '2'
    this.data.idevent = idevent
    this.data.iduser = iduser
    var pesan = "TOLAK"
    this.presentAlert(this.data, this.data, pesan)
  }

   async presentAlert(data, iduser , pesan) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: pesan,
      buttons: [{
        text: 'Konfirmasi',
        handler: () => {
        this.eventService.updateParticipant(data).subscribe((res: Response) => {
            this.eventService.message('Berhasil diubah');
            this.router.navigateByUrl('/tabs/tab1');
        })
         
        }
      }]
    });

    await alert.present();
  }

}
