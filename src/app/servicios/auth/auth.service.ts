import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs'; 
import { tap, map } from 'rxjs/operators'; 
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private usrSrv:UsuarioService
  ) { }


  public async registerUser(email: string, clave: string): Promise<any> {
    const resultado = await this.afAuth.createUserWithEmailAndPassword(email, clave);
    this.sendEmailVerification();
    return resultado;
  }


    async loginUser(email: string, clave: string) { 
      const result = this.afAuth.signInWithEmailAndPassword(email, clave); 
    return result;
  }
 

  public async LogOut() { 
    localStorage.removeItem('usuario_clinica');
    this.afAuth.signOut();
    //actualizar el firebase
  }


  getCurrentUserFirebase(): Observable<any> {
    return this.afAuth.authState;
  }
 


  async sendEmailVerification(){
    return (await this.afAuth.currentUser)?.sendEmailVerification();
  }
}
