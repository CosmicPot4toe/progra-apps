import { Component, ElementRef, ViewChild } from '@angular/core';
import { AnimationController, Animation, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

import { AuthService } from '../Services/fb/Auth/auth.service';
import { RNmService } from '../Services/api/r-nm/r-nm.service';
import { QrService } from '../Services/api/qr-scan/qr.service';
import { DBService } from '../Services/fb/db/firestore.service';
// import * as internal from 'stream';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
	@ViewChild('welcom',{ read : ElementRef }) com!:ElementRef;
	private anim!:Animation

	@ViewChild('E',{ read : ElementRef }) E!:ElementRef;
	private EE!:Animation

	@ViewChild('scanAnim',{ read : ElementRef }) scanA!:ElementRef;
	private scanAnim!:Animation

	UserName!:string;
	Rand!:number;
	url!:string;

	char:any[] = [];
	args={} as any;
  constructor(
		private animCtrl:AnimationController,public authService:AuthService
		,public route:Router,private rickNmorty:RNmService
		,public qr:QrService,public navCtrl: NavController
		,public db:DBService
	) {}
	
	ngOnInit(){
		this.args.page = 0;
		this.getChars();
		this.db.getCurrUserName().then(res=>{
			this.UserName = res
		})
	}
	ngAfterViewInit(){
		this.anim = this.animCtrl
			.create()
			.addElement(this.com.nativeElement)
			.duration(300)
			
			.fromTo('transform', 'translateY(120%)', 'translateY(0px)')
			.fromTo('opacity', '0', '1');
		this.anim.play();
		this.EE = this.animCtrl
			.create()
			.addElement(this.E.nativeElement)
			.delay(500)
			.easing('ease-in-out')
			
			.duration(400)
			.fromTo('transform', 'translateX(-50px)', 'translateY(0px)')
			.fromTo('opacity','0','1')
		this.EE.play();
	}
	async play(){
		await this.anim.play();
		await this.EE.play();
	}

	async scan(){
		await this.qr.startScan();/* to test the reg-asis page use the string else the qr result */
		await this.route.navigate(['/home/reg-asis',this.qr.result/*this.qr.result*/])
  }

	async logout(){
		await this.authService.logout().catch((error)=>console.log(error))
		.then(()=>{
				this.route.navigate(['/login'])
				if(this.qr.scanActive){
					this.qr.stopScan()
				}
			}
		)
	}

	getChars(event?:any){
		this.rickNmorty.getChar(this.args).subscribe({
			next:(res:any)=>{
				this.char.push(...res.results)
				this.getChar()
			},
			error:(err:any)=>{}
			}
		)
	}
	getChar(){
		this.Rand = Math.floor(Math.random() * 20)
		this.char.forEach((v,i,a)=>{
			if (i==this.Rand){
				this.url=a[i].image
			}
		})
	}
}
