require('dotenv').config();
var express = require('express');
var router = express.Router();
const db = require('../configs/mongoose-connection');
const userModel = require('../models/user-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const tokenGenerator = require('../utils/jwtToken');
const { createUser, loginUser, logoutUser } = require('../controllers/authController');

router.get('/', function (req, res) {
  res.send('hey from users router');
});

router.post('/register', createUser);

router.post('/login', loginUser);

router.post('/logout', logoutUser);





module.exports = router;
