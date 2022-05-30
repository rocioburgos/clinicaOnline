import { Component, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-registro-principal',
  templateUrl: './registro-principal.component.html',
  styleUrls: ['./registro-principal.component.css']
})
export class RegistroPrincipalComponent implements OnInit {

 //para el modal de crear especialidad
 @ViewChild("myModalConf", { static: false }) myModalConf?: TemplateRef<any>;

 paciente: any;
 especialista:any;
 administrador:any;
 tipoUsuario:Array<string> = [];

 // Seleccionamos o iniciamos el valor '0' del <select>
 opcionSeleccionado: string = '0';
 verSeleccion: string = '';



 constructor(private _render:Renderer2) {
   this.paciente = null;
   this.especialista = null;
   this.administrador = null;
     let x: any = JSON.parse(localStorage.getItem('usuario_clinica') || '{}');
     if(x.perfil =='administrador'){
       this.tipoUsuario =['Especialista', 'Paciente', 'Administrador'];
     }else{
       this.tipoUsuario = ['Especialista', 'Paciente'];
     }


   
 }

 ngOnInit(): void {
   let script= this._render.createElement('script');
   script.defender = true;
   script.async= true;
   script.src='https://www.google.com/recaptcha/api.js';
   this._render.appendChild(document.body, script)
 }


 capturar() {
   // Pasamos el valor seleccionado a la variable verSeleccion
   this.verSeleccion = this.opcionSeleccionado;
   if (this.verSeleccion == 'Paciente') {
     this.paciente = true;
     this.especialista = false;
     this.administrador = false;
   } else if(this.verSeleccion == 'Especialista') {
     this.especialista = true;
     this.paciente = false;
     this.administrador = false;
   }else{
     this.administrador= true;
     this.especialista = false;
     this.paciente = false;
   }
 }
}
