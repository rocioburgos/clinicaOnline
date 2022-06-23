import { Component, Input, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import moment from 'moment';
import { Chart } from 'node_modules/chart.js'
import html2canvas from 'html2canvas';
import { TurnosService } from 'src/app/servicios/turnos/turnos.service';

@Component({
  selector: 'app-turnospordia',
  templateUrl: './turnospordia.component.html',
  styleUrls: ['./turnospordia.component.css']
})
export class TurnospordiaComponent implements OnInit {
 
  labels: Array<string> = ['Lunes', 'Martes'];
  data: Array<number> = [];
  dias: Array<any> = [];
  turnos_ordenados:Array<any>=[];
  public ahora = moment().format("DD-MM-YYYY HH:mm");
  turnosLista: Array<any> = []

  constructor(private turnos: TurnosService) {
    this.turnos.traerTurnos_ordenadosDia().subscribe((resp)=>{
      this.turnos_ordenados= resp;
      resp.forEach((el:any)=>{
        if(!this.dias.includes(el.dia)){
          this.dias.push(el.dia) 
        } 
      });
    });

    setTimeout(() =>{
      let cont=0;
      this.dias.forEach((dia:any)=>{
        cont=0;
        this.turnos_ordenados.forEach((turno:any)=>{
          if(dia==turno.dia){
            cont+=1;
          }
        })
        console.log(cont)
        this.data.push(cont)
      })
  
      console.log(this.data)
    }, 1000);
   
 
  }

ngOnInit(): void {

  
  const myChart = new Chart("turnosPorDia", {
    type: 'line',
    data: {
      labels: this.dias,
      datasets: [{
        label: 'Turnos por dia',
        data: this.data,
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
  const DATA: any = document.getElementById('divChart');
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
