import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TurnosRoutingModule } from './turnos-routing.module'; 
import { PrincipalTurnosComponent } from './principalTurnos/principal-turnos.component';
import { FormsModule } from '@angular/forms';
import { SacarTurnoComponent } from './sacar-turno/sacar-turno.component';
import { MisTurnosComponent } from './mis-turnos/mis-turnos.component';
import { SpinnerModule } from 'src/app/shared/spinner/spinner.module';


@NgModule({
  declarations: [
    PrincipalTurnosComponent,
    SacarTurnoComponent,
    MisTurnosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TurnosRoutingModule,
    SpinnerModule
  ]
})
export class TurnosModule { }
