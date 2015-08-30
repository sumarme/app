var express = require('express');
var router = express.Router();
var mongoUtils = require('../lib/mongoUtils');

/* POST para postulaciones */
router.post('/postularme', function(req, res, next) {
    // req.body recibo todo lo de JSON.stringify(ajax) porque asi funciona express
    //inserto lo que recibi en MongoDB
    mongoUtils.connectToServer(function(err, db) {
        var user = req.body; //agregar id de cookie

        //aca inserto en mogoDB
        db.collection('users').save(user, function(err, result) {
            if (err) {
                res.json({
                    error: {
                        message: err.message
                    }
                });
                return;
            }
            res.json({
                result: req.body //puedo poner el mismo result
            })

        });
        //adentro pongo las modificaciones que recibi en req.body
        //en el save le paso un filtro con el id y cargo lo que haga falta
        //revisar el metodo .save en MongoDB

        //devuelvo un objeto con error o result dependiendo si fue exitoso o no
    });
});

//Post luego de ingresar para usuarios nuevos o existentes
router.post('/ingresar', function(req, res, next) {
    // req.body recibo todo lo de JSON.stringify(ajax) porque asi funciona express
    //inserto lo que recibi en MongoDB
    mongoUtils.connectToServer(function(err, db) {
        //guardo la informacion del cliente en una variable
        var user = req.body;
        //creo una variable vacia si el usuario no existe o traigo al usuario que hay si ya
        //esta en la base
        
        var user_existe = db.collection('users').find({
                fb_id: user.fb_id
            }, function(err, result) {
                if (err) {
                    return;
                }
                return result;
            })
            // si el usuario existe respondo exito y devuelvo el objeto que me envio el cliente
        if (user_existe) {
            res.cookie("user_fb_id", [user.fb_id]);// entender pq aparece encriptada y si eso nos va a servir
            res.json({
                result: req.body //puedo poner el mismo result
            })
            //validar con el debuger de node porque no genera la cookie

            //si el usuario no existe lo inserto en la base
        } else {
            db.collection('users').save(user, function(err, result) {
                if (err) {
                    res.json({
                        error: {
                            message: err.message
                        }
                    });
                    return;
                }
                res.cookie("user_fb_id", [user.fb_id]);
                res.json({
                    result: req.body //puedo poner el mismo result
                })
            })
        }
    })
});

module.exports = router;