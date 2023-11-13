import { Injectable, AfterViewInit, OnDestroy } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { AlertController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class QrService implements AfterViewInit,OnDestroy{
	result!:any;
	scanActive=false

  constructor(private alertCtrl:AlertController) { }

	ngAfterViewInit() {
		BarcodeScanner.prepare()
	}

	ngOnDestroy() {
		BarcodeScanner.stopScan();
	}

	async startScan() {
		const allowed = await this.CheckPerms();
		if (allowed){
			const result = await BarcodeScanner.startScan({
				targetedFormats:['QR_CODE']
			});
			if(result.hasContent){
				this.result = result.content
				this.scanActive = false
			}
		}
	};
	async CheckPerms(){
		return new Promise(async (resolve)=>{
			const status = await BarcodeScanner.checkPermission({ force: true });
			if (status.granted){
				this.scanActive=true
				resolve(true)
			} else if(status.denied){
				const alert =await this.alertCtrl.create({
					header:'No Perms',
					message:'permitir camara',
					buttons:[{
						text:'no',
						role:'cancel',
					},{
						text:'Abrir Config',
						handler:()=>{
							BarcodeScanner.openAppSettings();
							resolve(false);
						}
					}]
				});
			await alert.present();
			} else {
				resolve(false)
			}
		});
	}

	stopScan(){
		BarcodeScanner.stopScan();
		this.scanActive=false
	}
}
