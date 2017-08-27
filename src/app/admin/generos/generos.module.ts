import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { GenerosService } from './generos.service';
import { GenerosComponent } from './generos.component';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [
    GenerosComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports:[
      GenerosComponent,
      FormComponent
  ],
  providers: [
      GenerosService
  ]
})
export class GenerosModule { }