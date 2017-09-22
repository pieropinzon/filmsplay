var express = require('express');
var Peliculas = require("../models/film");
var Generos = require("../models/genero");
var Enlaces = require("../models/enlace");

var multer = require('multer');
var path = require('path');

var upload = multer({ dest: 'uploads/' }).single('portada');

var fs = require("fs");
var csv = require('fast-csv');

var router = express.Router();


// le dice a express que el directorio 'uploads', es estatico.
// router.use(express.static(path.join(__dirname, 'uploads'))); 

// para CORN
router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.route('/peliculas/:id')
    .get(function(req,res){
        Peliculas.find({_id: req.params.id})
        .populate("genero")
		.populate("enlace")
		.exec(function (err,films) {
			if (err) {
				 res.status(200).json("Error al intentar ver los datos de la pelicula");
			}else{
                res.status(200).json(films[0]);
			}
		});
    })
    .put(upload,function(req,res){
        Peliculas.findById(req.params.id,function(err,pelicula){
            if(err){
                res.status(200).json("No existe la pelicula");
            }else{                  
                
                var pelicula_update = pelicula;
                var extension = req.file.originalname.split(".").pop();

                fs.unlink("public/imagenes/films/" + pelicula.foto,  (err) => {
                    if (err) {
                        console.log("No se pudo eliminar la imagen:");
                    } else {
                        console.log('imagen eliminada');                                
                    }
                });                                

                pelicula_update.titulo      = typeof req.body.titulo == 'undefined' ? pelicula.titulo : req.body.titulo;
                pelicula_update.age         = typeof req.body.age == 'undefined' ? pelicula.age : req.body.age;
                pelicula_update.descripcion = typeof req.body.descripcion == 'undefined' ? pelicula.descripcion : req.body.descripcion;
                pelicula_update.audio       = typeof req.body.audio == 'undefined' ? pelicula.audio : req.body.audio;
                pelicula_update.calidad     = typeof req.body.calidad == 'undefined' ? pelicula.calidad : req.body.calidad;
                pelicula_update.puntuacion  = typeof req.body.puntuacion == 'undefined' ? pelicula.puntuacion : req.body.puntuacion;
                pelicula_update.director    = typeof req.body.director == 'undefined' ? pelicula.director : req.body.director;
                pelicula_update.elenco      = typeof req.body.elenco == 'undefined' ? pelicula.elenco : req.body.elenco;                
                pelicula_update.genero      = typeof req.body.genero == 'undefined' ? pelicula.genero : req.body.genero;
                pelicula_update.foto        = typeof req.file == 'undefined' ? pelicula.foto : req.body.titulo+"."+extension;

                for(var index in req.body.servidor){

                    if(req.body._id[index]){

                        var id = req.body._id[index];

                        Enlaces.findByIdAndUpdate(req.body._id[index], { servidor: req.body.servidor[index], url: req.body.url[index]}, function(err, enlace) {
                            if (err) throw err;
                        });

                    }else{
                        
                        var enlace_new = new Enlaces({
                            servidor: req.body.servidor[index],
                            url: req.body.url[index],
                            pelicula: pelicula_update._id
                        });

                        enlace_new.save();  

                        pelicula_update.enlace.push(enlace_new);                    
                    }
                }

                fs.rename(req.file.path,"public/imagenes/films/"+req.body.titulo+"."+extension,function (err) {
					if (err) return console.error(err);
					console.log("Imagen enviada a la carpeta de imagenes!");
				});
                
                pelicula_update.save().then(function(us){
                    res.status(200).json("Pelicula actualizada correctamente...");
                },function(err){
                    res.status(200).json("Hubo un error al actualizar los datos de la pelicula");
                });
            }
        });
    })
    .delete(function(req,res){
        Peliculas.findById(req.params.id,function(err,pelicula){
            if(err){
                res.status(200).json("No existe la pelicula");
            }else{
                var pelicula_delete = pelicula;
                
                Enlaces.remove({pelicula: req.params.id}, function(error){
                    if(error){
                        console.log('Error al intentar eliminar el enlace.');
                    }else{ 
                        console.log('Enlace eliminado correctamente');
                    }
                });

                pelicula_delete.remove().then(function(us){
                    fs.unlink("public/imagenes/films/" + pelicula.foto);                    
                    res.status(200).json("Pelicula eliminada correctamente...");
                },function(err){
                    res.status(200).json("Hubo un error al eliminar los datos de la pelicula");
                });                

            }
        });
    });

router.route('/peliculas')
    .get(function(req,res){
        Peliculas.find({})
        .populate("genero")
		.populate("enlace")
		.exec(function (err,films) {
			if (err) {
				res.json(err); 
			}else{
                res.status(200).json(films);
			}
		});
    })
    .post(upload,function(req,res){

        var extension = req.file.originalname.split(".").pop();
        var longitudEnlace = Object.keys(req.body.servidor).length;
        var idenEnlace = [];
        // console.log(req.file);
        // console.log(req.file.path);
       
        var film = new Peliculas({
            titulo: req.body.titulo,
            age: req.body.age,
            descripcion: req.body.descripcion,
            audio: req.body.audio,
            calidad: req.body.calidad,
            puntuacion: req.body.puntuacion,
            director: req.body.director,
            elenco: req.body.elenco,
            genero: req.body.genero,
            foto: req.body.titulo + "." + extension
        });
        
        for(var i=0; i < longitudEnlace; i++){
            var enlace_new = new Enlaces({
                    servidor: req.body.servidor[i],
                    url: req.body.url[i],
                    pelicula: film._id
                });

            enlace_new.save();

            idenEnlace.push(enlace_new);            
        }

        for(var enlace in idenEnlace){
            film.enlace.push(idenEnlace[enlace]);
        }

        film.save(function (err) {
			if (!err) {
				fs.rename(req.file.path,"public/imagenes/films/"+req.body.titulo+"."+extension,function (err) {
					if (err) return console.error(err);
					console.log("Succes!");
					res.status(200).json("guardamos tus datos.");
				});
			}else{
				res.status(200).json("Hubo un error al guardar los datos de la pelicula");
			}
		});
    });

router.route('/peliculas/:id/enlaces')
    .post(function(req,res){  
        Peliculas.findById(req.params.id,function(err,pelicula){
            if(err){
                res.status(200).json("No existe la pelicula");
            }else{
                
                var pelicula_update = pelicula;

                var enlace_new = new Enlaces({
                    servidor: req.body.servidor,
                    url: req.body.url
                });

                enlace_new.pelicula = pelicula_update._id;
                enlace_new.save();

                pelicula_update.enlace.push(enlace_new);

                pelicula_update.save().then(function(us){
                    res.status(200).json("Enlace guardado correctamente...");
                },function(err){
                    res.status(200).json("Hubo un error al guardar el enlace de la pelicula...");
                });
            }
        });
    });


module.exports = router;