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
import Swal from 'sweetalert2';
moment.locale('es')
@Component({
  selector: 'app-sacar-turno',
  templateUrl: './sacar-turno.component.html',
  styleUrls: ['./sacar-turno.component.css']
})
export class SacarTurnoComponent implements OnInit {

  paciente:Usuario | any;
  paciente_elegido?:any;
  especialidadesLista: Array<any> = [];
  especialidadElegida: string = '';
  especialistasDisponibles: Array<any> = [];
  listadoUsuariosEspecialistasCalificados: Array<any> = [];
  listadoPacientes:Array<any>=[];
  especialista_elegido: string = '';
  proximosQuinceDias: Array<any> = [];
  horarios_pre: Array<any> = [];
  horarios_final: Array<any> = [];
  constructor(private especialidadesSrv: EspecialidadesService, private especialistasSrv: UsuarioService
    , private horariosSrv: HorariosService, private turnoSrv:TurnosService, private authSrv:AuthService) {
    this.especialidadesSrv.traerEspecialidades().subscribe((res) => {
      this.especialidadesLista = res;
    });

    this.especialistasSrv.traerEspecialistas().subscribe((res: any) => {
      this.especialistasDisponibles = res

    });

    this.especialistasSrv.traerPacientes().subscribe((res: any) => {
      this.listadoPacientes = res 
    });
    this.proximosQuinceDias = this.calculaDiasProximos();

    this.paciente = (this.authSrv.getUsuarioActualLS());
   
    if(this.paciente.perfil!='administrador'){
      this.paciente_elegido=  this.paciente.uid
    }
  }

  ngOnInit(): void {

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

  pacienteElegido(paciente:any){
    this.paciente_elegido=paciente.uid;
  }

  especialidadCapturar(especialidad: string) { 
    this.listadoUsuariosEspecialistasCalificados = [];
    this.horarios_final = [];
    this.especialidadElegida = especialidad;

    this.especialistasDisponibles.forEach(especilista => { 
      especilista.espe?.forEach((especialidad: string) => {
        if (especialidad == this.especialidadElegida) { 
          this.listadoUsuariosEspecialistasCalificados.push(especilista);
        }
      });
    });
  }

  especialistaCapturar(uid: string) {  
    this.especialista_elegido = uid;

    let duracionMinEspecialidad: number = 30;
    this.horariosSrv.traerHorariosEspecialista_Especialidad(this.especialista_elegido, this.especialidadElegida).subscribe((res: any) => {
      this.horarios_final = [];
      if (res[0] == null) {
        Swal.fire('este especialista no tiene horarios cargados') 
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
        retorno[0].horarios.push({ hora: nuevaHora, disponible: true });
      } 

      this.turnoSrv.traerTurnosEspecialista_Especialidad(this.especialista_elegido, this.especialidadElegida).subscribe((turnos)=>{
        retorno[0].horarios.forEach((horario:any) => {
          turnos.forEach(turno => {
             
            if(turno.hora == horario.hora && turno.dia==retorno[0].dia){
              horario.disponible=false
             
            }
          }); 
        });
       });  
 
        return retorno;
  }

 

  reservarTurno(dia:any, hora:string){
    //mostrar para que confirme
    //si confirma se guarda sino se cancela
    Swal.fire({
      title: 'Turno elegido'+ dia+" "+hora,
      showDenyButton: true, 
      confirmButtonText: 'Guardar' 
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        let nuevoTurno={
          paciente_id: this.paciente_elegido,
          especialista_id: this.especialista_elegido,
          especialidad:this.especialidadElegida,
          dia:dia,
          hora:hora,
          estado:'pendiente confirmacion',
          comentario_rechazo:'',
          comentario_cancelacion:'',
          resenia:'',
          calificacion_atencion:0
    
        }
        this.turnoSrv.setItem(nuevoTurno).then(()=>{
          
          Swal.fire('Guardado!', '', 'success')
        })
       
      } else if (result.isDenied) {
        Swal.fire('Turno no guardado', '', 'info')
      }
    }) 
  }

}
