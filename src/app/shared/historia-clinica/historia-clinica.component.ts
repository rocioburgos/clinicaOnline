import { Component, Input, OnInit } from '@angular/core';
import { title } from 'process';
import { Usuario } from 'src/app/clases/usuario';
import { HistoriaService } from 'src/app/servicios/historia/historia.service';
import { TurnosService } from 'src/app/servicios/turnos/turnos.service';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.css']
})
export class HistoriaClinicaComponent implements OnInit {

  public listaHistoriaClinica: Array<any> = [];
  public usuario: Usuario | any;
  public pacientes: Array<any> = [];

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

 
}
