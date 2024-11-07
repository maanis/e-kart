var express = require('express');
var router = express.Router();
const db = require('../configs/mongoose-connection');

router.get('/', function (req, res) {
  let error = req.flash('error');
  res.render('index', { error });
});

router.get('/users/shop', function (req, res) {
  let products = req.flash('error');
  res.render('shop', { products });
});




module.exports = router;
