var express = require('express');
var router = express.Router();

var mongoUtils = require('../lib/mongoUtils.js');
var geoPosition = require('../lib/geoPosition.js');
var ObjectID = require('mongodb').ObjectID;


//var db = mongoUtils.getDB();



/* GET home page. */
router.get('/', function(req, res, next) {

    res.cookie("userViewed", []); //para crear la cookie
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


    router.post('/api/avisar', function(req, res, next) {
        // voy a la base, modifico el documento del usuario
        // req.body es la data que el cliente envía
        db.collection('users').update({
            nombre: req.body.nombre
        }, {
            $set: {
                mensaje: "Has sido convocado"
            }
        });
    });

    router.get('/seleccion', function(req, res, next) {

        // como los _id son objetos, para crear el filtro 
        // tengo que hacer que cada string de _id sea un objeto

        var userViewedArr = req.cookies.userViewed;
        var objectIdarr = [];

        userViewedArr.forEach(function(curr, index, arr) {
            objectIdarr.push(new ObjectID(curr));
        });

        var filter = {
            disponible: true,
            _id: {
                $nin: objectIdarr
            }
        };

        // db.collection().find({
        //     _id: new ObjectId("55d7dc0b138e80823a6b700e")
        // })


        db.collection('users').findOne(filter, function(err, myUser) {
            if (myUser) {
                console.log(myUser);
            } else {
                console.log('no data for this');

            }

            if (err) {
                // template de errores
                return res.render('error', {
                    error: err
                });
            }

            userViewedArr.push(myUser._id);
            res.cookie("userViewed", userViewedArr);

            res.render('seleccion', {
                title: 'Selecciones',
                user: myUser
            });




        });
    });

});

module.exports = router; // cuando haga requiere de este archivo va a tener estos resultados