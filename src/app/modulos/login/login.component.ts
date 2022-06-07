import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { SpinnerService } from 'src/app/servicios/spinner/spinner.service';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  formulario: FormGroup;
  mensaje: string = ''; 
  usuarios:any[]=[
    {email:'clinica.adm2021@gmail.com', clave:'123456', imagen:'./../../../assets/usuarios-login/admin.jpg'},
    {email:'leomessi@gmail.com', clave:'123456', imagen:'./../../../assets/usuarios-login/messi-perfil.jpg'},
    {email:'benito@gmail.com', clave:'123456', imagen:'./../../../assets/usuarios-login/benito-perfil.png'},
    {email:'shakira@gmail.com', clave:'123456', imagen:'./../../../assets/usuarios-login/shakira-perfil.jpg'},
    {email:'derek@gmail.com', clave:'123456', imagen:'./../../../assets/usuarios-login/neurologo.jpg'},
    {email:'miranda@gmail.com', clave:'123456', imagen:'./../../../assets/usuarios-login/general.jpg'}
  ]
  constructor(private fb: FormBuilder, private authSrv: AuthService, private router: Router,
    private usrSrv: UsuarioService, private spinnerSrv:SpinnerService) {
    this.formulario = fb.group({
      email: ['', [Validators.required, Validators.email]],
      clave: ['', Validators.required],
    });
  }
 

  async login() {
    this.spinnerSrv.show();
    const form = this.formulario.value;
    let datos = {
      email: form.email,
      clave: form.clave,
    };

    try {
      await this.authSrv.loginUser(datos.email, datos.clave).then(async (res) => { 
        const user = (await this.usrSrv.getUserByUid('' + res?.user?.uid).toPromise()).data(); 
        console.log(res.user?.uid);

        switch ( user.perfil) {
          case 'administrador':
            if(res.user?.emailVerified){
              localStorage.setItem('usuario_clinica', JSON.stringify({ ...user })); 
              //this.router.navigate(['panelUsuarios']);
            }else{
              this.mensaje='Debe verificar su email.';
              console.log(this.mensaje);
            }
            break;
          case 'especialista':
             if(res.user?.emailVerified){
              if (user.estado == 'aceptado') {
                localStorage.setItem('usuario_clinica', JSON.stringify({ ...user })); 
                 this.router.navigate(['']);
    
              } else {
                this.mensaje= 'querido especialista todavia no fue aceptado.';
              }
             }else {
              this.mensaje='Debe verificar su email.';
             }
          break;
             case 'paciente':
              if(res.user?.emailVerified){
                localStorage.setItem('usuario_clinica', JSON.stringify({ ...user })); 
                this.router.navigate(['']);
              }else{
                this.mensaje='Debe verificar su email.';
              }
             break;
          default:
            break;
        }

      }); 
    } catch (error) { 
      this.mensaje='Compruebe los datos ingresados';
      console.log(error);
    }finally{
      this.spinnerSrv.hide();
    }
  }


  completar(perfil: any) {
    this.formulario.setValue({'email':perfil.email , 'clave': perfil.clave})
  
  } 
}
