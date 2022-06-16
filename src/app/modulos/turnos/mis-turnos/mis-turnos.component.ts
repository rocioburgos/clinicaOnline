import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { EspecialidadesService } from 'src/app/servicios/especialidades/especialidades.service';
import { TurnosService } from 'src/app/servicios/turnos/turnos.service';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css']
})
export class MisTurnosComponent implements OnInit {
  paciente:any;
  especialidadesLista: Array<any> = [];
  especialistasDisponibles:Array<any>=[];
  turnosPaciente:Array<any>=[];
  constructor(private especialidadesSrv:EspecialidadesService, private especialistasSrv:UsuarioService, 
    private authSrv:AuthService, private turnosSrv:TurnosService) { 

    this.especialidadesSrv.traerEspecialidades().subscribe((res) => {
      this.especialidadesLista = res;
    });

    this.especialistasSrv.traerEspecialistas().subscribe((res: any) => {
      this.especialistasDisponibles = res

    });

    this.paciente= this.authSrv.getUsuarioActualLS();

    this.turnosPacienteActual();
  }

  ngOnInit(): void {
  }


  especialidadCapturar(especialidad: string) {
    console.log(especialidad)
  }


  especialistaCapturar(uid: string) { 
    console.log(uid);
    
  }

  turnosPacienteActual(){
    this.turnosSrv.traerTurnosPaciente(this.paciente.uid).subscribe((res)=>{
  //  this.turnosPaciente= res;
    //console.log(this.turnosPaciente)

      res.forEach(turno => {
        this.especialistasDisponibles.forEach(especialista => {
            if(turno.especialista_id== especialista.uid){
              let turnopush={...turno,'especialista':(especialista.apellido+', '+especialista.nombre)}
            this.turnosPaciente.push(turnopush);
            console.log(turnopush)
          } 
        });
      });
    })
  }



}
