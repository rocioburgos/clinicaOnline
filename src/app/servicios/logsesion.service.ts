import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { map } from 'highcharts';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LogsesionService {
  private logColection: AngularFirestoreCollection<any>; 
  
  constructor(private readonly afs: AngularFirestore ) {
    this.logColection = afs.collection('logColection'); 
  }
   

  altaLog(log: any) {
    console.log("Alta exitosa");
    return this.logColection.add(JSON.parse(JSON.stringify(log)));
  }

  traerSesiones(){ 
    this.logColection = this.afs.collection('logColection');
    return this.logColection.valueChanges({idField: "doc_id"});
  }
}
