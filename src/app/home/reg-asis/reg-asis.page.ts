import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimationController,Animation } from '@ionic/angular';
import { AuthService } from 'src/app/Services/fb/Auth/auth.service';
import { DBService,Clase } from 'src/app/Services/fb/db/firestore.service';
import { ElementRef, ViewChildren, ViewChild } from '@angular/core';

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
	
	
  constructor(private route: ActivatedRoute, private auth:AuthService, public db:DBService, private animationCtrl:AnimationController) { }
  @ViewChild('anim',{ read : ElementRef }) anime!:ElementRef;
	private anim!: Animation;
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
 async sendData(){
	await	this.anim.play().then(()=>{this.db.addClase(this.clase)})
		
  }


  ngAfterViewInit(){
	this.anim = this.animationCtrl
	.create()
	.addElement(this.anime.nativeElement)
	.duration(3000)
	.keyframes([
	  { offset: 0, width: '80px' },
	  { offset: 0.72, width: 'var(--width)' },
	  { offset: 1, width: '240px' },
	]);
  }
}
