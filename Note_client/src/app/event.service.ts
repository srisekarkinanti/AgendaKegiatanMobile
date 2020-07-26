import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(public http: HttpClient, public toastController: ToastController) { }
loadEvent(){
	return this.http.get('http://localhost:8081/api/event/');
}
getById(idevent){
	return this.http.get('http://localhost:8081/api/event/'+idevent);
}
eventUser(iduser){
	return this.http.get('http://localhost:8081/api/event/user/'+iduser);

}
updateParticipant(data){
	return this.http.post('http://localhost:8081/api/event/update_participant', data);

}
getTotal(iduser){
	return this.http.get('http://localhost:8081/api/event/total/'+iduser);

}
konfirmasi(iduser){
	return this.http.get('http://localhost:8081/api/event/menunggu/'+iduser);

}
hapus(iduser, idevent){
	return this.http.delete('http://localhost:8081/api/event/'+idevent+'/'+iduser)
}

async message(msg){
	const toast = await this.toastController.create({
		message : msg,
		duration: 2000
	});
	toast.present();
}
 

}
