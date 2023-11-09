import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RNmService {

  constructor(private http:HttpClient) { }

  getChar(arg:any){
    return this.http.get(environment.ramBaseUrl,arg)
  }
}
