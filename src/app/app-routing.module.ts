import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministradorLogueadoGuard } from './guards/administrador-logueado.guard';
import { EspecialistalogueadoGuard } from './guards/especialistalogueado.guard';
import { PacienteadminlogueadosGuard } from './guards/pacienteadminlogueados.guard';
import { UsuarioIngresadoGuard } from './guards/usuario-ingresado.guard';
import { BienvenidaComponent } from './pages/bienvenida/bienvenida.component';
import { CargarhorariosComponent } from './shared/cargarhorarios/cargarhorarios.component';
import { HistoriaClinicaComponent } from './shared/historia-clinica/historia-clinica.component';
import { MiperfilComponent } from './shared/miperfil/miperfil.component';
import { MispacientesComponent } from './shared/mispacientes/mispacientes.component';
import { ValidaremailComponent } from './shared/validaremail/validaremail.component';

const routes: Routes = [
  {path:'bienvenida', component:BienvenidaComponent},
  {path:'registro', loadChildren: () => import('./modulos/registro/registro.module').then(m => m.RegistroModule) },
  {path:'sesion', loadChildren: () => import('./modulos/login/login.module').then(m => m.LoginModule) },
  {
    path: 'administracion', 
    loadChildren: () => import('./modulos/administracionusuarios/administracionusuarios.module').then(m => m.AdministracionusuariosModule)
    ,canActivate:[AdministradorLogueadoGuard]
 },
 {
   path:'validaremail',
   component: ValidaremailComponent
 },
 {
  path:'miperfil',
  component: MiperfilComponent,
  canActivate:[UsuarioIngresadoGuard]
  },
  {
    path:'cargarHorarios',
    component: CargarhorariosComponent,
    canActivate:[EspecialistalogueadoGuard]
  },
  {
    path:'turnos', 
    loadChildren: () => import('./modulos/turnos/turnos.module').then(m => m.TurnosModule)
  },
  {
    path:'pacientes', 
    component:MispacientesComponent,
    canActivate: [EspecialistalogueadoGuard]
  },
  {
    path:'historiasclinicas', 
    component: HistoriaClinicaComponent,
    canActivate:[PacienteadminlogueadosGuard]
  },
  {
    path:'',
    redirectTo: 'bienvenida',
    pathMatch:'full'
  },
  {
    path:'**',
    redirectTo: 'bienvenida',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
