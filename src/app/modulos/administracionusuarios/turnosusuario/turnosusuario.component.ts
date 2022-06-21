import { Component, OnInit } from '@angular/core';
import { TurnosService } from 'src/app/servicios/turnos/turnos.service';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';

@Component({
  selector: 'app-turnosusuario',
  templateUrl: './turnosusuario.component.html',
  styleUrls: ['./turnosusuario.component.css']
})
export class TurnosusuarioComponent implements OnInit {

  public usuarios:Array<any>=[];
  public turnos:Array<any>=[];
  constructor(private usuariosSrv:UsuarioService, private turnosSrv:TurnosService) {

    this.usuariosSrv.traerPacientes().subscribe((res:any)=>{
      this.usuarios= res
    });
 
   }

  ngOnInit(): void {
  }
  pacienteElegido(id:string){
    this.turnosSrv.traerTurnosPaciente(id).subscribe((res)=>{
      this.turnos= res;
    })
  }

}
