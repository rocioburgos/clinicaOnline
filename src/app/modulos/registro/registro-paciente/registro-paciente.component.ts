import { Component, OnInit } from '@angular/core';

import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { FilesService } from 'src/app/servicios/files/files.service';
import { SpinnerService } from 'src/app/servicios/spinner/spinner.service';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';
 
@Component({
  selector: 'app-registro-paciente',
  templateUrl: './registro-paciente.component.html',
  styleUrls: ['./registro-paciente.component.css']
})
export class RegistroPacienteComponent implements OnInit {

  paciente: any;
  mensaje: string = '';
  formulario: FormGroup;
  completarForm = true;
  mensajeImagen: string = '';
 
  public mensajeArchivo = 'No hay un archivo seleccionado';

  public nombreArchivo = '';
  img1 = ''; 
  img2= ''; 
  image: any;
 


  constructor(private fb: FormBuilder,
    private authSrv: AuthService,
    private usuariosSrv: UsuarioService,
    private router: Router,
    private fileSrv: FilesService,
    private spinnerSrv: SpinnerService) {
    this.paciente = null;
  
    this.formulario = fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(10), Validators.minLength(10)]],
      obraSocial: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      clave: ['', Validators.required],
      archivo1: [null, [Validators.required]],
      archivo2: [null, [Validators.required]],
      captcha:[ null, [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

 


  async aceptarPaciente() {
    this.spinnerSrv.show();
    const form = this.formulario.value;
    this.completarForm = false;
    let datos = {
      nombre: form.nombre,
      apellido: form.apellido,
      edad: form.edad,
      dni: form.dni,
      email: form.email,
      obraSocial: form.obraSocial,
      clave: form.clave,
      archivo1: this.img1,
      archivo2: this.img2,
      perfil: 'paciente'
    }

    try {
      const user = await this.authSrv.registerUser(datos.email, datos.clave).then((credential) => {
        this.usuariosSrv.setItemWithId(datos, credential.user.uid)
          .then(() => {
            this.spinnerSrv.hide();
            this.router.navigate(['validaremail'])
          });;
      });
    } catch (error) {
      console.log(error);
      this.spinnerSrv.hide();
      this.mensaje = '' + error;
    }


  }

 //Evento que se gatilla cuando el input de tipo archivo cambia
 public cambioArchivo(event: any, num:number) {
  this.image = event.target.files[0];
  this.subirArchivo(this.image, num);
}

//Sube el archivo a Cloud Storage
async subirArchivo(data: any, num:number) {
 this.spinnerSrv.show();
 if(num==1){
  this.img1 = this.getFilePath()
  let task = this.fileSrv.uploadFile(this.img1, data).then((res) => {
    res.ref.getDownloadURL()
      .then(ress => {
       this.spinnerSrv.hide();
        console.log(ress)
        
          this.img1 = (ress);
       
       
      });
  });
 }else{
  this.img2 = this.getFilePath()
  let task = this.fileSrv.uploadFile(this.img2, data).then((res) => {
    res.ref.getDownloadURL()
      .then(ress => {
       this.spinnerSrv.hide();
        console.log(ress)
     
          this.img2 = (ress);
      
       
      });
  });
 }
 
}

getFilePath() {
  return new Date().getTime() + '-paciente';
}


 

}