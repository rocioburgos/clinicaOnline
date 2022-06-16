import { Component, OnInit } from '@angular/core';
import { EspecialidadesService } from 'src/app/servicios/especialidades/especialidades.service';
import { HorariosService } from 'src/app/servicios/horarios/horarios.service';
import { SpinnerService } from 'src/app/servicios/spinner/spinner.service';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';
import { Moment } from 'moment';
import * as moment from 'moment';
import { TurnosService } from 'src/app/servicios/turnos/turnos.service';
import { AuthService } from 'src/app/servicios/auth/auth.service';
import { Usuario } from 'src/app/clases/usuario';
moment.locale('es')
@Component({
  selector: 'app-sacar-turno',
  templateUrl: './sacar-turno.component.html',
  styleUrls: ['./sacar-turno.component.css']
})
export class SacarTurnoComponent implements OnInit {

  paciente:Usuario | any;
  especialidadesLista: Array<any> = [];
  especialidadElegida: string = '';
  especialistasDisponibles: Array<any> = [];
  listadoUsuariosEspecialistasCalificados: Array<any> = [];
  especialista_elegido: string = '';
  proximosQuinceDias: Array<any> = [];
  horarios_final: Array<any> = [];
  constructor(private especialidadesSrv: EspecialidadesService, private especialistasSrv: UsuarioService
    , private horariosSrv: HorariosService, private turnoSrv:TurnosService, private authSrv:AuthService) {
    this.especialidadesSrv.traerEspecialidades().subscribe((res) => {
      this.especialidadesLista = res;
    });

    this.especialistasSrv.traerEspecialistas().subscribe((res: any) => {
      this.especialistasDisponibles = res

    });

    this.proximosQuinceDias = this.calculaDiasProximos();

    this.paciente = (this.authSrv.getUsuarioActualLS());
    console.log(this.paciente)
  }

  ngOnInit(): void {

  }

  especialidadCapturar(especialidad: string) {
    console.log(especialidad)
    this.listadoUsuariosEspecialistasCalificados = [];
    this.horarios_final = [];
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
    console.log(uid);
    this.especialista_elegido = uid;

    let duracionMinEspecialidad: number = 30;
    this.horariosSrv.traerHorariosEspecialista_Especialidad(this.especialista_elegido, this.especialidadElegida).subscribe((res: any) => {
      this.horarios_final = [];
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

    this.horarios_final.forEach(element => {
        console.log(element)
    }); 
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
      let nuevaHora=inicio.clone().add(i, 'minutes').format(formato);
      if(!this.turnoReservado(dia, nuevaHora,this.especialista_elegido, this.especialidadElegida)){
        retorno[0].horarios.push({ hora: nuevaHora, disponible: true });
      }
    
    }
    return retorno;
  }

  turnoReservado(dia:string, hora:string  ,especialista_id:string, especialidad:string ):boolean{
    //traer turnos de la especialista y la especialidad
    //ver si por ese dia y hora hay algun turno
    //si hay algun turno retornar true sino false
    let retorno=false;
    this.turnoSrv.traerTurnosEspecialista_Especialidad(especialista_id,especialidad).subscribe((res)=>{
       if(res[0]!=null){
         console.log(res[0]) 
          
         }  
       } )
      return retorno;
  }

  reservarTurno(dia:any, hora:string){
    console.log(dia+' -'+hora)
    let nuevoTurno={
      paciente_id: this.paciente.uid,
      especialista_id: this.especialista_elegido,
      especialidad:this.especialidadElegida,
      dia:dia,
      hora:hora,
      estado:'pendiente confirmacion'
    }
    this.turnoSrv.setItem(nuevoTurno)
  }

}
