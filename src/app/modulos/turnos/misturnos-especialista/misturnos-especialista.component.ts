import { Component, OnInit } from '@angular/core';
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

  especialidadesLista: Array<any> = [];
  turnosEspecialista: Array<any> = [];
  usuario: any;
  pacientes: Array<any> = [];
  turnos: Array<any> = [];
  public filtro: string = ' ';
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
    this.cargarTurno();
  }

  cargarTurno(){
    this.turnosSrv.traerTurnosEspecialista(this.usuario.uid).subscribe((res) => {
  res.forEach(turno => {
    this.pacientes.forEach(paciente => {
      if (turno.paciente_id == paciente.uid) {
        this.turnos.push({ ...turno, 'paciente': (paciente.apellido + ', ' + paciente.nombre) })
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
      resenia:turno.resenia,
      comentario_cancelacion:turno.comentario_cancelacion,
      comentario_rechazo:  turno.comentario_rechazo,
      calificacion_atencion:turno.calificacion_atencion
    }

    this.turnosSrv.actualizarTurno(turno.doc_id, turnoUpd);
  }

  async rechazarTurno(turno: any, nuevoEstado: string) {
    let comentario = '';
    const { value: text } = await Swal.fire({
      input: 'textarea',
      inputLabel: 'Comente porque rechaza el turno',
      inputPlaceholder: 'Escriba su comentario...',
      inputAttributes: {
        'aria-label': 'Escriba su comentario...'
      },
      showCancelButton: true
    }) 

     
    comentario = text;

    let turnoUpd = {
      dia: turno.dia,
      especialidad: turno.especialidad,
      especialista_id: turno.especialista_id,
      estado: nuevoEstado,
      hora: turno.hora,
      paciente_id: turno.paciente_id,
      comentario_rechazo: comentario,
      resenia:turno.resenia,
      comentario_cancelacion:turno.comentario_cancelacion,
      calificacion_atencion: turno.calificacion_atencion
    } 
    this.turnosSrv.actualizarTurno(turno.doc_id, turnoUpd);
  }


  async cancelarTurno(turno: any, nuevoEstado: string) {
    let comentario = '';
    const { value: text } = await Swal.fire({
      input: 'textarea',
      inputLabel: 'Comente porque cancela el turno',
      inputPlaceholder: 'Escriba su comentario...',
      inputAttributes: {
        'aria-label': 'Escriba su comentario...'
      },
      showCancelButton: true
    }) 

     
    comentario = text;

    let turnoUpd = {
      dia: turno.dia,
      especialidad: turno.especialidad,
      especialista_id: turno.especialista_id,
      estado: nuevoEstado,
      hora: turno.hora,
      paciente_id: turno.paciente_id,
      comentario_cancelacion: comentario,
      resenia: turno.resenia, 
      comentario_rechazo: turno.comentario_rechazo,
      calificacion_atencion:turno.calificacion_atencion
    } 
    this.turnosSrv.actualizarTurno(turno.doc_id, turnoUpd);
  }

  async dejarResenia(turno:any){
    let comentario = '';
    const { value: text } = await Swal.fire({
      input: 'textarea',
      inputLabel: 'Comente una reseña o diagnostico realizado',
      inputPlaceholder: 'Escriba su comentario...',
      inputAttributes: {
        'aria-label': 'Escriba su comentario...'
      },
      showCancelButton: true
    }) 

     
    comentario = text;
  
    let turnoUpd = {
      dia: turno.dia,
      especialidad: turno.especialidad,
      especialista_id: turno.especialista_id,
      estado: 'finalizado',
      hora: turno.hora,
      paciente_id: turno.paciente_id,
      resenia: ''+comentario, 
      comentario_cancelacion:turno.comentario_cancelacion,
      comentario_rechazo: turno.comentario_rechazo,
      calificacion_atencion: turno.calificacion_atencion
    } 

      console.log(turnoUpd)
    this.turnosSrv.actualizarTurno(turno.doc_id, turnoUpd);
  }

  verResenia(turno:any){
    Swal.fire({
      icon: 'info',
      title: 'Reseña',
      text: ''+ turno.resenia 
    })
  }

}
