import  { Injectable } from '@angular/core';
import  { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import  'rxjs/add/operator/map';

@Injectable()
export class PeliculasService {

    private url = "//pruebafilm.herokuapp.com/api/peliculas"; // url de los servicios en produccion

    constructor(private http: Http){}

    getPeliculas(){
        return this.http
                        .get(this.url)
                        .map((res: Response) => res.json());
    }

    getPeliculasId(peliculaId){
        return this.http
                        .get(this.getPeliculaUrl(peliculaId))
                        .map(res => res.json());
    }

    addPelicula(pelicula,portada){

        var form_data = new FormData();

        for(var key in pelicula){
            form_data.append(key,pelicula[key]);
        }

        for(var i=0; i < Object.keys(pelicula.myArray).length; i++){

            form_data.append('servidor[]',pelicula.myArray[i].servidor);        
            form_data.append('url[]',pelicula.myArray[i].url);        
            
        }

        form_data.append('portada', portada, portada.name);

        return this.http
                        .post(this.url,form_data)
                        .map(res => res.json());

    }

    updatePelicula(id, pelicula, portada){

        console.log(pelicula.genero);

        var form_data = new FormData();

        for(var key in pelicula){
            if(key == "genero" && typeof pelicula[key] == "object"){
                form_data.append("genero",pelicula[key]._id);
            }else{
                form_data.append(key,pelicula[key]);                
            }
        }

        for(var i=0; i < Object.keys(pelicula.myArray).length; i++){

            if(pelicula.myArray[i]._id){
                form_data.append('_id[]',pelicula.myArray[i]._id);                
            }
            
            form_data.append('servidor[]',pelicula.myArray[i].servidor);        
            form_data.append('url[]',pelicula.myArray[i].url);        

        }

        form_data.append('portada', portada, portada.name);

        return this.http
                        .put(this.getPeliculaUrl(id),form_data)
                        .map(res => res.json());

        
	}

    deletePelicula(peliculaId){
		return this.http.delete(this.getPeliculaUrl(peliculaId))
			.map(res => res.json());
	}

    private getPeliculaUrl(peliculaId){
		return this.url + "/" + peliculaId;
	}

}
