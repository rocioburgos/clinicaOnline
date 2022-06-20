import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {


  private encuestaCollection: AngularFirestoreCollection<any>; 
  
  constructor(private readonly afs: AngularFirestore ) {
    this.encuestaCollection = afs.collection('encuestas'); 
  }
  
  setItem(item:any) {
    return this.encuestaCollection.add(item);    
  }


  traerTurnos(){ 
    this.encuestaCollection = this.afs.collection('encuestas');
    return this.encuestaCollection.valueChanges({idField: "doc_id"});
  }
}
