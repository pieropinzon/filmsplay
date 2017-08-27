import { Routes } from '@angular/router';

import { GenerosComponent } from './generos/generos.component';
import { FormComponent } from './generos/form/form.component';
import { PeliculasComponent } from './peliculas/peliculas.component';
import { FormPeliComponent } from './peliculas/form/form.component';

import { AdminComponent } from './admin.component';

import { AuthGuardService } from '../auth/auth-guard.service';
import { WebGuardService } from '../auth/web-guard.service';

export const AdminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            //rutas generos
            {path: 'generos', component: GenerosComponent},            
            {path: 'generos/:id', component: FormComponent},
            {path: 'generos_new', component: FormComponent},

            // rutas peliculas
            {path: 'peliculas', component: PeliculasComponent},            
            {path: 'peliculas/:id', component: FormPeliComponent},
            {path: 'peliculas_new', component: FormPeliComponent},
            
        ],
        canActivate: [AuthGuardService],
        // canDeactivate: [WebGuardService]
    }
];