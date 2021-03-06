import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf'; 
import html2canvas from 'html2canvas';
 
import{Chart} from 'node_modules/chart.js'
import { EspecialidadesService } from 'src/app/servicios/especialidades/especialidades.service';
import { TurnosService } from 'src/app/servicios/turnos/turnos.service';
import moment from 'moment';
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
  
  public ahora= moment().format( "DD-MM-YYYY HH:mm");
  constructor( private espeSrv:EspecialidadesService,  private turnosSrv:TurnosService) { 
    
    this.turnosSrv.traerTurnos().subscribe((resp)=>{
      this.turnos= resp;
    });

    this.espeSrv.traerEspecialidades().subscribe((resp:any)=>{
     
      resp.forEach((esp:any) => {
        this.cant=0;
        this.labels.push(esp.nombre)
        this.turnos.forEach(turno => {
          
          if( esp.nombre == turno.especialidad){
            this.cant+=1;
          }
        });
        this.data.push(this.cant);  
      });
    });
  /*  setTimeout(() => { 

      const data = {
        labels: this.labels,
        datasets: [{
          label: 'Turnos por especialidad',
          data:this.data,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'Red'
          ],
          hoverOffset: 4
        }]
      };
      var pieChart = new Chart('turnosPorEspecialidad', {
        type: 'pie',
        data: data
      });
    }, 1000);
    */

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

  downloadPDF() {
    // Extraemos el
    const DATA:any = document.getElementById('divChart');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_.pdf`);
    });
  }
 
}
