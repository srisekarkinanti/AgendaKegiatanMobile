import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NoteService } from '../note.service';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service'

@Component({
  selector: 'app-note-add',
  templateUrl: './note-add.page.html',
  styleUrls: ['./note-add.page.scss'],
})
export class NoteAddPage implements OnInit {

  public authUser: any;
  data = {
    idtopic: '',
    tanggal: '',
    deskripsi: '',
    mulai: '',
    selesai: '',
    catatan: '',
    iduser : ''
  };
  insert: {}
  topic: any

  constructor(
    public noteService: NoteService,
    public modalController: ModalController,
    private auth: AuthService

  ) {
     this.auth.authSubject.subscribe((res:any) => {
    this.authUser = res
  })

    this.loadTopic()
    console.log(this.authUser.iduser)
  }

   ngOnInit() {
  }



  loadTopic(){
  this.noteService.loadTopic().subscribe((response: Response) => {
  this.topic = response;
     });
   }
   
   addNote() {
     this.data.iduser = this.authUser.iduser
     console.log(this.data)
    this.noteService.addNote(this.data).subscribe((response: Response) => {
      if (response) {
        this.noteService.message('Data berhasil disimpan');
      } else {
        this.noteService.message('Terjadi kesalahan');
      }
      this.modalController.dismiss();
    });
  }

  kembali() {
    this.modalController.dismiss();
  }

}
