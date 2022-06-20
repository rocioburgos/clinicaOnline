import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TurnosRoutingModule } from './turnos-routing.module'; 
import { PrincipalTurnosComponent } from './principalTurnos/principal-turnos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SacarTurnoComponent } from './sacar-turno/sacar-turno.component';
import { MisTurnosComponent } from './mis-turnos/mis-turnos.component';
import { SpinnerModule } from 'src/app/shared/spinner/spinner.module';
import { MisturnosEspecialistaComponent } from './misturnos-especialista/misturnos-especialista.component';
import { TurnosadminComponent } from './turnosadmin/turnosadmin.component';
import { FiltroPacientePipe } from './pipes/filtro-paciente.pipe';
import { FiltroEspecialistaPipe } from './pipes/filtro-especialista.pipe';
 
 
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HistoriaComponent } from './historia/historia.component';
import { MostrarEstadoDirective } from './directivas/mostrar-estado.directive';
import { ResaltarEstadoDirective } from './directivas/resaltar-estado.directive';
import { NombreapellidoPipe } from './pipes/nombreapellido.pipe';
import { EncuestaComponent } from './encuesta/encuesta.component';

@NgModule({
  declarations: [
    PrincipalTurnosComponent,
    SacarTurnoComponent,
    MisTurnosComponent,
    MisturnosEspecialistaComponent,
    TurnosadminComponent,
    FiltroPacientePipe,
    FiltroEspecialistaPipe, 
    HistoriaComponent,
    MostrarEstadoDirective,
    ResaltarEstadoDirective,
    NombreapellidoPipe,
    EncuestaComponent 
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TurnosRoutingModule,
    SpinnerModule ,
    SweetAlert2Module
  ]
})
export class TurnosModule { }
