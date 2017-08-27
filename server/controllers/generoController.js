var express = require('express');
var Generos = require("../models/genero");
var Peliculas = require("../models/film");


var router = express.Router();

// rest de peliculas

// ruta para crear peliculas
router.get('/genero/new',function(req,res){
    res.render('app/genero/create');
});

router.route('/genero/:id')
    .get(function(req,res){
        Generos.findById(req.params.id,function(err,genero){
            if(err){
                res.json("Error al intentar ver los datos del genero");
            }else{
                res.json(genero);
            }
        });
    })
    .put(function(req,res){
        Generos.findById(req.params.id,function(err,genero){
            if(err){
                res.status(200).json("No existe el genero...");
            }else{
                var genero_update = genero;

                genero_update.nombre  = typeof req.body.nombre == 'undefined' ? genero.nombre : req.body.nombre;

                genero_update.save().then(function(us){
                    res.status(200).json("Genero actualizado correctamente...");
                },function(err){
                    res.status(200).json("Hubo un error al actualizar el Genero");
                });
            }
        });
    })
    .delete(function(req,res){
        Generos.remove({_id: req.params.id}, function(error){
            if(error){
                res.json('Error al intentar eliminar el genero.');
            }else{ 
                res.json('Genero eliminado correctamente');
            }
        });
    });

router.route('/genero')
    .get(function(req,res){
        Generos.find({},function (err,generos) {
            if (err) {
				res.json(err); 
			}else{
                res.json(generos);
			}
			
		});
    })
    .post(function(req,res){
        var genero = new Generos({
            nombre: req.body.nombre
        });

        genero.save().then(function(us){
            res.json("guardamos tus datos.");
        },function(err){
            res.json(err);
        });
    });

router.route('/genero/:id/peliculas')
    .get(function(req,res){
        Peliculas.find({genero:req.params.id})
        .populate("genero")
		.populate("enlace")
		.exec(function (err,peliculas) {
			if (err) {
				res.json(err); 
			}else{
				if(peliculas.length == 0){
					res.status(200).json("No hay peliculas registradas");
				}else{
                    res.status(200).json(peliculas);
				}
			}
		});
    });

module.exports = router;