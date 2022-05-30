import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  formulario: FormGroup;
  mensaje: string = '';
  constructor(private fb: FormBuilder, private authSrv: AuthService, private router: Router,
    private usrSrv: UsuarioService) {
    this.formulario = fb.group({
      email: ['', [Validators.required, Validators.email]],
      clave: ['', Validators.required],
    });
  }
 

  async login() {
    const form = this.formulario.value;
    let datos = {
      email: form.email,
      clave: form.clave,
    };

    try {
      await this.authSrv.loginUser(datos.email, datos.clave).then(async (res) => { 
        const user = (await this.usrSrv.getUserByUid('' + res?.user?.uid).toPromise()).data(); 
        

        if (res.user?.emailVerified && user.perfil == 'administrador') {
          localStorage.setItem('usuario_clinica', JSON.stringify({ ...user })); 
          this.router.navigate(['panelUsuarios']);
        } else if (res.user?.emailVerified && user.perfil == 'especialista') {
          if (user.estado == 'aceptado') {
            localStorage.setItem('usuario_clinica', JSON.stringify({ ...user })); 
            this.router.navigate(['']);
          } else {
            console.log("querido especialista todavia no fue aceptado.");
            this.mensaje= 'querido especialista todavia no fue aceptado.';
          }
        } else if (res.user?.emailVerified && user.perfil == 'paciente') {
          localStorage.setItem('usuario_clinica', JSON.stringify({ ...user })); 
          this.router.navigate(['']);
        } else if (!res.user?.emailVerified) {
          this.router.navigate(['activarUsuario']);
        } else {
          this.router.navigate(['registro']);
        }
      }); 
    } catch (err) {
      console.log(err);
    }
  }


  completar(perfil: string) {
    if (perfil == 'especialista') {
      this.formulario.setValue({ 'email': 'rocioburgos00@gmail.com', 'clave': '123456' })
    } else if (perfil == 'administrador') {
      this.formulario.setValue({ 'email': 'clinica.adm2021@gmail.com', 'clave': '123456' })
    } else if (perfil == 'paciente') { 
      this.formulario.setValue({ 'email': 'juanperez.pac2021@gmail.com', 'clave': '123456' })
    }
  } 
}
