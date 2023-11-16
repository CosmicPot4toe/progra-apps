import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Services/fb/Auth/auth.service';

@Component({
  selector: 'app-reg-asis',
  templateUrl: './reg-asis.page.html',
  styleUrls: ['./reg-asis.page.scss'],
})
export class RegAsisPage implements OnInit {

  constructor(private route: ActivatedRoute, private auth:AuthService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params=>{
			console.log(params.get('data'))
		})
  }
  ngAfterViewInit(){
    
  }
}
