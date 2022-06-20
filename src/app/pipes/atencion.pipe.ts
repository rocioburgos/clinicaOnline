import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'atencion'
})
export class AtencionPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {

  //  {{atencion.HC.dia }} {{atencion.HC.hora}}- {{atencion.HC.especialidad}} 
    return '📅 '+value.dia+' ⏰ '+value.hora +' 👨‍⚕️ '+value.especialidad;
     
  }

}
