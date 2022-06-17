import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TurnosRoutingModule } from './turnos-routing.module'; 
import { PrincipalTurnosComponent } from './principalTurnos/principal-turnos.component';
import { FormsModule } from '@angular/forms';
import { SacarTurnoComponent } from './sacar-turno/sacar-turno.component';
import { MisTurnosComponent } from './mis-turnos/mis-turnos.component';
import { SpinnerModule } from 'src/app/shared/spinner/spinner.module';
import { MisturnosEspecialistaComponent } from './misturnos-especialista/misturnos-especialista.component';
import { TurnosadminComponent } from './turnosadmin/turnosadmin.component';
import { FiltroPacientePipe } from './filtro-paciente.pipe';
import { FiltroEspecialistaPipe } from './filtro-especialista.pipe';
import { EstadoturnoPipe } from './estadoturno.pipe'; 
 
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    PrincipalTurnosComponent,
    SacarTurnoComponent,
    MisTurnosComponent,
    MisturnosEspecialistaComponent,
    TurnosadminComponent,
    FiltroPacientePipe,
    FiltroEspecialistaPipe,
    EstadoturnoPipe 
  ],
  imports: [
    CommonModule,
    FormsModule,
    TurnosRoutingModule,
    SpinnerModule ,
    SweetAlert2Module
  ]
})
export class TurnosModule { }
