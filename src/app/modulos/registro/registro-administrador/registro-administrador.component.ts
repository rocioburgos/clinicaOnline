import { Component, OnInit } from '@angular/core';

import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { FilesService } from 'src/app/servicios/files/files.service';
import { SpinnerService } from 'src/app/servicios/spinner/spinner.service';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';
@Component({
  selector: 'app-registro-administrador',
  templateUrl: './registro-administrador.component.html',
  styleUrls: ['./registro-administrador.component.css']
})
export class RegistroAdministradorComponent implements OnInit {

  paciente: any;
  mensaje: string = '';
  formulario: FormGroup;
  completarForm = true;
  mensajeImagen: string = '';
  image: any;
  public mensajeArchivo = 'No hay un archivo seleccionado';
  public nombreArchivo = '';
  img = ''; 


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

      email: ['', [Validators.required, Validators.email]],
      clave: ['', Validators.required],
      archivo1: [null, Validators.required],
      captcha:[ null, [Validators.required]]
     
    });
  }

  ngOnInit(): void {
  }

  

  async aceptarAdministrador() {
    this.spinnerSrv.show();
    const form = this.formulario.value;
    this.completarForm = false;
    let datos = {
      nombre: form.nombre,
      apellido: form.apellido,
      edad: form.edad,
      dni: form.dni,
      email: form.email,
      clave: form.clave,
      archivo: this.img,
      perfil: 'administrador'

    }

    try {
      const user = await this.authSrv.registerUser(datos.email, datos.clave).then((credential) => {
        this.usuariosSrv.setItemWithId(datos, credential.user.uid)
          .then(() => {
            this.spinnerSrv.hide();
            this.router.navigate(['validaremail'])
          }
          );;
      });
    } catch (error) {
      this.spinnerSrv.hide();
      console.log(error);
      this.mensaje = '' + error;
    }


  }





  //Evento que se gatilla cuando el input de tipo archivo cambia
  public cambioArchivo(event: any) {
    this.image = event.target.files[0];
    this.subirArchivo(this.image);
  }

  //Sube el archivo a Cloud Storage
  async subirArchivo(data: any) {
    this.spinnerSrv.show();
    this.img = this.getFilePath()
    let task = this.fileSrv.uploadFile(this.img, data).then((res) => {
      res.ref.getDownloadURL()
        .then(ress => {
          this.spinnerSrv.hide();
          this.img = (ress);
        });
    });
  }

  getFilePath() {
    return new Date().getTime() + '-administrador';
  }

}
