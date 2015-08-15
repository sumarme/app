var express = require('express');
var router = express.Router();

var mongoUtils = require('../lib/mongoUtils.js');
var db = mongoUtils.getDB();



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

router.get('/seleccion', function(req, res, next) {

    var filter = {
        disponible: true
    };

    db.collection('users').findOne(filter, function(err, user) {

        if (err) {
            // template de errores
            return res.render('error', {
                error: err
            });
        }
        res.render('seleccion', {
            title: 'Selecciones',
            user: user
        });

    });

});

module.exports = router;