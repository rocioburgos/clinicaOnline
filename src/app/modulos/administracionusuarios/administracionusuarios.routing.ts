import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { PanelEspecialistasComponent } from './panel-especialistas/panel-especialistas.component';
import { PrincipalComponent } from './principal/principal.component';

const routes: Routes = [
  {
      path:'', 
      component:PrincipalComponent
  },
  {
        path:'panelespecialistas', 
        component:PanelEspecialistasComponent},
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
export class AdministracionRoutingModule { }
