import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './principal/principal.component';
import { PanelEspecialistasComponent } from './panel-especialistas/panel-especialistas.component';
import { AdministracionRoutingModule } from './administracionusuarios.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PrincipalComponent,
    PanelEspecialistasComponent
  ],
  imports: [
    CommonModule,
    AdministracionRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdministracionusuariosModule { }
