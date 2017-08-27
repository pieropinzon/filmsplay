import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AdminRoutes } from "./admin/admin.routes";
import { FrontRoutes } from "./front/front.routes";
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthComponent } from './auth/auth.component';

export const routes: Routes = [
    ...AdminRoutes,
    // ...FrontRoutes,


    {path: 'auths', component: AuthComponent},

    // toda ruta que no conozca redireccionala al componente notfound
    // {path: '**', component: NotFoundComponent}   
         
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);