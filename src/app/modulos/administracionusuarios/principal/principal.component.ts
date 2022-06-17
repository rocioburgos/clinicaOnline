import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { rejects } from 'assert';
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
    this.router.navigate([ruta]);
  }
}
