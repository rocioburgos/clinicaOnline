import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { HorariosService } from 'src/app/servicios/horarios/horarios.service';

@Component({
  selector: 'app-cargarhorarios',
  templateUrl: './cargarhorarios.component.html',
  styleUrls: ['./cargarhorarios.component.css']
})
export class CargarhorariosComponent implements OnInit {

  public usuario: any = null;
  public especialidades: any;
  especialidad_elegida: string = '0';
  tieneHorarios: boolean | any;
  horariosActuales: any;
  dias_check: Array<any> = [
    { dia: 'lunes', trabaja: false, ingreso: 0, salida: 0 },
    { dia: 'martes', trabaja: false, ingreso: 0, salida: 0 },
    { dia: 'miércoles', trabaja: false, ingreso: 0, salida: 0 },
    { dia: 'jueves', trabaja: false, ingreso: 0, salida: 0 },
    { dia: 'viernes', trabaja: false, ingreso: 0, salida: 0 },
    { dia: 'sábado', trabaja: false, ingreso: 0, salida: 0 }
  ];
  listaHorarios: string[] = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
  listaHorariossalida: string[] = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];

  constructor(private horariosSrv: HorariosService, private router: Router) {
    let ls = localStorage.getItem('usuario_clinica');
    if (ls != null) {
      this.usuario = JSON.parse(ls);
      this.especialidades = this.usuario.espe;
    }
  }

  ngOnInit(): void {
  }

  guardar() { 
    let especialidad_guardar = {
      uidEspecialista: this.usuario.uid,
      especialidad: this.especialidad_elegida,
      horarios: this.dias_check
    }

    if (this.tieneHorarios) {

      console.log('tiene horarios previos.->actualizar:: '+ this.horariosActuales.doc_id)
      

     this.horariosSrv.actualizarHorario( this.horariosActuales.doc_id, especialidad_guardar).finally(() => {
        this.router.navigate(['miperfil'])
      });
    } else {
      console.log('no tiene horarios previos->cargar de cero')
      
    this.horariosSrv.setItem(especialidad_guardar).finally(() =>
              this.router.navigate(['miperfil'])
            );
      } 

    }
  

  capturar() {
    console.log(this.especialidad_elegida);
    this.horariosSrv.traerHorariosEspecialista_Especialidad(this.usuario.uid, this.especialidad_elegida).subscribe((res) => {
       if(res.length==1){
        console.log(res[0].doc_id)
      
        this.horariosActuales= res[0];
         this.tieneHorarios=true;
       }else{
         this.tieneHorarios=false;
       }  
       console.log('hroarios= '+this.tieneHorarios) 
  })
  }
}
