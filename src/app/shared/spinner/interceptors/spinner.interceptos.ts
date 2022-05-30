import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { SpinnerService } from "src/app/servicios/spinner/spinner.service";

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor{
    
    constructor(private spinnerSrv:SpinnerService){}


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.spinnerSrv.show(); 
        return next.handle(req).pipe(
            finalize(()=>this.spinnerSrv.hide())
        )
    }
    
}