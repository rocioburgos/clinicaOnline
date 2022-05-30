import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroRoutingModule } from './registro-routing.module'; 
import { RegistroPrincipalComponent } from './registro-principal/registro-principal.component';
import { RegistroAdministradorComponent } from './registro-administrador/registro-administrador.component';
import { RegistroEspecialistaComponent } from './registro-especialista/registro-especialista.component';
import { RegistroPacienteComponent } from './registro-paciente/registro-paciente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerModule } from 'src/app/shared/spinner/spinner.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerInterceptor } from 'src/app/shared/spinner/interceptors/spinner.interceptos';

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
    ,SpinnerModule
  ],
  providers: [{provide:  HTTP_INTERCEPTORS, useClass:SpinnerInterceptor, multi:true}],
})
export class RegistroModule { }
