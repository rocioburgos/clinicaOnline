import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './pages/bienvenida/bienvenida.component';

const routes: Routes = [
  {path:'bienvenida', component:BienvenidaComponent},
  {path:'registro', loadChildren: () => import('./modulos/registro/registro.module').then(m => m.RegistroModule) },
  {path:'login', loadChildren: () => import('./modulos/login/login.module').then(m => m.LoginModule) },


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
