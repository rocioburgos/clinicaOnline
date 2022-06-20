import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { HorariosService } from 'src/app/servicios/horarios/horarios.service';
@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.component.html',
  styleUrls: ['./miperfil.component.css']
})
export class MiperfilComponent implements OnInit {

  public usuario: Usuario | any;
  tieneHorarios: boolean | any; //si este especialista tiene horarios seteados
  horarios: any;
  public iniciaJornada: any;
  trabaja: boolean | any;
  horarioIngreso: string = '';
  horarioSalida: string = '';
  uid:string='';
  perfil:string='';
  constructor(private router: Router, private horarioSrv: HorariosService) {
    let ls = localStorage.getItem('usuario_clinica');
    if (ls != null) {

      this.usuario = JSON.parse(ls);
      this.uid= this.usuario.uid;
      this.perfil= this.usuario.perfil;
    console.log( this.uid)
    }
  }

  listaDias: string[] = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
  listaHorarios: string[] = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
  listaHorariossalida: string[] = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];

  async ngOnInit() {
    this.horarioSrv.traerHorariosEspecialista(this.usuario.uid).subscribe((res) => {
      if (res) {
        this.tieneHorarios = true;
        this.horarios = res;
        console.log(this.horarios);
      } else {
        this.tieneHorarios = false;
      }
    });
  }

  cargarHorarios() {
    this.router.navigate(['cargarHorarios']);
  }


}
