require('dotenv').config();
var express = require('express');
var router = express.Router();
const db = require('../configs/mongoose-connection');
const userModel = require('../models/user-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const tokenGenerator = require('../utils/jwtToken');
const { createUser, loginUser, logoutUser } = require('../controllers/authController');
const { isLoggedIn } = require('../middlewares/isLoggedIn');

router.get('/', function (req, res) {
  res.send('hey from users router');
});

router.post('/register', createUser);

router.post('/login', loginUser);

router.get('/logout', logoutUser);



router.get('/shop', function (req, res) {
  let products = []
  let error = false
  res.render('shop', { products, error });
});




module.exports = router;
