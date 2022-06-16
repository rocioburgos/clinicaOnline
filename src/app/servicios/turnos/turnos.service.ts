import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  private turnosCollection: AngularFirestoreCollection<any>;
  private turnosCollection_especialista: AngularFirestoreCollection<any>;
  
  constructor(private readonly afs: AngularFirestore ) {
    this.turnosCollection = afs.collection('turnos');
    this.turnosCollection_especialista= afs.collection('turnos');
  }
  
  setItem(item:any) {
    return this.turnosCollection.add(item);    
  }


  traerTurnos(){ 
    this.turnosCollection = this.afs.collection('turnos');
    return this.turnosCollection.valueChanges({idField: "doc_id"});
  }
  
  
  traerTurnosPaciente(uid:string){ 
    this.turnosCollection = this.afs.collection('turnos', ref => 
                                                  ref.where('paciente_id', '==', uid)
                                                ) ;
    return this.turnosCollection.valueChanges({idField: "doc_id"});
  }
  
  traerTurnosEspecialista(uidEspecialista:string ){ 
    this.turnosCollection_especialista = this.afs.collection('turnos', ref => 
                                                                ref.where('especialista_id', '==', uidEspecialista)
                                                              ) ;
    return this.turnosCollection_especialista.valueChanges({idField: "doc_id"});
  }

  traerTurnosEspecialista_Especialidad(uidEspecialista:string ,especialidad:string){ 
    this.turnosCollection_especialista = this.afs.collection('turnos', ref => 
                                                                ref.where('especialista_id', '==', uidEspecialista)
                                                                .where('especialidad','==',especialidad)
                                                              ) ;
    return this.turnosCollection_especialista.valueChanges({idField: "doc_id"});
  }

  actualizarTurno(id:string, item:any){
    let horario =  this.turnosCollection.doc(id);
  
    return horario.update({
      horarios: item.horarios,
    }) 
   }  

   eliminarTurno(){}
}
