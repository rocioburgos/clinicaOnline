import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  usuario:any;
  logeado?:boolean= false ;
  administrador?:boolean;
  especialista?:boolean;
  paciente?:boolean;
  constructor() {   
     let ls = localStorage.getItem('usuario_clinica');

    if( ls != null){
      this.logeado= true;
         this.usuario =    JSON.parse( ls); 
      if(  this.usuario.perfil =='administrador'){
          this.administrador= true;
      }else if(this.usuario.perfil =='especialista'){
        this.especialista= true;
      }else if(this.usuario.perfil =='paciente'){
        this.paciente= true;
      }
    }else{
      this.logeado= false;
    } 
  }

}
