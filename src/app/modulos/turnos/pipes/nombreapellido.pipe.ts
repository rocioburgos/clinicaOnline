import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombreapellido'
})
export class NombreapellidoPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
   
    return (value.apellido +', '+value.nombre);
  }

}
