var express = require("express");

const peliculasModels = require('../models/film');
const generosModels = require('../models/genero');


var router = express.Router();

// muestra las peliculas del año
router.get("/peliculas/fecha/:age",function (req,res) {

	var sinResultados = '';

	peliculasModels.find({age: req.params.age})
		.populate("genero")
		.exec(function (err,peliculas) {
			if (err) console.log(err);

			if(peliculas.length < 1){
				sinResultados = 'No se han encontrado resultados para el año: ' + req.params.age;
			}
			
			res.render("index",{peliculas:peliculas, result: sinResultados});
		});
});


// muestra las peliculas del año
router.get("/peliculas/genero/:genero",function (req,res) {
	var sinResultados = '';
	var busqueda = {};

	generosModels.findOne({nombre: req.params.genero}, function(err, genero){
		if (err) console.log(err);

		if(genero){

			peliculasModels.find({genero: genero._id})
			.populate("genero")
			.exec(function (err,peliculas) {
				if (err) console.log(err);

				if(peliculas.length < 1){
					sinResultados = 'No se han encontrado resultados para el Genero: ' + req.params.genero;
				}
			
				res.render("index",{peliculas:peliculas, result: sinResultados});

			});

		}else{
			sinResultados = 'No se han encontrado resultados para el Genero: ' + req.params.genero;

			res.render("index",{result: sinResultados});
		}		
	})
});



router.get("/", function(req, res){

	var sinResultados = '';
	
	if(req.query.search){
		const regex = new RegExp(expresionBuscador(req.query.search),'gi');

		peliculasModels.find({titulo: regex})
		.populate("genero")
		.exec(function (err,peliculas) {
			if (err) console.log(err);

			if(peliculas.length < 1){
				sinResultados = 'No se han encontrado resultados para tu búsqueda: ' + req.query.search;
			}
			res.render("index",{peliculas:peliculas, result: sinResultados});
		});

	}else{

		peliculasModels.find({})
		.populate("genero")
		.exec(function (err,peliculas) {
			if (err) console.log(err);

			res.render("index",{peliculas:peliculas, result: sinResultados});
		});

	}

});


function expresionBuscador(expresion){
	return expresion.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;