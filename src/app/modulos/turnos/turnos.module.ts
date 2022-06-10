import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TurnosRoutingModule } from './turnos-routing.module'; 
import { PrincipalTurnosComponent } from './principalTurnos/principal-turnos.component';
import { FormsModule } from '@angular/forms';
import { SacarTurnoComponent } from './sacar-turno/sacar-turno.component';
import { MisTurnosComponent } from './mis-turnos/mis-turnos.component';


@NgModule({
  declarations: [
    PrincipalTurnosComponent,
    SacarTurnoComponent,
    MisTurnosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TurnosRoutingModule
  ]
})
export class TurnosModule { }
