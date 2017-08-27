import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PelisComponent } from './pelis/pelis.component';
import { PelisCategoriaComponent } from './pelis-categoria/pelis-categoria.component';
import { PelisDetalleComponent } from './pelis-detalle/pelis-detalle.component';

import { FrontComponent } from './front.component';

@NgModule({
  declarations: [ FrontComponent,
                  PelisComponent,
                  PelisCategoriaComponent,
                  PelisDetalleComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
   exports: [     FrontComponent,
                  PelisComponent,
                  PelisCategoriaComponent,
                  PelisDetalleComponent,
   ],
   providers: [
     // servicios usados en cualquiera de los componentes
  ] 
})
export class FrontModule { }
