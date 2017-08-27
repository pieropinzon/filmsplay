import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { GenerosService } from '../generos.service';
import { Generos } from '../generos';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  form: FormGroup;
  genero = new Generos();

  constructor(private fb: FormBuilder,
              private router: Router,
              private routeParams: ActivatedRoute,
              private generoService: GenerosService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      nombre: ['',Validators.required]
    });

    var id = this.routeParams
                            .snapshot
                            .params['id'];

    if(!id)
      return;

    this.generoService
                      .getGenerosId(id)
                      .subscribe(
                        genero => this.genero = genero
                      );
  } 

  save(){
    if(this.genero._id)
      this.generoService
          .updateGenero(this.genero)
          .subscribe(
            genero => {
              console.log(genero);
              this.router.navigate(['admin/generos']); 
            }
          );
    else
      this.generoService
          .addGeneros(this.genero)
          .subscribe(
            x => { 
              // respuesta del servidor
              console.log(x);
              // una vez sale todo bien redireccionamos a la vista principal
              this.router.navigate(['admin/generos']); 
            }
          );

  }

}
