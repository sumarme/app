var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sumarme' });
});

router.get('/registrate', function(req, res, next) {
  res.render('registrate', { title: 'Registrarme' });
});

router.get('/postularme', function(req, res, next) {
  res.render('postularme', { title: 'Postularme' });
});

module.exports = router;
