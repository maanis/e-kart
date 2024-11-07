var express = require('express');
var router = express.Router();
const db = require('../configs/mongoose-connection');
const { isLoggedIn } = require('../middlewares/isLoggedIn');

router.get('/', function (req, res) {
  let error = req.flash('error');
  res.render('index', { error });
});






module.exports = router;
