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
  especialidad_elegida: string='Pediatria';
  tieneHorarios:boolean|any;
  horariosActuales:any;
  dias_check: Array<any> = [
    { dia: 'Lunes', trabaja: false, ingreso: 0, salida: 0 },
    { dia: 'Martes', trabaja: false, ingreso: 0, salida: 0 },
    { dia: 'Miercoles', trabaja: false, ingreso: 0, salida: 0 },
    { dia: 'Jueves', trabaja: false, ingreso: 0, salida: 0 },
    { dia: 'Viernes', trabaja: false, ingreso: 0, salida: 0 },
    { dia: 'Sabado', trabaja: false, ingreso: 0, salida: 0 }
  ];


  listaHorarios: string[] = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
  listaHorariossalida: string[] = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];

  constructor(private horariosSrv: HorariosService, private router: Router) {
    let ls = localStorage.getItem('usuario_clinica');
    if (ls != null) {
      this.usuario = JSON.parse(ls);
      this.especialidades = this.usuario.espe;
    }


    this.horariosSrv.traerHorariosEspecialista(this.usuario.uid ).subscribe((res)=>{
      this.horariosActuales=res;
      this.tieneHorarios=true;
    })
  }

  ngOnInit(): void {
  }

  guardar() {
    console.log("especialidad elegida_: "+this.especialidad_elegida)
 

    let especialidad_guardar = {
      uidEspecialista: this.usuario.uid,
      especialidad: ''+this.especialidad_elegida,
      horarios: this.dias_check
    }

    if(this.tieneHorarios  ){
    
        alert('jeje')
     
      
      /*this.horariosSrv.actualizarHorario( this.horariosActuales.doc_id, especialidad_guardar).finally(() => {
        this.router.navigate(['miperfil'])
      });*/
    }else{
      console.log('asdasd')
      /*
    this.horariosSrv.setItem(especialidad_guardar).finally(() =>
              this.router.navigate(['miperfil'])
            );
      } */

    } 
 

}
}
