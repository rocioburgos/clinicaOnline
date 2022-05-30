import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { EspecialidadesService } from 'src/app/servicios/especialidades/especialidades.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FilesService } from 'src/app/servicios/files/files.service';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service'; 
@Component({
  selector: 'app-registro-especialista',
  templateUrl: './registro-especialista.component.html',
  styleUrls: ['./registro-especialista.component.css']
})
export class RegistroEspecialistaComponent  {

 //para el modal de crear especialidad
 @ViewChild("myModalConf", { static: false }) myModalConf?: TemplateRef<any>;

 especialidades: Array<any> = [];
 especialidadesElegidas: Array<any> = [];
 // Seleccionamos o iniciamos el valor '0' del <select>
 opcionSeleccionado: string = '0';
 verSeleccion: string = '';

 formularioEspecialista: FormGroup;
 formulario_Especialidad: FormGroup;
 completarForm = true;
 mensaje: string = '';
 img = '';
 mensajeImagen: string = '';
 image: any;

 public mensajeArchivo = 'No hay un archivo seleccionado';

 public nombreArchivo = '';
 public URLPublica = '';
 public porcentaje = 0;
 public finalizado = false;

 captcha: string;      // empty = not yet proven to be a human, anything else = human


 constructor(private fb: FormBuilder,
   private fbesp: FormBuilder,
   private router: Router,
   private usuariosSrv: UsuarioService,
   private especialidadesSrv: EspecialidadesService,
   private authSrv: AuthService,
   private fileSrv: FilesService,
   private modalService: NgbModal) {

   this.captcha = '';
   this.especialidadesSrv.traerEspecialidades().subscribe((res) => {
     this.especialidades = res;
   });



   this.formularioEspecialista = fbesp.group({
     nombre_: ['', Validators.required],
     apellido: ['', Validators.required],
     edad: ['', [Validators.required, Validators.min(18), Validators.max(99)]],
     dni: ['', [Validators.required, Validators.pattern('^[0-9]*$') ]],
     email: ['', [Validators.required, Validators.email]],
     clave: ['', Validators.required, Validators.minLength(6)],
     archivo: [null, [Validators.required]],
     especialidadCheck: [null, this.validarEspecialidad] 
     
   });

   this.formulario_Especialidad = fb.group({
     nombre: ['', [Validators.required]]
   });

 }
 

 validarEspecialidad(control: AbstractControl) {
   const especialidadesElegidas = control.value;
   if (especialidadesElegidas == null || especialidadesElegidas.length <= 0) {
     return { vacio: true }
   } else {
     return null;
   }
 }

 resolved(captchaResponse: string) {
   this.captcha = captchaResponse;
   console.log('resolved captcha with response: ' + this.captcha);
 }



 async aceptarEspecialista() {
   const formEspe = this.formularioEspecialista.value;
   this.completarForm = false;
   let datos = {
     nombre: formEspe.nombre_,
     apellido: formEspe.apellido,
     edad: formEspe.edad,
     dni: formEspe.dni,
     email: formEspe.email,
     clave: formEspe.clave,
     archivo: this.img,
     perfil: 'especialista',
     estado: 'pendiente',
     espe: this.especialidadesElegidas

   };

   try {
     const user = await this.authSrv.registerUser(datos.email, datos.clave).then((credential) => {
       this.usuariosSrv.setItemWithId(datos, credential.user.uid)
         .then(() => this.router.navigate(['activarUsuario']));;
     });
   } catch (error) {
     console.log(error);
     this.mensaje = '' + error;
   }
 }


 aceptarEspecialidad() {
   const form = this.formulario_Especialidad.value;
   this.completarForm = false;
   let datos = {
     nombre: form.nombre
   }

   this.especialidadesSrv.registrarEspecialidad(datos).then((res) => {
     console.log(datos);
     this.mensaje = 'Especialidad creada';
     this.modalService.open(this.myModalConf).close('Si');
   });
 }

 selEsp(event: any) {
   if (event.target.checked == true) {
     this.especialidadesElegidas.push(event.target.value);
   }
   else if (event.target.checked == false) {
     const indice = this.especialidadesElegidas.indexOf(event.target.value).valueOf();
     this.especialidadesElegidas.splice(indice, 1);
   }

   console.log(this.formularioEspecialista)
 }

 //Evento que se gatilla cuando el input de tipo archivo cambia
 public cambioArchivo(event: any) {
   this.image = event.target.files[0];
   this.subirArchivo(this.image);
 }

 //Sube el archivo a Cloud Storage
 async subirArchivo(data: any) {
   this.img = this.getFilePath()
   let task = this.fileSrv.uploadFile(this.img, data).then((res) => {
     res.ref.getDownloadURL()
       .then(ress => {
         console.log(ress)
         this.img = (ress);
       });
   });
 }

 getFilePath() {
   return new Date().getTime() + '-especialista';
 }


 mostrarModalEditar() {
   this.modalService.open(this.myModalConf).result.then(r => {
     console.log("Tu respuesta ha sido: " + r);
   }, error => {
     console.log(error);
   });
 }

 public generaCadenaAleatoria(n: number): string {
   let result = '';
   const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
   for (let i = 0; i < n; i++) {
     result += chars.charAt(Math.floor(Math.random() * chars.length));
   }
   return result;
 }

}
