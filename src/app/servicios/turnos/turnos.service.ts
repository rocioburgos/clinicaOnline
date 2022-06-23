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

  traerTurnos_ordenadosDia(){ 
    this.turnosCollection = this.afs.collection('turnos', ref=>ref.orderBy('dia','asc'));
    return this.turnosCollection.valueChanges({idField: "doc_id"});
  }
  
  traerTurnosById(uid:string){ 
    this.turnosCollection = this.afs.collection('turnos', ref => 
                                                  ref.where('turno_id', '==', uid)
                                                ) ;
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
                                                              );
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
    let turno =  this.turnosCollection.doc(id);

    return turno.update({
      dia: item.dia,
      especialidad:item.especialidad,
      especialista_id: item.especialista_id,
      estado: item.estado,
      hora:item.hora,
      paciente_id: item.paciente_id,
      resenia:item.resenia,
      comentario_cancelacion: item.comentario_cancelacion,
      comentario_rechazo: item.comentario_rechazo,
      calificacion_atencion:item.calificacion_atencion
    }); 
   }  

   eliminarTurno(){}
}
