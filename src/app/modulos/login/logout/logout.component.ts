import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authSv: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  async onLogout(){
    try {
      await this.authSv.LogOut().then(()=>{ 
        this.router.navigate(['/login']);
      });
      
    } catch (error) {
      console.log("Error al cerrar sesion" + error);
    }
  } 

}
