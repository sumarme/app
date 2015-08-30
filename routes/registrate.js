var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/registrate', function(req, res, next) {
  res.render('registrate', { title: 'Sumarme Registro' });
});

module.exports = router;
