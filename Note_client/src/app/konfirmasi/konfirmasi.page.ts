import { Router } from  "@angular/router";
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService} from '../event.service'
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-konfirmasi',
  templateUrl: './konfirmasi.page.html',
  styleUrls: ['./konfirmasi.page.scss'],
})
export class KonfirmasiPage implements OnInit {
iduser: '';
data: any;
  constructor(
  	private route: ActivatedRoute,
  private  router:  Router,
  private eventService :  EventService) { 
	this.iduser = this.route.snapshot.params['iduser'];
	this.konfirmasi(this.iduser)
  }

  ngOnInit() {
  }

  konfirmasi(iduser){
  	this.eventService.konfirmasi(iduser).subscribe((response: Response) => {
  		this.data = response;
  		console.log(this.data)
  	})
  }

  aksiKonfirmasi(idevent){
  	this.router.navigateByUrl('/second/'+idevent)
  }

}
