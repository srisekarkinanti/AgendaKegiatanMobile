import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(public http: HttpClient, public toastController: ToastController) { }
loadNote(){
	return this.http.get('http://localhost:8081/api/note/');
}
 loadTopic(){
return this.http.get('http://localhost:8081/api/topic');
}
addNote(data){
	return this.http.post('http://localhost:8081/api/note', data);
}
getNoteById(idnote){
	return this.http.get('http://localhost:8081/api/note/' + idnote);
}
getNote(data){
	return this.http.get('http://localhost:8081/api/note', data);
}
deleteNote(idnote){
	console.log(idnote);
	return this.http.delete('http://localhost:8081/api/note/' + idnote);
}
noteUser(iduser){
	return this.http.get('http://localhost:8081/api/note/user/'+iduser);

}
async message(msg){
	const toast = await this.toastController.create({
		message : msg,
		duration: 2000
	});
	toast.present();
}
}
