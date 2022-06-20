import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EncuestaService } from 'src/app/servicios/encuesta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {
 
  @Input() turno:any;
  @Output() onCompletada:EventEmitter<any>= new EventEmitter();
  mensaje: string = '';
  volveria: string = 'SI';
  clasificacion: string = '1';
  error: string = "";

  constructor(private encuestaSrv:EncuestaService) { }

  ngOnInit(): void {
  }


  Confirmar(opcion: boolean) {
    var aux = {
       turno: this.turno,
      atencionRecibida: this.clasificacion,
      volveria: this.volveria,
      sugerenciaMejora: this.mensaje,
      opcion: opcion
    }
    console.log(aux);

    if (opcion) {
      if (this.clasificacion != '1' && this.clasificacion != '2' && this.clasificacion != '3' && this.clasificacion != '4' && this.clasificacion != '5') {
        this.error = "3"
      }
      else {
        if (this.volveria != 'SI' && this.volveria != 'NO') {
          this.error = "4"
        } else {
          if(this.mensaje == ''){
            this.error = "5";
          }
          else{
            this.encuestaSrv.setItem(aux).then(()=>{
              Swal.fire('Encuesta guardada');
              this.onCompletada.emit(false);
            });
          }
        }
      }
    }
    else{ 
    }
  }


}
