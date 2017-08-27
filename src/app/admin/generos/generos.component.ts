import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Generos } from './generos'; 
import { GenerosService } from './generos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generos',
  templateUrl: './generos.component.html',
  styleUrls: ['./generos.component.css']
})
export class GenerosComponent implements OnInit {

  generos: Generos[];
  isGeneros: boolean;

  constructor(private generoServ: GenerosService,
              private router: Router
              ) { }

  ngOnInit() {
    this.generoServ
                  .getGeneros()
                  .subscribe(generos => {
                    this.generos = generos,
                    this.isGeneros = this.generos.length == 0? false : true;
                  });
  }


  deleteGenero(genero){
    if(confirm("Estas seguro de eliminar el genero " + genero.nombre + "?")){
       var index = this.generos.indexOf(genero);
       this.generos.splice(index,1);
      // apenas se elimine cargar los datos nuevamente
      // aqui lo que hace es jugar con los datos de la tabla
      this.generoServ
          .deleteGenero(genero._id)
          .subscribe(
            x => { 
              // respuesta del servidor
              console.log(x);
              // una vez sale todo bien redireccionamos a la vista principal
              // location.reload();
            },
            err => {
              alert("No se pudo eliminar el usuario");
              this.generos
                      .splice(index,0,genero);
            }
          );
    }
  }

}
