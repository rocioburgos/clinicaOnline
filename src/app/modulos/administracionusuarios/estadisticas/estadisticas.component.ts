import {  Component , OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';
import { LogsesionService } from 'src/app/servicios/logsesion.service';
import { ArchivosService } from 'src/app/servicios/archivos/archivos.service';
import { EspecialidadesService } from 'src/app/servicios/especialidades/especialidades.service';
import { TurnosService } from 'src/app/servicios/turnos/turnos.service';
 
@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
 
  sesiones:Array<any>=[];
  usuarios:Array<any>=[];
  usuarios_sesiones: Array<any>= [];
  especialidades:Array<any>=[];
  turnos:Array<any>=[];
  mostrarTurnosEspecialidad:boolean= false;
  
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
 
 ngOnInit(): void {
 
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


  descargar(opcion:number){
     
    switch (opcion) {
      case 1: 
         this.archivoSrv.exportAsExcelFile(this.ingresosAlSistema(), 'LogsUsuarios');
        break;
      case 2:
        this.mostrarTurnosEspecialidad=true;
        break
    
      default:
        break;
    }
  }
  


}
