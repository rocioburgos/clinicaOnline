import { Component  } from '@angular/core';
import { SpinnerService } from 'src/app/servicios/spinner/spinner.service';

@Component({
  selector: 'app-spinner',
  template: ' <div class="overlay" *ngIf="isLoading$ | async"> <div class="lds-hourglass"></div></div>',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {

  isLoading$=this.spinnerSrv.isLoading$;
  constructor(private spinnerSrv:SpinnerService) { }
 

}
