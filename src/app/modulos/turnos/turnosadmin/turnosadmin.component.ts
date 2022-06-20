import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { EspecialidadesService } from 'src/app/servicios/especialidades/especialidades.service';
import { TurnosService } from 'src/app/servicios/turnos/turnos.service';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-turnosadmin',
  templateUrl: './turnosadmin.component.html',
  styleUrls: ['./turnosadmin.component.css']
})
export class TurnosadminComponent implements OnInit {

  private usuario:any;
  especialidadesLista: Array<any> = [];
  turnosEspecialista: Array<any> = [];
 
  public filtro: string = ' ';
  pacientes: Array<any> = [];
  turnos: Array<any> = [];
  constructor(private turnosSrv: TurnosService, private authSrv: AuthService,
    private usrSrv: UsuarioService, private especialidadesSrv: EspecialidadesService) {}



  ngOnInit(): void {

    this.usuario = this.authSrv.getUsuarioActualLS();

    this.especialidadesSrv.traerEspecialidades().subscribe((res) => {
      this.especialidadesLista = res;
    });
    this.usrSrv.traerPacientes().subscribe((x) => {
      this.pacientes = x;
      //console.log( this.pacientes)
    }); 


    this.turnosSrv.traerTurnos().subscribe((res) => {
      res.forEach(turno => {
        this.pacientes.forEach(paciente => {
          if (turno.paciente_id == paciente.uid) {
            this.turnos.push({ ...turno, 'paciente': (paciente.apellido + ', ' + paciente.nombre) })
          }
        });
      });
    });
  }


 


  cancelarTurno(turno: any) {
    let comentario = '';
    Swal.fire({
      title: 'Seguro de cancelar el turno?',
      showDenyButton: true,
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          input: 'textarea',
          inputLabel: 'Comente porque cancela el turno',
          inputPlaceholder: 'Escriba su comentario...',
          inputAttributes: {
            'aria-label': 'Escriba su comentario...'
          },
          showCancelButton: true
        }).then((respuesta) => {
          console.log('motivo de cancelacion: ' + respuesta.value)
          
          comentario=respuesta.value;
          let turnoUpd = {
            dia: turno.dia,
            especialidad: turno.especialidad,
            especialista_id: turno.especialista_id,
            estado: 'cancelado',
            hora: turno.hora,
            paciente_id: turno.paciente_id,
            comentario_cancelacion: comentario,
            resenia: turno.resenia,
            comentario_rechazo: turno.comentario_rechazo,
            calificacion_atencion: turno.calificacion_atencion
          }
          this.turnosSrv.actualizarTurno(turno.doc_id, turnoUpd).then((fin)=>{
              Swal.fire('Turno cancelado') 
          });
        });
      }
    }); 

  }
}
