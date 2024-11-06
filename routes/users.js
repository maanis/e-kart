
var express = require('express');
var router = express.Router();
const db = require('../configs/mongoose-connection');

router.get('/', function (req, res) {
  res.send('hey from users router');
});


module.exports = router;
