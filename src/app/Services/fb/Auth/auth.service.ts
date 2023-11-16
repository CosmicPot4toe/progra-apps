import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { 
	Auth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public ngFireAuth:Auth) { }

  async register(email:string,pw:string){
		return await createUserWithEmailAndPassword(this.ngFireAuth,email,pw)
	}
	async loginUser(email:string,pw:string){
		return await signInWithEmailAndPassword(this.ngFireAuth,email,pw)
	}
	async resetPW(email:string){
		return await sendPasswordResetEmail(this.ngFireAuth,email)
	}
	async logout(){
		return await this.ngFireAuth.signOut()
	}
	async getProfile(){
		return this.ngFireAuth.currentUser
	}

	async isLoggedIn(){
		return await this.getProfile()? true : false;
	}
}
