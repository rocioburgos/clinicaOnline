import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministradorLogueadoGuard } from 'src/app/guards/administrador-logueado.guard';
import { PacienteadminlogueadosGuard } from 'src/app/guards/pacienteadminlogueados.guard';
import { UsuarioIngresadoGuard } from 'src/app/guards/usuario-ingresado.guard';
import { PrincipalTurnosComponent } from './principalTurnos/principal-turnos.component';
import { SacarTurnoComponent } from './sacar-turno/sacar-turno.component';

const routes: Routes = [

  {path:'', component:PrincipalTurnosComponent},
  {path:'sacarturno', component:SacarTurnoComponent, canActivate:[ PacienteadminlogueadosGuard]},
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
