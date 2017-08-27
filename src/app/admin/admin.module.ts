import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { GenerosModule } from './generos/generos.module';
import { PeliculasModule } from './peliculas/peliculas.module';
import { AdminComponent } from './admin.component';

import { AuthGuardService } from '../auth/auth-guard.service';
import { WebGuardService } from '../auth/web-guard.service';


@NgModule({
  imports: [
    CommonModule,
    GenerosModule,
    PeliculasModule,
    RouterModule
  ],
  declarations: [AdminComponent],
  exports: [ 

  ],
   providers: [
     // servicios usados en cualquiera de los componentes
     AuthGuardService,
    //  WebGuardService
  ] 
})
export class AdminModule { }
