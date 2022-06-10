import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})
export class BienvenidaComponent implements OnInit {

  public usuario: any = null;
  constructor() {
    let ls = localStorage.getItem('usuario_clinica');
    if( ls != null){
      
         this.usuario =    JSON.parse( ls);  
      console.log(this.usuario)
        } 
   }

  ngOnInit(): void {
  }



}
