var express = require('express');
var router = express.Router();
const db = require('../configs/mongoose-connection');
const { isLoggedIn } = require('../middlewares/isLoggedIn');

router.get('/', function (req, res) {
  let error = req.flash('error');
  let header = false
  res.render('index', { error, header });
});

router.get('/cart', function (req, res) {
  res.render('cart')
});

router.get('/cart/:id', function (req, res) {
  
});






module.exports = router;
