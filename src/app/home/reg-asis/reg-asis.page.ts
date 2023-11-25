import { Component, OnInit , Renderer2} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AnimationController,Animation } from '@ionic/angular';
import { AuthService } from 'src/app/Services/fb/Auth/auth.service';
import { DBService,Clase } from 'src/app/Services/fb/db/firestore.service';
import { ElementRef, ViewChildren, ViewChild } from '@angular/core';
import { style } from '@angular/animations';

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
	
	
  constructor(private route: ActivatedRoute, private auth:AuthService, public db:DBService, private animationCtrl:AnimationController, public renderer: Renderer2,private router: Router) { }
  @ViewChild('anim',{ read : ElementRef , static: false}) anime!:ElementRef; @ViewChild('donee',{read: ElementRef}) done!:ElementRef;
	private donee!: Animation;
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
	 await	this.anim.play().then(()=>{
		this.db.addClase(this.clase)
	
	 this.donee.play().then(()=>{
		setTimeout(()=>this.router.navigate(['/home']),2000);
		 
	 })
	})
  }


  ngAfterViewInit(){
	this.anim = this.animationCtrl
	.create()
	.addElement(this.anime.nativeElement)
	.delay(1000)
	.duration(500)
	
	.fromTo('transform','translateY(0)','translateY(-100px)')
	.easing('ease-in')


	this.donee= this.animationCtrl
	.create()
	.addElement(this.done.nativeElement)
	.duration(500)
	.fromTo('transform','translateY(0)','translateY(15px)')
	.easing('ease-in')
	
  }
}
