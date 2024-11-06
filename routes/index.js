var express = require('express');
var router = express.Router();
const db = require('../configs/mongoose-connection');

router.get('/', function (req, res) {
  res.send('Hello, World!');
});


module.exports = router;
