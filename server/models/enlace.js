var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var enlace_schema = new Schema({
    servidor:{type:String,required: "EL nombre del servidor es Obligatorio"},
    url:{type:String,required: "EL enlace del servidor es Obligatorio"},
    pelicula:{type: Schema.Types.ObjectId, ref: "Film"}
});

var Enlace = mongoose.model("Enlace",enlace_schema);

module.exports = Enlace;