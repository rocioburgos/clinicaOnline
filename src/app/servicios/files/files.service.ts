import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private filePath:any;
  private dowloandURL?:Observable<string>;

  constructor(
    private storage: AngularFireStorage
  ) { 
   }
 


  uploadFile(filePath:string, file:any)  {
    console.log("path: "+filePath)
    return this.storage.upload(filePath, file);
  }

  //Referencia del archivo
  public referenciaCloudStorage(nombreArchivo: string) {
    return this.storage.ref(nombreArchivo);
  }
}
