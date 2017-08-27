var express = require('express');
var Enlaces = require("../models/enlace");

var router = express.Router();

// rest de enlaces

router.route('/enlaces/:id')
    .get(function(req,res){
        Enlaces.findById(req.params.id,function(err,enlace){
            if(err){
                res.json("Erro al intentar ver los datos del enlace");
            }else{
                res.json(enlace);
            }
        });
    })
    .put(function(req,res){
        Enlaces.findById(req.params.id,function(err,enlace){
            if(err){
                res.status(200).json("No existe el enlace...");
            }else{
                var enlace_update = enlace;

                enlace_update.servidor  = typeof req.body.servidor == 'undefined' ? enlace.servidor : req.body.servidor;
                enlace_update.url       = typeof req.body.url == 'undefined' ? enlace.url : req.body.url;         

                enlace_update.save().then(function(us){
                    res.status(200).json("Enlace actualizado correctamente...");
                },function(err){
                    res.status(200).json("Hubo un error al actualizar el enlace");
                });
            }
        });
    })
    .delete(function(req,res){
        Enlaces.remove({_id: req.params.id}, function(error){
            if(error){
                res.json('Error al intentar eliminar el enlace.');
            }else{ 
                res.json('Enlace eliminado correctamente');
            }
        });
    });

router.route('/enlaces')
    .get(function(req,res){
        Enlaces.find({},function (err,enlaces) {
            if (err) {
				res.json(err); 
			}else{
				if(enlaces.length == 0){
					res.json("No hay enlaces registrados");
				}else{
					res.json(enlaces);
				}
			}
			
		});
    })
    .post(function(req,res){

        var enlace = new Enlaces({
            servidor: req.body.servidor,
            url: req.body.url
        });

        enlace.save().then(function(us){
            res.json("guardamos tus datos.");
        },function(err){
            res.json("Hubo un error al guardar el enlace");
        });
    });

module.exports = router;