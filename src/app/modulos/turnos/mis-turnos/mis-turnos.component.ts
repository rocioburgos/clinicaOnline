import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Component, OnInit } from '@angular/core';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { EspecialidadesService } from 'src/app/servicios/especialidades/especialidades.service';
import { TurnosService } from 'src/app/servicios/turnos/turnos.service';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css']
})
export class MisTurnosComponent implements OnInit {
  public paciente: any;
  public especialidadesLista: Array<any> = [];
  public especialistasDisponibles: Array<any> = [];
  public turnosPaciente: Array<any> = [];
  public filtro: string = '';

  constructor(private especialidadesSrv: EspecialidadesService, private especialistasSrv: UsuarioService,
    private authSrv: AuthService, private turnosSrv: TurnosService) {

    this.especialidadesSrv.traerEspecialidades().subscribe((res) => {
      this.especialidadesLista = res;
    });

    this.especialistasSrv.traerEspecialistas().subscribe((res: any) => {
      this.especialistasDisponibles = res

    });

    this.paciente = this.authSrv.getUsuarioActualLS();

    this.turnosPacienteActual();

    console.log(this.turnosPaciente)
  }

  ngOnInit(): void {
  }


  turnosPacienteActual() {
    this.turnosSrv.traerTurnosPaciente(this.paciente.uid).subscribe((res) => {
      //  this.turnosPaciente= res;
      //console.log(this.turnosPaciente)

      res.forEach(turno => {
        this.especialistasDisponibles.forEach(especialista => {
          if (turno.especialista_id == especialista.uid) {
            let turnopush = { ...turno, 'especialista': (especialista.apellido + ', ' + especialista.nombre) }
            this.turnosPaciente.push(turnopush);

          }
        });
      });
    })
  }


  async cancelarTurno(turno: any) {
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
      estado: 'cancelado',
      hora: turno.hora,
      paciente_id: turno.paciente_id,
      comentario_cancelacion: comentario,
      resenia: turno.resenia,
      comentario_rechazo: turno.comentario_rechazo,
      calificacion_atencion:turno.calificacion_atencion
    }
    this.turnosSrv.actualizarTurno(turno.doc_id, turnoUpd);
  }

  verResenia(turno: any) {
    Swal.fire({
      icon: 'info',
      title: 'Reseña',
      text: '' + turno.resenia
    })
  }

  async completarEncuesta(turno: any) {
    const inputOptions = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          '#ff0000': 'Red',
          '#00ff00': 'Green',
          '#0000ff': 'Blue'
        })
      }, 1000)
    });

    const { value: color } = await Swal.fire({
      title: 'Select color',
      input: 'radio',
      inputOptions: inputOptions
    })


  }

 async calificarAtencion(turno: any) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

     Swal.fire({
      title: 'Califique la atencion',
      icon: 'question',
      input: 'range',
      inputLabel: 'Tu puntaje',  
      inputValue: 0, 
      showCancelButton:true
    }).then((result)=>{
      console.log(result)

      if (result.isConfirmed) {
        //actualizar
        let turnoUpd = {
          dia: turno.dia,
          especialidad: turno.especialidad,
          especialista_id: turno.especialista_id,
          estado: 'cancelado',
          hora: turno.hora,
          paciente_id: turno.paciente_id,
          comentario_cancelacion: turno.comentario_cancelacion,
          resenia: turno.resenia,
          comentario_rechazo: turno.comentario_rechazo,
          calificacion_atencion: result.value
        }
        this.turnosSrv.actualizarTurno(turno.doc_id, turnoUpd).finally(()=>{
          swalWithBootstrapButtons.fire(
            'Calificado!' 
          )
        });


      } else if(result.isDismissed){
        swalWithBootstrapButtons.fire(
          'Cancelado!' 
        )
      }
    });

    

  }

}
