import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './principal/principal.component';
import { PanelEspecialistasComponent } from './panel-especialistas/panel-especialistas.component';
import { AdministracionRoutingModule } from './administracionusuarios.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerModule } from 'src/app/shared/spinner/spinner.module';
import { EstadisticasComponent } from './estadisticas/estadisticas.component'; 
 
import { NgChartsModule } from 'ng2-charts';
import { TurnosusuarioComponent } from './turnosusuario/turnosusuario.component';
import { ResaltarEspDirective } from './directivas/resaltar-esp.directive';
import { TurnosporespecialidadComponent } from './canvas/turnosporespecialidad/turnosporespecialidad.component';
 

@NgModule({
  declarations: [
    PrincipalComponent,
    PanelEspecialistasComponent,
    EstadisticasComponent,
    TurnosusuarioComponent,
    ResaltarEspDirective,
    TurnosporespecialidadComponent 
     
  ],
  imports: [
    CommonModule,
    AdministracionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule ,
    NgChartsModule
  ]
})
export class AdministracionusuariosModule { }
