import { Component, OnInit } from '@angular/core';
import { EspecialidadesService } from 'src/app/servicios/especialidades/especialidades.service';
import { HorariosService } from 'src/app/servicios/horarios/horarios.service';
import { SpinnerService } from 'src/app/servicios/spinner/spinner.service';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';
import { Moment } from 'moment';
import * as moment from 'moment';
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
  especialista_elegido:string='';
 
  horariosListado:Array<any>=[];
  horarios_treintaMin=['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','09:00','09:30','10:00' ]

  constructor(private especialidadesSrv: EspecialidadesService, private especialistasSrv: UsuarioService
    , private spinnerSrv: SpinnerService, private horariosSrv:HorariosService) {
    this.especialidadesSrv.traerEspecialidades().subscribe((res) => { 
      this.especialidadesLista = res;
    });

    this.especialistasSrv.traerEspecialistas().subscribe((res: any) => {
      this.especialistasDisponibles = res

    });
  }

  ngOnInit(): void {
 
  }

  especialidadCapturar(especialidad: string) {
    console.log(especialidad)
    this.listadoUsuariosEspecialistasCalificados = [];
    this.especialidadElegida = especialidad;

    this.especialistasDisponibles.forEach(especilista => {

      especilista.espe?.forEach((especialidad: string) => { 
        if (especialidad ==  this.especialidadElegida) {
          console.log(especialidad);
          this.listadoUsuariosEspecialistasCalificados.push(especilista);
        }
      });
    }); 

  }

  especialistaCapturar(uid:string){
    console.log(uid);
    this.especialista_elegido= uid;
 
    let duracionMinEspecialidad:number=30;
     let horariosdisponibles:Array<any>=[];
    this.horariosSrv.traerHorariosEspecialista_Especialidad(this.especialista_elegido,this.especialidadElegida ).subscribe((res:any) => {
    
      if(res[0]==null){
        console.log("este especialista no tiene horarios cargados")
      }else{
         res[0].horarios.forEach((element:any) => {
            if(element.trabaja){
              console.log(element);
              this.calculaTurnos(element);
              
            }
         });  
      }
    })
  }


  calculaTurnos(data: any) {
     let turnosSegunHorario:Array<any>=[];
     let formato="DD-MM-YYYY HH:mm";
     let hoy= moment();
    
     for(let i=0; i<=15; i++){ 
       //turnosSegunHorario.push( moment().add(1,'days'));
       console.log( moment().add(i,'week'))
     }
      
     console.log(turnosSegunHorario)
  }

}
