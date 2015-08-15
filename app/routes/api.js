var express = require('express');
var router = express.Router();
var mongoUtils = require('../lib/mongoUtils');

/* GET home page. */
router.get('/posularme', function(req, res, next) {
    // req.body recibo todo lo de JSON.stringify(ajax)
    //inserto lo que recibi en MongoDB
    mongoUtils.connectToServer(function(err, db) {
    	var user = req.body; //agregar id de cookie
        db.collection('users').save(user, function(err, result) { //aca meto en mogoDB
            if (err) {
                res.json({
                    error: {
                        message: err.message
                    }
                });
                return;
            }
            res.json({
            	result: true //puedo poner el mismo result
            })

        });
        //adentro pongo las modificaciones que recibi en req.body
        //en el save le paso un filtro con el id y cargo lo que haga falta
        //revisar el metodo .save en MongoDB

        //devuelvo un objeto con error o result dependiendo si fue exitoso o no
    });


});

module.exports = router;

//revisar como llegan las cookies por req.