import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder,  FormArray} from '@angular/forms';

import { PeliculasService } from '../peliculas.service';
import { GenerosService } from '../../generos/generos.service';
import { Peliculas } from '../peliculas';
import { Generos } from '../../generos/generos'; 

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormPeliComponent implements OnInit {

  //declaracion de variables globales

  form: FormGroup; 
  pelicula = new Peliculas();
  generos: Generos[];
  portada: File;
  idGenero: number;

  constructor(private fb: FormBuilder,
              private router: Router,
              private routeParams: ActivatedRoute,
              private peliculaService: PeliculasService,
              private generoServ: GenerosService
  ) { }
  
  // se ejecutara una sola vez, solo cuando inicie la vista
  ngOnInit() {

    // recibe un array de generos
    this.generoServ
                  .getGeneros()
                  .subscribe(generos => {
                    this.generos = generos
                  });

    // inicializo el formulario y declaro las validaciones a realizar

    this.form = this.fb.group({
      titulo: ['',Validators.required],
      age: ['',Validators.required],
      descripcion: ['',Validators.required],
      audio: ['',Validators.required],
      calidad: ['',Validators.required],
      puntuacion: ['',Validators.required],
      director: ['',Validators.required],
      elenco: ['',Validators.required],
      genero: ['',Validators.required],
      portada: [''],
      myArray: this.fb.array([])          
    });    

    // tomo la variable que se muestra en ruta de la vista
    var id = this.routeParams
                            .snapshot
                            .params['id'];
    // si no hay identificador, inicializar el array de enlaces
    if(!id){
      this.addArray();
      return;      
    }else{ // sino inicializar el array de enlaces con cada uno de los valores que tiene
      this.peliculaService
          .getPeliculasId(id)
          .subscribe(
            pelicula => {

              this.pelicula = pelicula;
              this.idGenero = this.pelicula.genero._id;
   
              // const control = <FormGroup> this.form;
              // control.addControl('_id',new FormControl(pelicula._id)); // agregando _id de la pelicula al formulario

              // si la longitud del objeto de enlace es mayor que 0
              if(this.pelicula.enlace.length)
                  this.addEnlaces(this.pelicula); // inicializo el array de enlaces con cada uno de los valores registrados.
              }
      );
    }
    
  } 

  // guarda los datos de la pelicula
  save(){
    // si existe la pelicula
    if(this.pelicula._id){
      // envio los datos para actualizar la pelicula
      this.peliculaService
          .updatePelicula(this.pelicula._id, this.form.value, this.portada)
          .subscribe(
            pelicula => {
              console.log(pelicula);
              this.router.navigate(['admin/peliculas']); 
            }
          );
    }else{      // si no existe
      // agrego la pelicula
      this.peliculaService
          .addPelicula(this.form.value, this.portada)
          .subscribe(
            x => { 
              // una vez sale todo bien redireccionamos a la vista principal
              this.router.navigate(['admin/peliculas']); 
            }
          );
    }

    // console.log(this.form.value);
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        this.portada = fileList[0];
    }
  }

   // inicializo el array de enlaces
   initArray() {
      return  this.fb.group({  
                        servidor: ['',Validators.required],
                        url: ['',Validators.required]
                });
    }

    // agrego los valores al formulario, con los datos del enlace de la pelicula a actualizar
    initArrayUpdate(pelis){
      return  this.fb.group({
                        _id:[pelis._id],   
                        servidor: [pelis.servidor,Validators.required],
                        url: [pelis.url,Validators.required]
                });
    }

   addArray() {
        const control = <FormArray>this.form.controls['myArray'];
        control.push(this.initArray());
    }

    // elimino el enlace 
    removeDataKey(i: number) {
       const control = <FormArray>this.form.controls['myArray'];
       control.removeAt(i);
      //  this.myGroupName.splice(i,1);
    }

    // agrego al formulario los campos de enlace inicializados con cada uno de los datos
    addEnlaces(pelicula){
      const control = <FormArray>this.form.controls['myArray'];
    
      // agregando datos del enlace
      for(var pelis in pelicula.enlace){
        // console.log(pelicula.enlace[pelis]);
        control.push(this.initArrayUpdate(pelicula.enlace[pelis]));
      }
    }

}
