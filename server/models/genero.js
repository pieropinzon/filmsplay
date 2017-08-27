var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var genero_schema = new Schema({
    nombre:{type:String,required: "EL nombre del genero es Obligatorio"}   
});

var Genero = mongoose.model("Genero",genero_schema);

module.exports = Genero;