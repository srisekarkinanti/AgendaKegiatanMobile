import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NoteService } from '../note.service';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.page.html',
  styleUrls: ['./note-detail.page.scss'],
})
export class NoteDetailPage implements OnInit {
  detail:any;
data : any;
   constructor(
    public noteService: NoteService,
    public modalController: ModalController,
    public navParams :NavParams
  ) {

    this.detail = this.navParams.data.value
    console.log(this.detail)
   }
  

  ngOnInit() {

  }
loadNote(){
  this.noteService.loadNote().subscribe((response: Response) => {
  this.data = response;
  console.log(response);
     });
   }
   closeModal() {
    this.modalController.dismiss();
  }
}
