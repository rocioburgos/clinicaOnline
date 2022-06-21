import { Component,  OnInit } from '@angular/core';
 
import { Usuario } from 'src/app/clases/usuario';
import { HistoriaService } from 'src/app/servicios/historia/historia.service';
import { TurnosService } from 'src/app/servicios/turnos/turnos.service';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';
import Swal from 'sweetalert2';
import moment from 'moment'; 
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
 
@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.css']
})
export class HistoriaClinicaComponent implements OnInit {
  
  public listaHistoriaClinica: Array<any> = [];
  public usuario: Usuario | any;
  public pacientes: Array<any> = [];
  public ahora= moment().format( "DD-MM-YYYY HH:mm");
  atencion_descarga:any;
  mostrarTabla= false;
  constructor(private historiaSrv: HistoriaService, private turnoSrv: TurnosService, private usrSrv: UsuarioService) {
   
    let ls = localStorage.getItem('usuario_clinica');
    if (ls != null) {
      this.usuario = JSON.parse(ls);
    }

    if (this.usuario.perfil == 'paciente') { 
      this.historiaSrv.traerHistorias_paciente(this.usuario.uid).subscribe((res) => { 
       this.listaHistoriaClinica = res; 
      });

    }else if( this.usuario.perfil=='administrador'){
   
      this.historiaSrv.traerHistorias().subscribe((res) => {
     
        res.forEach(HC => {
          this.usrSrv.traerPacientes().subscribe((pacientes: any) => {
            pacientes.forEach((paciente: any) => {
                //hc paciente_id especialista_id
                if( HC.paciente_id== paciente.uid  ){
              
                  this.listaHistoriaClinica.push({HC,paciente});
                 
                }
            }); 
          })
        });
      }); 
    }  
  }

  ngOnInit(): void {
  
    console.log(this.pacientes)
  }

  verHistoria(atencion: any) {
    let opcionales: string = '';
    atencion.opcionales.forEach((opc: any) => {
      if (opc.key != '') {
        opcionales += ('' + opc.key + ': ' + opc.value + '<br>')
      }
    });
    Swal.fire(
      {
        title: (atencion.dia + ' ' + atencion.hora + '<hr>' + atencion.especialidad),
        icon: 'info',
        html: "Peso: " + atencion.peso + "<br>" + "Altura:" + atencion.altura + "<br>" + "Presion: " +
          atencion.presion + "<br>" + "Temperatura:" + atencion.temperatura + "<br>" + opcionales
      }) 
  }
 

  descargar(HC:any){
    this.mostrarTabla=true;
    this.atencion_descarga= HC;
  }
  
  downloadPDF() {
    // Extraemos el
    const DATA:any = document.getElementById('descarga');
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
      docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
    });
  }

 
}
