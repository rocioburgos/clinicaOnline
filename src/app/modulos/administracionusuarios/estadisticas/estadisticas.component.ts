import {  Component , ViewChild } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';
import { LogsesionService } from 'src/app/servicios/logsesion.service';
import { ArchivosService } from 'src/app/servicios/archivos/archivos.service';
import { EspecialidadesService } from 'src/app/servicios/especialidades/especialidades.service';
import { TurnosService } from 'src/app/servicios/turnos/turnos.service';
 
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent {
 
  sesiones:Array<any>=[];
  usuarios:Array<any>=[];
  usuarios_sesiones: Array<any>= [];
  especialidades:Array<any>=[];
  turnos:Array<any>=[];
 
  
  constructor(private logSesion:LogsesionService, private usrSrv:UsuarioService,
     private archivoSrv:ArchivosService, private espeSrv:EspecialidadesService,
     private turnosSrv:TurnosService) {
    this.logSesion.traerSesiones().subscribe((resp)=>{
      this.sesiones= resp;
    });

    this.usrSrv.traerTodos().subscribe((resp)=>{
      this.usuarios= resp;
    });
 
    this.espeSrv.traerEspecialidades().subscribe((resp:any)=>{
     
      this.especialidades= resp;
    });

     
    this.turnosSrv.traerTurnos().subscribe((resp)=>{
      this.turnos= resp;
    });

  }
 
 

  //contar ingresos al sistema por usuario, y los datos del usuario
  ingresosAlSistema():Array<any>{ 
   let usuarios_sesiones:Array<any>=[];
    this.sesiones.forEach(sesion => {
      this.usuarios.forEach(usuario=>{
      
        if(sesion.id == usuario.uid ){
         
        usuarios_sesiones.push({
            ...sesion,
            nombre:usuario.nombre, 
            apellido:usuario.apellido, 
            perfil:usuario.perfil})
        }
      })
    }); 
     return usuarios_sesiones;
  }

  //Turnos por especialidad
  //grafico a usar : de torta
  //recorrer las especialidades, y dentro recorrer los turnos
  //preguntando si el turno es de esa especialidad, y ahi se hace +1
  calcularTurnosPorEspecialidad(){
    let resultado:Array<any>=[];
    let cant=0;
    
    for(let i=0; i <this.especialidades.length; i++){
      console.log(this.especialidades[i] )
     cant=0;
     resultado[i]=({especialidad: this.especialidades[i].nombre, cantidadTurnos:0 })
      this.turnos.forEach(turno => {
        if(this.especialidades[i].nombre == turno.especialidad){
          cant+=1;
        }
      });
      resultado[i].cantidadTurnos= cant;  
    }
    return resultado;
  }

  descargar(opcion:number){
     
    switch (opcion) {
      case 1: 
         this.archivoSrv.exportAsExcelFile(this.ingresosAlSistema(), 'LogsUsuarios');
        break;
      case 2:
        this.calcularTurnosPorEspecialidad()
        break
    
      default:
        break;
    }
  }
  


}
