var express = require("express");

const peliculasModels = require('../models/film');
const generosModels = require('../models/genero');


var router = express.Router();

// muestra las peliculas del año
router.get("/peliculas/fecha/:age",function (req,res) {

	const num_por_page = 5;

	let page = (parseInt(1)-1)*num_por_page,
		num_page = parseInt(1),
		sinResultados = '',
		count;

	let busqueda = tipoBusqueda("age",req.params.age);
	obtenerPeliculas(res, req, "age", req.params.age, busqueda, page, num_page, num_por_page, count, sinResultados, "Peliculas del " + req.params.age +" para descargar gratis en HD");

});

// muestra las peliculas del año
router.get("/peliculas/fecha/:age/page/:page",function (req,res) {

	const num_por_page = 5;

	let page = (parseInt(req.params.page)-1)*num_por_page,
		num_page = parseInt(req.params.page),
		sinResultados = '',
		count;

	let busqueda = tipoBusqueda("age",req.params.age);
	obtenerPeliculas(res, req, "age", req.params.age, busqueda, page, num_page, num_por_page, count, sinResultados, "Peliculas del " + req.params.age +" para descargar gratis en HD");

});

// muestra las peliculas del año
router.get("/peliculas/genero/:genero",function (req,res) {
	
	const num_por_page = 5;

	let page = (parseInt(1)-1)*num_por_page,
		num_page = parseInt(1),
		sinResultados = '',
		count;

	generosModels.findOne({nombre: req.params.genero}, function(err, genero){
		if (err) console.log(err);

		if(genero){

			let busqueda = tipoBusqueda("genero",genero._id);
			obtenerPeliculas(res, req, "genero", req.params.genero, busqueda, page, num_page, num_por_page, count, sinResultados, "Peliculas de " + req.params.genero +" para descargar gratis en HD");

		}else{
			sinResultados = 'No se han encontrado resultados para el Genero: ' + req.params.genero;
			res.render("index",{result: sinResultados,
								title: req.params.genero
				});
		}		
	})
});

router.get("/peliculas/genero/:genero/page/:page",function (req,res) {
	
	const num_por_page = 5;

	let page = (parseInt(req.params.page)-1)*num_por_page,
		num_page = parseInt(req.params.page),
		sinResultados = '',
		count;

	generosModels.findOne({nombre: req.params.genero}, function(err, genero){
		if (err) console.log(err);

		if(genero){

			let busqueda = tipoBusqueda("genero",genero._id);
			obtenerPeliculas(res, req, "genero", req.params.genero, busqueda, page, num_page, num_por_page, count, sinResultados, "Peliculas de " + req.params.genero +" para descargar gratis en HD");

		}else{
			sinResultados = 'No se han encontrado resultados para el Genero: ' + req.params.genero;
			res.render("index",{result: sinResultados,
								title: "Peliculas de " + req.params.genero +" para descargar gratis en HD"
				});
		}		
	})
});

router.get("/", function(req, res){

	const num_por_page = 5;

	let page = (parseInt(1)-1)*num_por_page,
		num_page = parseInt(1),
		sinResultados = '',
		count;

	if(req.query.search){
		const regex = new RegExp(expresionBuscador(req.query.search),'gi');

		peliculasModels.find({titulo: regex})
		.populate("genero")
		.exec(function (err,peliculas) {
			if (err) console.log(err);

			if(peliculas.length < 1){
				sinResultados = 'No se han encontrado resultados para tu búsqueda: ' + req.query.search;
			}

			let context = {
								peliculas : peliculas,
								num_page : num_page,
								count : count,
								result: sinResultados,
								title: "Peliculas de " + req.query.search +" para descargar gratis en HD"
						};


			res.render("index",context);
		});

	}else{

		let busqueda = tipoBusqueda("","");
		obtenerPeliculas(res, req, "", "", busqueda, page, num_page, num_por_page, count, sinResultados, "Peliculas para descargar gratis en HD");

	}

});


router.get("/page/:page", function(req, res){

	const num_por_page = 5;

	let page = (parseInt(req.params.page)-1)*num_por_page,
		num_page = parseInt(req.params.page),
		sinResultados = '',
		count;	

	let busqueda = tipoBusqueda("","");

	obtenerPeliculas(res, req, "", "", busqueda, page, num_page, num_por_page, count, sinResultados, "Peliculas para descargar gratis en HD");

});


router.get("/films/:titulo", function(req, res){
	
	peliculasModels
		.findOne({titulo: req.params.titulo})
		.populate("genero")
		.populate("enlace")
		.exec(function (err,pelicula) {
			if (err) console.log(err);

			res.render("pelis-detalle", {pelicula: pelicula, 
										 title: pelicula.titulo + " (" + pelicula.age + ") descargar gratis en HD"
				});
			
		});
		
});

// router.route('/peliculas/csv')
//     .get(function(req,res){
//         fs.createReadStream('public/archivos/prueba1.csv')
//             .pipe(csv())
//             .on('data', function(data){
//                 console.log(data);
//             })
//             .on('end', function(data){
//                 console.log('lectura finalizada');
//             });
//     });

function tipoBusqueda(tipo, dato){
	let busqueda;

	if(tipo == ""){
		busqueda = {};
	}else{
		if(tipo == "age"){
			busqueda = {age: dato};
		}else{
			if(tipo == "genero"){
				busqueda = {genero: dato};
			}
		}
	}

	return busqueda;
}

function sinResult(tipo, req){
	let busqueda;

	if(tipo == "age"){
		busqueda = 'No se han encontrado resultados para el año: ' + req.params.age;
	}else{
		if(tipo == "genero"){
			busqueda = 'No se han encontrado resultados para el Genero: ' + req.params.genero;
		}
	}

	return busqueda;
}

function obtenerPeliculas(res, req, tipo, dato, busqueda, page, num_page, num_por_page, count, sinResultados, title){

	peliculasModels
		.count(busqueda)
		.then( num => {
			count = parseInt((num/num_por_page)+1)
		});

	peliculasModels.find(busqueda)
		.populate("genero")
		.skip(page)
		.limit(num_por_page)
		.exec(function (err,peliculas) {
			if (err) console.log(err);

			if(peliculas.length < 1){
				sinResultados = sinResult(tipo, req);
			}

			let context = {
								peliculas : peliculas,
								num_page : num_page,
								count : count,
								result: sinResultados,
								url: tipo,
								dato: dato,
								title: title
						};


			res.render("index",context);
		});

}

function expresionBuscador(expresion){
	return expresion.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;