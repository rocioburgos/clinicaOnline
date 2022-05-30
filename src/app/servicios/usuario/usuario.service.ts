import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { SpinnerService } from '../spinner/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  private usuariosCollection: AngularFirestoreCollection<any>;

  constructor(private readonly afs: AngularFirestore ) {
    this.usuariosCollection = afs.collection('usuarios');
  }
  
  setItemWithId(item:any, id:string) {
     
    return this.usuariosCollection.doc(id).set(Object.assign({}, {uid: id, ...item}  )) ;    
  }

  traerUsuarios(){ 
    this.usuariosCollection = this.afs.collection('usuarios', ref => ref.where('perfil', '==', 'especialista'));
    return this.usuariosCollection.valueChanges({idField: "doc_id"});
  }
 


  getUserByUid(uid:string){
    return this.getItemById(uid);
  }

  protected getItemById(id:string){
    return this.usuariosCollection.doc(id).get();
  }


  actualizarEstado(id:string, estado:string){
   return  this.usuariosCollection.doc(id).update({estado: estado});
  }


  traerEspecialistasFiltro( ){ 
    return this.afs.collection('usuarios', ref => ref.where('perfil', '==',  'especialista' ))
                      .valueChanges({idField: "doc_id"})  
  }
}
