import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient, public toastController: ToastController) { }

  updateUserToken(iduser, token){
  	return this.http.post('http://localhost:8081/api/token/user/'+iduser, token);
  }
}
