import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroEspecialista'
})
export class FiltroEspecialistaPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const turnosPaciente :Array<any>= [];

    for (const turno of value) {
       console.log(turno);
      if (turno?.especialidad!.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        turnosPaciente.push(turno);
      }
      else {
        if (turno.paciente.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
          turnosPaciente.push(turno);
        } 
      }
 
  }
  return turnosPaciente
}

}
