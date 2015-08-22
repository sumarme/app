var express = require('express');
var router = express.Router();

var mongoUtils = require('../lib/mongoUtils.js');
var geoPosition = require('../lib/geoPosition.js');



//var db = mongoUtils.getDB();

/*var dbH = [{
    users = {
        "usuario1": {
            "nombre": "mayor tom",
            "edad": "23",
            "puesto": "delantero",
            "foto": "123"
        },
        "usuario1": {
            "nombre": "kirk",
            "edad": "26",
            "puesto": "delantero",
            "foto": "124"
        },
        "usuario1": {
            "nombre": "clark",
            "edad": "28",
            "puesto": "delantero",
            "foto": "124"
        }
    }
}]*/



/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

router.get('/registrate', function(req, res, next) {
    res.render('registrate', {
        title: 'Express'
    });
});

/*if (geoPosition.init()) { // Geolocation Initialisation
    geoPosition.getCurrentPosition(success_callback, error_callback, {
        enableHighAccuracy: true
    });
} else {
    // You cannot use Geolocation in this device
}
geoPositionSimulator.init();

function success_callback(p) {
            // p.latitude : latitude value
            // p.longitude : longitude value
}

// p : geolocation object

function error_callback(p) {
    // p.message : error message
}*/



mongoUtils.connectToServer(function(err, db) {
    if (err) {
        console.log(err);
    }

    router.get('/seleccion', function(req, res, next) {

        var filter = {
            disponible: true
        };


        db.collection('users').findOne({}, function(err, userP) {
            if (userP) {
                console.log(userP.nombre);
            } else {
                console.log('no data for this');

            }

            if (err) {
                // template de errores
                return res.render('error', {
                    error: err
                });
            }


            res.render('seleccion', {
                title: 'Selecciones',
                user: userP
            });
            db.close();
        });
    });

});

module.exports = router;