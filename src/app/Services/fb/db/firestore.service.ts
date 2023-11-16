import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Clase{
  id?:string
  estud:string
  asig:string
  secc:string
  fecha:string
}
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  
  constructor(private firestore: Firestore) { }
  getNotes(): Observable<Clase[]> {
    const notesRef = collection(this.firestore, 'clase');
    return collectionData(notesRef, { idField: 'id'}) as Observable<Clase[]>;
  }

  getNoteById(id:string): Observable<Clase> {
    const noteDocRef = doc(this.firestore, `clase/${id}`);
    return docData(noteDocRef, { idField: 'id' }) as Observable<Clase>;
  }

  addNote(clase: Clase) {
    const notesRef = collection(this.firestore, 'clase');
    return addDoc(notesRef, clase);
  }

  deleteNote(clase: Clase) {
    const noteDocRef = doc(this.firestore, `clase/${clase.id}`);
    return deleteDoc(noteDocRef);
  }

  updateNote(clase: Clase) {
    const noteDocRef = doc(this.firestore, `clase/${clase.id}`);
    return updateDoc(noteDocRef, { estudiante: clase.estud, asignatura: clase.asig });
  }
}

