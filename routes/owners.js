var express = require('express');
var router = express.Router();
const db = require('../configs/mongoose-connection');

router.get('/', function (req, res) {
    res.send('hey from owners router');
});
router.get('/lol', function (req, res) {
    res.send('hey from owners lol router');
});


module.exports = router;
