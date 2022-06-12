import { Component  } from '@angular/core';
import { SpinnerService } from 'src/app/servicios/spinner/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html', 
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {

  isLoading$=this.spinnerSrv.isLoading$;
  constructor(private spinnerSrv:SpinnerService) { }
 

}
