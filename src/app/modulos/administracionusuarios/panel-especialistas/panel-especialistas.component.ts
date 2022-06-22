import { Component, TemplateRef, ViewChild   } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArchivosService } from 'src/app/servicios/archivos/archivos.service';
import { UsuarioService } from 'src/app/servicios/usuario/usuario.service';

@Component({
  selector: 'app-panel-especialistas',
  templateUrl: './panel-especialistas.component.html',
  styleUrls: ['./panel-especialistas.component.css']
})
export class PanelEspecialistasComponent   {

  especialistas:Array<any>=[]; 
  
 //para el modal de crear especialidad
 @ViewChild("myModalConf", { static: false }) myModalConf?: TemplateRef<any>;
 nuevoEstado:any;
  constructor(  private espSrv: UsuarioService, private usrSrv:UsuarioService,private modalService: NgbModal,
    private archSrv:ArchivosService ) {
    this.espSrv.traerUsuarios().subscribe((data) => {
      this.especialistas = data;
      console.log(this.especialistas);
    });
  } 


  actualizarEstado(id:string, estado:string){ 

    this.usrSrv.actualizarEstado(id, estado);
  }

  mostrarModalEditar( uid:string,  estado:string  ) {
     
    this.modalService.open(this.myModalConf).result.then(r => {
      console.log("Tu respuesta ha sido: " + r);
    }, error => {
      console.log(error);
    });
  }
 

  guardarCambios(){
    console.log(this.nuevoEstado)
  }

  descargarInfo() { 
    console.log(this.armaInfo2());

    let informacion= this.armaInfo2();
    this.archSrv.exportAsExcelFile(informacion, 'informacionEspecialistas');
  }


  armaInfo2() {
    let especialistas_info: any[] = []
    this.especialistas.forEach((especialista)=>{
      especialista.espe.forEach((element:any) => {
        especialistas_info.push({
        Apellido: especialista.apellido,
        Nombre: especialista.nombre,
        DNI: especialista.dni,
        Edad:especialista.edad,
        Email:especialista.email,
        Especilidad:element
       
      });
      });
      
    });
    return especialistas_info;
}
}