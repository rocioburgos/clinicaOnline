import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { EspecialidadesService } from 'src/app/servicios/especialidades/especialidades.service';
import { TurnosService } from 'src/app/servicios/turnos/turnos.service';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-misturnos-especialista',
  templateUrl: './misturnos-especialista.component.html',
  styleUrls: ['./misturnos-especialista.component.css']
})
export class MisturnosEspecialistaComponent implements OnInit {

  color='';
  turnoFinalizado_flag = false;
  turnoFinalizado: any;
  especialidadesLista: Array<any> = [];
  turnosEspecialista: Array<any> = [];
  usuario: any;
  pacientes: Array<any> = [];
  turnos: Array<any> = [];
  public filtro: string = ' ';

  constructor(private turnosSrv: TurnosService, private authSrv: AuthService,
    private usrSrv: UsuarioService, private especialidadesSrv: EspecialidadesService) { }


  ngOnInit(): void {

    this.usuario = this.authSrv.getUsuarioActualLS();

    this.especialidadesSrv.traerEspecialidades().subscribe((res) => {
      this.especialidadesLista = res;
    });
    this.usrSrv.traerPacientes().subscribe((x) => {
      this.pacientes = x;
    });
    this.cargarTurno();


  }

  cargarTurno() {
    this.turnosSrv.traerTurnosEspecialista(this.usuario.uid).subscribe((res) => {
      res.forEach(turno => {
        this.pacientes.forEach(paciente => {
          if (turno.paciente_id == paciente.uid) {
            this.turnos.push({ ...turno, 'paciente': { apellido: paciente.apellido, nombre: paciente.nombre } })
          }
        });
      });
    });
  }

  aceptarTurno(turno: any, estadoNuevo: string) {

    turno.estado = estadoNuevo;
    let turnoUpd = {
      dia: turno.dia,
      especialidad: turno.especialidad,
      especialista_id: turno.especialista_id,
      estado: estadoNuevo,
      hora: turno.hora,
      paciente_id: turno.paciente_id,
      resenia: turno.resenia,
      comentario_cancelacion: turno.comentario_cancelacion,
      comentario_rechazo: turno.comentario_rechazo,
      calificacion_atencion: turno.calificacion_atencion
    }

    this.turnosSrv.actualizarTurno(turno.doc_id, turnoUpd).then((res) => {
      Swal.fire('Turno aceptado');
    });
  }

  rechazarTurno(turno: any, nuevoEstado: string) {
    Swal.fire({
      title: 'Seguro de rechazar el turno?',
      showDenyButton: true,
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          input: 'textarea',
          inputLabel: 'Comente porque rechaza el turno',
          inputPlaceholder: 'Escriba su comentario...',
          inputAttributes: {
            'aria-label': 'Escriba su comentario...'
          },
          showCancelButton: true
        }).then((respuesta) => {
          turno.estado = nuevoEstado;
          let turnoUpd = {
            dia: turno.dia,
            especialidad: turno.especialidad,
            especialista_id: turno.especialista_id,
            estado: nuevoEstado,
            hora: turno.hora,
            paciente_id: turno.paciente_id,
            comentario_rechazo: respuesta.value,
            resenia: turno.resenia,
            comentario_cancelacion: turno.comentario_cancelacion,
            calificacion_atencion: turno.calificacion_atencion
          }
          this.turnosSrv.actualizarTurno(turno.doc_id, turnoUpd).then((res) => {
            Swal.fire('Turno rechazado')
          });
        })
      }
    })
  }


  async cancelarTurno(turno: any, nuevoEstado: string) {
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
          turno.estado = nuevoEstado;
          comentario = respuesta.value;
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
          this.turnosSrv.actualizarTurno(turno.doc_id, turnoUpd).then((fin) => {
            Swal.fire('Turno cancelado')
          });
        });
      }
    });
  }

  async dejarResenia(turno: any) {
    let comentario = '';
    Swal.fire({
      input: 'textarea',
      inputLabel: 'Comente una reseña o diagnostico realizado',
      inputPlaceholder: 'Escriba su comentario...',
      inputAttributes: {
        'aria-label': 'Escriba su comentario...'
      },
      showCancelButton: true
    }).then((res) => {
      if (!res.isDismissed) {
        let turnoUpd = {
          dia: turno.dia,
          especialidad: turno.especialidad,
          especialista_id: turno.especialista_id,
          estado: 'finalizado',
          hora: turno.hora,
          paciente_id: turno.paciente_id,
          resenia: res.value,
          comentario_cancelacion: turno.comentario_cancelacion,
          comentario_rechazo: turno.comentario_rechazo,
          calificacion_atencion: turno.calificacion_atencion
        }
        turno.estado = 'finalizado';
        console.log(turnoUpd)
        this.turnosSrv.actualizarTurno(turno.doc_id, turnoUpd).then((res) => {
          this.turnoFinalizado_flag = true;
          this.turnoFinalizado = { ...turnoUpd, turno_id: turno.doc_id };
        });
      }
    })
  }

  manejarHistoria(event:any){
    this.turnoFinalizado_flag= event;
  }

  verResenia(turno: any) {
    Swal.fire({
      icon: 'info',
      title: 'Reseña',
      text: '' + turno.resenia
    })
  }

}
