import { Generos } from '../generos/generos';
import { Enlaces } from './enlaces';

export class Peliculas {
    _id: number;
    titulo: String;
    age: Number;
    descripcion: String;
    audio: String;
    calidad: String;
    puntuacion: Number;
    director: String;
    elenco: String;
    genero: Generos;
    foto: File;
    enlace: any[];
    // enlace: Enlaces[];
}
