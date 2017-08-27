import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { PeliculasService } from './peliculas.service';
import { PeliculasComponent } from './peliculas.component';
import { FormPeliComponent } from './form/form.component';

@NgModule({
  declarations: [
    PeliculasComponent,
    FormPeliComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    ReactiveFormsModule,
    CommonModule   
  ],
  exports:[
      PeliculasComponent,
      FormPeliComponent
  ],
  providers: [
      PeliculasService
  ]
})
export class PeliculasModule { }