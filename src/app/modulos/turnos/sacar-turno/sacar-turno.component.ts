import { Component, OnInit } from '@angular/core';
import { EspecialidadesService } from 'src/app/servicios/especialidades/especialidades.service';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';

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

  constructor(private especialidadesSrv: EspecialidadesService, private especialistasSrv: UsuarioService) {
    this.especialidadesSrv.traerEspecialidades().subscribe((res) => {
      console.log(res);
      this.especialidadesLista = res;
    });

    this.especialistasSrv.traerEspecialistas().subscribe((res: any) => {
      this.especialistasDisponibles = res

    });
  }

  ngOnInit(): void {
  }

  especialidadCapturar(especialidad: string) {
    this.listadoUsuariosEspecialistasCalificados = [];
    this.especialidadElegida = especialidad; 

    this.especialistasDisponibles.forEach(especilista => {
      especilista.espe?.forEach((especialidad: any) => {
       
        if (especialidad == this.especialidadElegida) {
          console.log(especialidad);
          this.listadoUsuariosEspecialistasCalificados.push(especilista);
        }
      });
    });
  }

}
