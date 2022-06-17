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
import { NgHcaptchaModule } from 'ng-hcaptcha';
 

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
 
    
    NgbModule,  //PARA LOS USAR LOS MODALES DE BOOTSTRAP
     SpinnerModule,
    NgHcaptchaModule.forRoot({
      siteKey: '68328e4e-6b10-4bb6-a397-7149ba4eb852',
      languageCode: 'es' // optional, will default to browser language
  }),
  ],
  providers: [ ],
})
export class RegistroModule { }
