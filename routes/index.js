var express = require('express');
var router = express.Router();
const db = require('../configs/mongoose-connection');

router.get('/', function (req, res) {
  let error = 404;
  res.render('index', { error });
});


module.exports = router;
