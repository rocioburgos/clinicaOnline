import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioIngresadoGuard } from 'src/app/guards/usuario-ingresado.guard';
import { LoginComponent } from './login.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'login', component:LoginComponent},
  {path:'logout', component:LogoutComponent,  canActivate:[UsuarioIngresadoGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
