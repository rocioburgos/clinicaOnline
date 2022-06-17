import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministradorLogueadoGuard } from 'src/app/guards/administrador-logueado.guard';
import { EspecialistalogueadoGuard } from 'src/app/guards/especialistalogueado.guard';
import { PacienteadminlogueadosGuard } from 'src/app/guards/pacienteadminlogueados.guard';
import { PacientelogueadoGuard } from 'src/app/guards/pacientelogueado.guard';
import { UsuarioIngresadoGuard } from 'src/app/guards/usuario-ingresado.guard';
import { MisTurnosComponent } from './mis-turnos/mis-turnos.component';
import { MisturnosEspecialistaComponent } from './misturnos-especialista/misturnos-especialista.component';
import { PrincipalTurnosComponent } from './principalTurnos/principal-turnos.component';
import { SacarTurnoComponent } from './sacar-turno/sacar-turno.component';
import { TurnosadminComponent } from './turnosadmin/turnosadmin.component';

const routes: Routes = [

  {path:'', component:PrincipalTurnosComponent},
  {path:'sacarturno', component:SacarTurnoComponent, canActivate:[ PacienteadminlogueadosGuard]},
  {path:'turnospaciente', component:MisTurnosComponent, canActivate:[PacientelogueadoGuard]},
  {path:'turnosespecialista', component:MisturnosEspecialistaComponent, canActivate:[EspecialistalogueadoGuard]},
  {path:'turnosadmin', component:TurnosadminComponent, canActivate:[AdministradorLogueadoGuard]},
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
export class TurnosRoutingModule { }
