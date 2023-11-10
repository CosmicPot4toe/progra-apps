import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../Services/fb/Auth/auth.service';

@Component({
  selector: 'app-new-pass',
  templateUrl: './new-pass.page.html',
  styleUrls: ['./new-pass.page.scss'],
})
export class NewPassPage implements OnInit {
	
	ps_rec!:FormGroup;
  constructor(private route:Router,public formBuilder:FormBuilder,
		public authService:AuthService,public loadingCtrl:LoadingController) { }

  ngOnInit() {
		this.ps_rec = this.formBuilder.group({
			email:['',[
				Validators.required,
				Validators.email,
				Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$")
				]
			]
		})
  }
	get errorCtrl(){
		return this.ps_rec?.controls;
	}
	async rec_pass(){
		const loading = await this.loadingCtrl.create();
		await loading.present();
		if(this.ps_rec?.valid){
			const user = await this.authService.resetPW(this.ps_rec.value.email).catch((err)=>{
				console.log(err)
				loading.dismiss()
			}).then(()=>{
				loading.dismiss()
				this.route.navigate(['/login'])
			})
		}
	}
}
