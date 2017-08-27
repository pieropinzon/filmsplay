import { Routes } from '@angular/router';

import { PelisComponent } from './pelis/pelis.component';
import { PelisCategoriaComponent } from './pelis-categoria/pelis-categoria.component';
import { PelisDetalleComponent } from './pelis-detalle/pelis-detalle.component';

import { FrontComponent } from './front.component';

export const FrontRoutes: Routes = [
    {
        path: '',
        component: FrontComponent,
        children: [
            //rutas front
            {path: 'peliculas', component: PelisComponent},
            {path: 'peliculas/categoria', component: PelisCategoriaComponent}, 
            {path: 'peliculas/detalle', component: PelisDetalleComponent}            
        ]
    }
];