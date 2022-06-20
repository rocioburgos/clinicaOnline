import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appMostrarEstado]'
})
export class MostrarEstadoDirective {

  constructor(private el: ElementRef) { }

  
  @Input() colorBase!: string;
  @Input('appMostrarEstado')resaltarColor: string | undefined;

  ngOnInit() {
    
    this.resaltar()
  }

  private resaltar(): void {

    if(this.resaltarColor == "pendiente confirmacion"){
      this.el.nativeElement.style.backgroundColor = '#D9F146'; //amarillo
   
    }else if(this.resaltarColor == "cancelado"){ 
        this.el.nativeElement.style.backgroundColor = '#de2837'; //rosa
    
     
    }else if(this.resaltarColor == "aceptado"){
      this.el.nativeElement.style.backgroundColor = '#3f9121'; //verde
    
    }else if(this.resaltarColor == "finalizado"){
      this.el.nativeElement.style.backgroundColor = '#8F5FEF'; //lila
     
    }
    else{
      this.el.nativeElement.style.backgroundColor = '#EF5F9C'; //rosa
     
    } 
  }
}
