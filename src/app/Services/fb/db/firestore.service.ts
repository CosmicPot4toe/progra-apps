import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, query, where, getDocs } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../Auth/auth.service';

export interface Clase{
  id?:string
  estud:string
  asig:string
  fecha:string
  secc:string
}
export interface Usuario{
	id?:string
	correo:string
	nombre:string
}
@Injectable({
  providedIn: 'root'
})
export class DBService {
  Mail!:string
  constructor(private firestore: Firestore,private auth:AuthService) { }
	/** 
	 * esta funcion agrega una clase a la coleccion Clase en el firestore
	 * @param clase
	 */ 
	addClase(clase:Clase){
		const claseRef = collection(this.firestore,'clase');
		return addDoc(claseRef,clase);
	}
	/**
	 * @returns array con todas las clases registradas
	 */
	getClases():Observable<Clase[]>{
		const claseRef = collection(this.firestore,'clase');
		return collectionData(claseRef, {idField:'id'}) as Observable<Clase[]>
	}
	async getCurrUserName(){
		await this.auth.getProfile().then(user=>{
			this.Mail = user?.email||''
		})
		const userQRef = await getDocs(
			query(
				collection(this.firestore,'usuario'),
				where("correo","==",this.Mail)
			)
		);
		userQRef.forEach(doc=>{
			console.log(doc.data())
		})
	}
}

