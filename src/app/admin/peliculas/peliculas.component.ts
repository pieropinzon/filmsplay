import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Peliculas } from './peliculas'; 
import { PeliculasService } from './peliculas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit {

  peliculas: Peliculas[];
  isPeliculas: boolean;

  constructor(private peliculaServ: PeliculasService,
              private router: Router
              ) { }

  ngOnInit() {
    this.peliculaServ
                  .getPeliculas()
                  .subscribe(peliculas => {
                    this.peliculas = peliculas,
                    this.isPeliculas = this.peliculas.length == 0? false : true;
                  });
  }


  deletePelicula(pelicula){
    if(confirm("Estas seguro de eliminar el pelicula " + pelicula.titulo + "?")){
       var index = this.peliculas.indexOf(pelicula);
       this.peliculas.splice(index,1);
      // apenas se elimine cargar los datos nuevamente
      // aqui lo que hace es jugar con los datos de la tabla
      this.peliculaServ
          .deletePelicula(pelicula._id)
          .subscribe(
            x => { 
              // respuesta del servidor
              console.log(x);
              // una vez sale todo bien redireccionamos a la vista principal
              // location.reload();
            },
            err => {
              alert("No se pudo eliminar el usuario");
              this.peliculas
                      .splice(index,0,pelicula);
            }
          );
    }
  }

}
