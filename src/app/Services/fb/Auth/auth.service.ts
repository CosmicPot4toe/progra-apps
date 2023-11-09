import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public ngFireAuth:AngularFireAuth) { }

  async register(email:string,pw:string){
		return await this.ngFireAuth.createUserWithEmailAndPassword(email,pw)
	}
	async loginUser(email:string,pw:string){
		return await this.ngFireAuth.signInWithEmailAndPassword(email,pw)
	}
	async resetPW(email:string){
		return await this.ngFireAuth.sendPasswordResetEmail(email)
	}
	async logout(){
		return await this.ngFireAuth.signOut()
	}
	async getProfile(){
		return await this.ngFireAuth.currentUser
	}

	async isLoggedIn(){
		return await this.getProfile()? true : false;
	}
}
