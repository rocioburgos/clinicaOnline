import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
 
import { Observable } from 'rxjs';
import { SpinnerService } from '../spinner/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {

  private especialidadesCollection:AngularFirestoreCollection<any>;
  encuestas:Observable<any[]>;
  constructor(private readonly afs: AngularFirestore ) {  
    this.especialidadesCollection = afs.collection<any>('especialidades');
    this.encuestas= this.especialidadesCollection.valueChanges();
  }


  registrarEspecialidad(datoUser:any){ 
    this.especialidadesCollection =  this.afs.collection('especialidades');
 
    return this.especialidadesCollection.add(Object.assign({},datoUser)); 
  }

  traerEspecialidades(){
    return this.especialidadesCollection.valueChanges({idField: "doc_id"});
  }
}
