import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministradorLogueadoGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean { 

      let ls = localStorage.getItem('usuario_clinica');

      if( ls != null){
        let userJson =    JSON.parse(ls); 
        if(  userJson.perfil =='administrador'){
          return true;
        }
      }else{
        return   false;
      }

      return false;

  }
}
