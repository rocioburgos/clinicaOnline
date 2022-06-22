import { Component, OnInit } from '@angular/core';

import{Chart} from 'node_modules/chart.js'
import { EspecialidadesService } from 'src/app/servicios/especialidades/especialidades.service';
import { TurnosService } from 'src/app/servicios/turnos/turnos.service';
@Component({
  selector: 'app-turnosporespecialidad',
  templateUrl: './turnosporespecialidad.component.html',
  styleUrls: ['./turnosporespecialidad.component.css']
})
export class TurnosporespecialidadComponent implements OnInit {
  especialidades:Array<any>=[];
  turnos:Array<any>=[];
  labels:Array<string>=[];
  data:Array<number>=[];
  cant=0;
  constructor( private espeSrv:EspecialidadesService,  private turnosSrv:TurnosService) { 
    
    this.turnosSrv.traerTurnos().subscribe((resp)=>{
      this.turnos= resp;
    });

    this.espeSrv.traerEspecialidades().subscribe((resp:any)=>{
     
      resp.forEach((esp:any) => {
        this.cant=0;
        this.labels.push(esp.nombre)
        this.turnos.forEach(turno => {
          console.log(turno.especialidad)
          if( esp.nombre == turno.especialidad){
            this.cant+=1;
          }
        });
        this.data.push(this.cant);  
      });
    });


  //  this.data= this.calcularTurnosPorEspecialidad();
    console.log(this.data)
  }

  ngOnInit(): void {
       
  const myChart = new Chart( "turnosPorEspecialidad", {
    type: 'bar',
    data: {
        labels: this.labels,
        datasets: [{
            
            data:this.data,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    } 
});
  }
 
}
