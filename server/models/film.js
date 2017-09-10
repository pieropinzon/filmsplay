var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.Promise = require('bluebird');

mongoose.connect("mongodb://localhost/filmsPlay");
// mongoose.connect("mongodb://pieropinzon:paulperozo18@ds159013.mlab.com:59013/filmsplay");

var film_schema = new Schema({
    titulo:{type:String,required: "EL titulo de la pelicula es Obligatorio"},        
    age:{type:Number, min:[1990,"El año de la pelicula no puede ser menor que 1990."]},
    descripcion:{type:String,required: "La descripcion de la pelicula es Obligatoria"},
    audio:{type:String,required: "EL tipo de audio de la pelicula es Obligatoria"},    
    calidad:{type:String,required: "La calidad de la pelicula es Obligatoria"},        
    puntuacion:{type:Number,required: "Debe ingresar la puntuacion de la pelicula",enum:{values:[1,2,3,4,5],message:"Opcion no valida"}},
    director:{type:String,required: "Debe ingresar el Director de la pelicula"},
    elenco:{type:String,required: "Debe ingresar el Elenco de la pelicula"},
    foto:{type:String,required: "Debe la imagen de portadade la pelicula"}, 
    genero:{type: Schema.Types.ObjectId, ref: "Genero"},
    enlace:[{type: Schema.Types.ObjectId, ref: "Enlace"}]       
});

var Film = mongoose.model("Film",film_schema);

module.exports = Film;