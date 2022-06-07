import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 import {HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BienvenidaComponent } from './pages/bienvenida/bienvenida.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { SpinnerModule } from './shared/spinner/spinner.module';
import { ValidaremailComponent } from './shared/validaremail/validaremail.component'; 


@NgModule({
  declarations: [
    AppComponent,
    BienvenidaComponent,
    ValidaremailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,    
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule ,
    AngularFireStorageModule,
    NgbModule,
    HttpClientModule,
    SpinnerModule

 
  ],
   providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
