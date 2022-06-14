import { Component, OnInit } from '@angular/core';
import { EspecialidadesService } from 'src/app/servicios/especialidades/especialidades.service';
import { HorariosService } from 'src/app/servicios/horarios/horarios.service';
import { SpinnerService } from 'src/app/servicios/spinner/spinner.service';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';
import { Moment } from 'moment';
import * as moment from 'moment';
moment.locale('es')
@Component({
  selector: 'app-sacar-turno',
  templateUrl: './sacar-turno.component.html',
  styleUrls: ['./sacar-turno.component.css']
})
export class SacarTurnoComponent implements OnInit {

  especialidadesLista: Array<any> = [];
  especialidadElegida: string = '';
  especialistasDisponibles: Array<any> = [];
  listadoUsuariosEspecialistasCalificados: Array<any> = [];
  especialista_elegido: string = '';
  proximosQuinceDias: Array<any> = [];
  horarios_final: Array<any> = [];
  constructor(private especialidadesSrv: EspecialidadesService, private especialistasSrv: UsuarioService
    , private horariosSrv: HorariosService) {
    this.especialidadesSrv.traerEspecialidades().subscribe((res) => {
      this.especialidadesLista = res;
    });

    this.especialistasSrv.traerEspecialistas().subscribe((res: any) => {
      this.especialistasDisponibles = res

    });

    this.proximosQuinceDias = this.calculaDiasProximos();
  }

  ngOnInit(): void {

  }

  especialidadCapturar(especialidad: string) {
    console.log(especialidad)
    this.listadoUsuariosEspecialistasCalificados = [];
    this.especialidadElegida = especialidad;

    this.especialistasDisponibles.forEach(especilista => { 
      especilista.espe?.forEach((especialidad: string) => {
        if (especialidad == this.especialidadElegida) {
          console.log(especialidad);
          this.listadoUsuariosEspecialistasCalificados.push(especilista);
        }
      });
    });
  }

  especialistaCapturar(uid: string) {
    this.horarios_final = [];
    console.log(uid);
    this.especialista_elegido = uid;

    let duracionMinEspecialidad: number = 30;
    this.horariosSrv.traerHorariosEspecialista_Especialidad(this.especialista_elegido, this.especialidadElegida).subscribe((res: any) => {

      if (res[0] == null) {
        console.log("este especialista no tiene horarios cargados")
      } else {
        this.proximosQuinceDias.forEach(dia => {

          res[0].horarios.forEach((element: any) => {
            if (dia.includes(element.dia) && element.trabaja) {
              this.horarios_final.push(this.calcularTurnos(duracionMinEspecialidad, dia, element.ingreso, element.salida));
            }
          });
        });

      }
    });

    console.log(this.horarios_final)
  }


  calculaDiasProximos() {
    let turnosSegunHorario: Array<any> = [];
    let formato = "dddd DD-MM-YYYY";
    for (let i = 0; i < 15; i++) {
      //turnosSegunHorario.push( moment().add(1,'days'));
      turnosSegunHorario.push((moment().add(i, 'day').format(formato)))
    }
    return turnosSegunHorario;
  }

  calcularTurnos(duracionTurno: number, dia: any, ingreso_param: string, salida_param: any) {
    let formato = "HH:mm";
    let retorno: Array<any> = [{ dia: dia, horarios: [] }];
    let ingreso = ingreso_param.split(':', 2);
    let salida = salida_param.split(':', 2);
    let inicio = moment({ hour: Number(ingreso[0]), minute: Number(ingreso[1]) });
    let final = moment({ hour: Number(salida[0]), minute: Number(salida[1]) });
    let cantidadTurnos = (final.diff(inicio, 'minute') / duracionTurno);
    let cantidadMinutos = cantidadTurnos * duracionTurno;


    for (let i = 0; i < cantidadMinutos; i += duracionTurno) {
      retorno[0].horarios.push({ hora: inicio.clone().add(i, 'minutes').format(formato), disponible: true });
    }
    return retorno;
  }

}
