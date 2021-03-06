import { Component, OnInit } from '@angular/core';
import { HistoriaService } from 'src/app/servicios/historia/historia.service';
import { TurnosService } from 'src/app/servicios/turnos/turnos.service';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mispacientes',
  templateUrl: './mispacientes.component.html',
  styleUrls: ['./mispacientes.component.css']
})
export class MispacientesComponent implements OnInit {
  listaHistoriaClinica: Array<any> = [];
  misPacientes: Array<any> = [];
  public usuario: any;

  constructor(private historiaSrv: HistoriaService, private turnoSrv: TurnosService,
    private usrSrv: UsuarioService) {

    this.ordenarHistorias();
    let ls = localStorage.getItem('usuario_clinica');
    if (ls != null) {
      this.usuario = JSON.parse(ls);
    }

    this.historiaSrv.traerHistoriasOrdenadas().subscribe((res) => {
      let count = 0;
      res.forEach(HC => {
        this.usrSrv.traerPacientes().subscribe((pacientes: any) => {
          pacientes.forEach((paciente: any) => {
            //hc paciente_id especialista_id
            if (HC.paciente_id == paciente.uid && HC.especialista_id == this.usuario.uid) {
              this.misPacientes.push(paciente)
              if (count < 3) {
                count++;
                this.listaHistoriaClinica.push({ mostrar: true, HC, paciente });
              } else {
                count++;
                this.listaHistoriaClinica.push({ mostrar: false, HC, paciente });
              }

            }
          });
        })
      });
    });
  }

  ordenarHistorias() {
    let hc: Array<any> = [{ dia: 'lunes 30-05-2022', hora: '08:00' }, { dia: 'martes 02-06-2022', hora: '08:00' }, { dia: 'lunes 07-05-2022', hora: '08:00' }];

    hc.forEach(element => {

    });

    console.log(hc.sort())
  }


  ngOnInit(): void {
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
