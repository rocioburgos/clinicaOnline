import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroRoutingModule } from './registro-routing.module'; 
import { RegistroPrincipalComponent } from './registro-principal/registro-principal.component';
import { RegistroAdministradorComponent } from './registro-administrador/registro-administrador.component';
import { RegistroEspecialistaComponent } from './registro-especialista/registro-especialista.component';
import { RegistroPacienteComponent } from './registro-paciente/registro-paciente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ 
    RegistroPrincipalComponent,
    RegistroAdministradorComponent,
    RegistroEspecialistaComponent,
    RegistroPacienteComponent
  ],
  imports: [
    CommonModule,
    RegistroRoutingModule,
    FormsModule,
    ReactiveFormsModule ,
    
    NgbModule  //PARA LOS USAR LOS MODALES DE BOOTSTRAP
  ]
})
export class RegistroModule { }
