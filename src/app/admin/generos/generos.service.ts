import  { Injectable } from '@angular/core';
import  { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import  'rxjs/add/operator/map';

@Injectable()

export class GenerosService{
    
    // private url = "//localhost:4000/api/genero";
    private url = "//pruebafilm.herokuapp.com/api/genero";
    

    constructor(private http: Http){}

    getGeneros(){
        return this.http
                        .get(this.url)
                        .map((res: Response) => res.json());
    }

    getGenerosId(generoId){
        return this.http
                        .get(this.getGeneroUrl(generoId))
                        .map(res => res.json());
    }

    addGeneros(genero){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http
                        .post(this.url,
                              JSON.stringify({
                                  nombre: genero.nombre
                              }),
                              {headers: headers}
                        )
                        .map(res => res.json());
    }

    updateGenero(genero){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

		return this.http.put(this.getGeneroUrl(genero._id), 
                            JSON.stringify(genero),
                            {headers:headers}
                            )
			.map(res => res.json());
	}

    deleteGenero(generoId){
		return this.http.delete(this.getGeneroUrl(generoId))
			.map(res => res.json());
	}

    private getGeneroUrl(userId){
		return this.url + "/" + userId;
	}
}