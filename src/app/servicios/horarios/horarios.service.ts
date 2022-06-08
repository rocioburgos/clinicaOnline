import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {

  private horariosCollection: AngularFirestoreCollection<any>;
  private horariosCollection_especialista: AngularFirestoreCollection<any>;
  
  constructor(private readonly afs: AngularFirestore ) {
    this.horariosCollection = afs.collection('horarios');
    this.horariosCollection_especialista= afs.collection('horarios');
  }
  
  setItem(item:any) {
    return this.horariosCollection.add(item);    
  }


  traerHorarios(){ 
    this.horariosCollection = this.afs.collection('horarios');
    return this.horariosCollection.valueChanges({idField: "doc_id"});
  }

  
  traerHorariosEspecialista(uidEspecialista:string ){ 
    this.horariosCollection_especialista = this.afs.collection('horarios', ref => ref.where('uidEspecialista', '==', uidEspecialista)) ;
    return this.horariosCollection_especialista.valueChanges({idField: "doc_id"});
  }

  actualizarHorario(id:string, item:any){
    let horario =  this.horariosCollection.doc(id);
  
    return horario.update({
      horarios: item.horarios,
    }) 
   }  
 
}
