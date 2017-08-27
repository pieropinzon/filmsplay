import  { Injectable } from '@angular/core';

@Injectable()
export class AdminService {

    public url_prod = "//pruebafilm.herokuapp.com/api/peliculas";
    public url_desa = "//localhost:4000/api/peliculas";    

}