import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appResaltarEstado]'
})
export class ResaltarEstadoDirective {

  constructor(private el: ElementRef) { }

  @Input() colorBase!: string;
  @Input('appResaltarEstado')resaltarColor: (boolean | undefined);
  
  ngOnInit() {
    // const aux = this.el.nativeElement;

    console.log(this.resaltarColor);

    this.resaltar(this.resaltarColor!);
  }

  private resaltar(color: boolean): void {
    if(color == true){
      
      this.el.nativeElement.style.backgroundColor = '#3f9121'; //verde
    }else{
      this.el.nativeElement.style.backgroundColor = '#de2837'; //rojo
    }
  }

}
