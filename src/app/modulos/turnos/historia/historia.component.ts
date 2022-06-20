 
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HistoriaService } from 'src/app/servicios/historia/historia.service';
import { SpinnerService } from 'src/app/servicios/spinner/spinner.service';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-historia',
  templateUrl: './historia.component.html',
  styleUrls: ['./historia.component.css']
})
export class HistoriaComponent implements OnInit {
 
  @Input() turnoFinalizado:any;
  @Output() onHistoriaFinalizada:EventEmitter<any>= new EventEmitter();
  // public registerForm!: FormGroup;

  altura: string = "";
  peso: string = "";
  temperatura: string = "";
  presion: string = "";
  key1: string = ""; //Libre
  key2: string = ""; //Libre
  dato1: string = ""; //Libre
  dato2: string = ""; //Libre

  error: string = "";
  formulario: FormGroup;

  constructor(private fb: FormBuilder, private historiaSrv: HistoriaService, 
    private spinnerSrv:SpinnerService, private router:Router) {
    console.log(this.turnoFinalizado)
    this.formulario = fb.group({
      altura: ['', [Validators.required]],
      peso: ['', [Validators.required]],
      temperatura: ['', [Validators.required]],
      presion: ['', [Validators.required]],
      key1:['', [ ]],
      key2:['', [ ]],
      key3:['', [ ]],
      value1:['', [ ]],
      value2:['', [ ]],
      value3:['', [ ]],
    });
  }


  ngOnInit(): void {

  }
  guardarHistoria() {
    this.spinnerSrv.show();
    const form = this.formulario.value;
 
    let datos = {
      turno_id: this.turnoFinalizado.turno_id,
      paciente_id: this.turnoFinalizado.paciente_id,
      especialista_id: this.turnoFinalizado.especialista_id,
      especialidad:this.turnoFinalizado.especialidad,
      dia: this.turnoFinalizado.dia,
      hora: this.turnoFinalizado.hora,
      altura: form.altura,
      peso: form.peso,
      temperatura:  form.temperatura,
      presion: form.presion,
      opcionales:[ 
        { value:  form.value1,key:  form.key1, },
        { value:  form.value2, key:  form.key2},
        {value:  form.value3,key:  form.key3  }
      ]
    }

    try {
       this.historiaSrv.setItem(datos).then((res)=>{
        this.spinnerSrv.hide();
        console.log(res)
        Swal.fire('Historia guardada');
        this.onHistoriaFinalizada.emit(false);
       })
     
    } catch (error) {
      this.spinnerSrv.hide();
      console.log(error); 
    }

  }


}
