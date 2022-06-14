import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/servicios/spinner/spinner.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  mostrar1=false;
  mostrar2 = false;
  constructor(private router: Router ) { }

  ngOnInit(): void {
  }

  rutear(ruta: string) {
    if (ruta == 'registro') {
      this.mostrar1 = true;
      setTimeout(() => {
        this.mostrar1 = false;
        this.router.navigate([ruta]);
      }, 5000);

    } else {
      this.mostrar2 = true;
      setTimeout(() => {
        this.mostrar2 = false;
        this.router.navigate([ruta]);
      }, 5000);
    }
  }

}
