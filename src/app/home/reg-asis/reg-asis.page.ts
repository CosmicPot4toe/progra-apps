import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Services/fb/Auth/auth.service';
import { DBService,Clase } from 'src/app/Services/fb/db/firestore.service';

@Component({
  selector: 'app-reg-asis',
  templateUrl: './reg-asis.page.html',
  styleUrls: ['./reg-asis.page.scss'],
})
export class RegAsisPage implements OnInit {
	// once all fields of this table are filled by the qr pass it directly to this.db.addClase() on submit
	clase:Clase={
		estud:'',
		asig:'',
		fecha:'',
		secc:''
	}
  constructor(private route: ActivatedRoute, private auth:AuthService, public db:DBService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params=>{
			var data: any = params.get('data')
			var e = data.split(".",3)
			this.clase.asig = e[0]	
			this.clase.secc = e[1]
			this.clase.fecha = e[2]
			
		
		})
		this.db.getCurrUserName().then(res=>{
			this.clase.estud = res
		})
  }
  sendData(){
	this.db.addClase(this.clase)
  }


  ngAfterViewInit(){
    
  }
}
