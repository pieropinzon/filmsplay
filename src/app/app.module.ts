import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AdminModule } from './admin/admin.module';
import { FrontModule } from './front/front.module';

import { AppComponent } from './app.component';

import { routing } from './app.routes';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthComponent } from './auth/auth.component';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AdminModule,
    FrontModule,
    routing
  ],
  providers:[],
  bootstrap: [AppComponent]
})
export class AppModule { }
