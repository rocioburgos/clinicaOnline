import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class HistoriaService {

  private historiaColecction: AngularFirestoreCollection<any>; 
  
  constructor(private readonly afs: AngularFirestore ) {
    this.historiaColecction = afs.collection('historiaclinica'); 
  }
  
  setItem(item:any) {
    return this.historiaColecction.add(item);    
  }


  traerHistorias(){ 
    this.historiaColecction = this.afs.collection('historiaclinica');
    return this.historiaColecction.valueChanges({idField: "doc_id"});
  }

  traerHistorias_paciente(uid:string){ 
    this.historiaColecction = this.afs.collection('historiaclinica', ref => 
                                                  ref.where('paciente_id', '==', uid)
                                                ) ;
    return this.historiaColecction.valueChanges({idField: "doc_id"});
  }

  traerHistoriasOrdenadas(){ 
    this.historiaColecction = this.afs.collection('historiaclinica',ref => ref.orderBy('dia',  "asc"));
    return this.historiaColecction.valueChanges({idField: "doc_id"});
  }
 
}
