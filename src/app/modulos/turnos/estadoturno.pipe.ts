import { Pipe, PipeTransform } from '@angular/core';
import { validateEventsArray } from '@angular/fire/compat/firestore';

@Pipe({
  name: 'estadoturno'
})
export class EstadoturnoPipe implements PipeTransform {

  transform(value: any , arg:string ): string {
    if(value =='pendiente confirmacion'){
      return 'Aceptar'
    }
    return '';
  }

}
