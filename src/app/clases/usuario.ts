import { Dia } from "./dia";
import { Especialidad } from "./especialidad";

export class Usuario {
    public nombre: string = ''; //Obli
    public apellido: string = '';//Obli
    public edad: number = 0; //Obli
    public dni: number = 0; //Obli
    public email: string = ''; //Obli
    public contraseña: string = ''; //Obli
    public perfil: string | null = ''; //Obli
    public archivo:string | null='';
    public archivo1:string| null='';
    public archivo2:string| null='';
    public uid:string| null='';
   
    public diasDeAtencion?: Array<Dia>;//Solo Especialista
}