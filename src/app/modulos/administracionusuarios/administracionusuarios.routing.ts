import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { PanelEspecialistasComponent } from './panel-especialistas/panel-especialistas.component';
import { PrincipalComponent } from './principal/principal.component';
import { TurnosusuarioComponent } from './turnosusuario/turnosusuario.component';

const routes: Routes = [
  {
    path: '',
    component: PrincipalComponent
  },
  {
    path: 'panelespecialistas',
    component: PanelEspecialistasComponent
  },
  {
    path: 'estadisticas',
    component: EstadisticasComponent
  },
  {
    path: 'turnosUsuario',
    component: TurnosusuarioComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
