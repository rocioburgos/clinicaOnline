import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroAdministradorComponent } from './registro-administrador/registro-administrador.component';
import { RegistroEspecialistaComponent } from './registro-especialista/registro-especialista.component';
import { RegistroPacienteComponent } from './registro-paciente/registro-paciente.component';
import { RegistroPrincipalComponent } from './registro-principal/registro-principal.component';

const routes: Routes = [
  {path:'', component:RegistroPrincipalComponent},
  {path:'administrador', component:RegistroAdministradorComponent},
  {path:'paciente', component:RegistroPacienteComponent},
  {path:'especialista', component:RegistroEspecialistaComponent},
  {
    path:'**',
    redirectTo: '',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroRoutingModule { }
