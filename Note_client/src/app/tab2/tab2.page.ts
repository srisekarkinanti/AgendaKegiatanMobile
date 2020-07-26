import { Component } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NoteService } from '../note.service';
import { ModalController } from '@ionic/angular';
import { NoteAddPage } from '../note-add/note-add.page';
import { NoteDetailPage } from '../note-detail/note-detail.page'
import { AuthService } from '../auth/auth.service'
 
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public authUser: any;
  noteList:any
  constructor(
    public noteService: NoteService,
    public modalController: ModalController,
    private auth: AuthService
    ) {
    this.auth.authSubject.subscribe((res:any) => {
    this.authUser = res
    this.noteUser(res.iduser)

    });

    console.log(this.authUser.iduser)
  }

  refresh(event){
    this.noteUser(this.authUser.iduser)
    if (event){
          event.target.complete();
        
      }

  }

  noteUser(iduser){
    this.noteService.noteUser(iduser).subscribe((response: Response) => {
      this.noteList = response
      // console.log(this.noteList)
    })
  }

    loadNote(){
    this.noteService.loadNote().subscribe((response: Response) => {
      this.noteList = response;
      
      // console.log(this.noteList);
    });
  }
  async goDetailNote(note){
    const modal = await this.modalController.create({
      component: NoteDetailPage,
      componentProps: {value:note}
     
    });
    // modal.onDidDismiss().then(() => {this.loadNote() });
    return await modal.present();
  }

  async goAddNote(){
    const modal = await this.modalController.create({
      component: NoteAddPage
    });
    modal.onDidDismiss().then(() => {this.noteUser(this.authUser.iduser) });
    return await modal.present();
  }

  deleteNote(idnote){
    this.noteService.deleteNote(idnote).subscribe((response : Response) => {
      this.noteService.message('data berhasil dihapus')
       this.noteUser(this.authUser.iduser)
    })
  }

}
