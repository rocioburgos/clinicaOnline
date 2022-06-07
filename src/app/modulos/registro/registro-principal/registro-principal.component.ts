import { Component, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-registro-principal',
  templateUrl: './registro-principal.component.html',
  styleUrls: ['./registro-principal.component.css']
})
export class RegistroPrincipalComponent implements OnInit {

 //para el modal de crear especialidad
 @ViewChild("myModalConf", { static: false }) myModalConf?: TemplateRef<any>;

 paciente: boolean=false;
 especialista:boolean=false;
 administrador:boolean=false;
 pefil_actual:string='';

 
 verSeleccion: string = '';



 constructor(private _render:Renderer2) { 
     let x: any = JSON.parse(localStorage.getItem('usuario_clinica') || '{}');
     this.pefil_actual= x.perfil;
 }

 ngOnInit(): void {
   let script= this._render.createElement('script');
   script.defender = true;
   script.async= true;
   script.src='https://www.google.com/recaptcha/api.js';
   this._render.appendChild(document.body, script)
 }


 capturar(tipo:string) {
   // Pasamos el valor seleccionado a la variable verSeleccion


   switch (tipo) {

     case "paciente":
      this.paciente = true;
      this.especialista = false;
      this.administrador = false;
       break;
       case "especialista":
        this.especialista = true;
        this.paciente = false;
        this.administrador = false;
       break;
       case "admin":
        this.administrador= true;
        this.especialista = false;
        this.paciente = false;
       break;
       
     default:
      this.administrador= false;
      this.especialista = false;
      this.paciente = false;
       break;
   }
 
 }
}
