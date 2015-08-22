var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/ingresa', function(req, res, next) {
  res.render('ingresa', { title: 'Sumarme Ingreso' });
});

module.exports = router;
