import { NavParams, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.page.html',
  styleUrls: ['./detail-event.page.scss'],
})
export class DetailEventPage implements OnInit {
 detail:any;
  constructor(
  	public navParams : NavParams,
  	public modalController : ModalController
  	) { 
  	 this.detail = this.navParams.data.value
    console.log(this.detail)
  }

  ngOnInit() {
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
