require('dotenv').config();
var express = require('express');
var router = express.Router();
const { createUser, loginUser, logoutUser } = require('../controllers/authController');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const productModel = require('../models/product-model');
const { isAdmin } = require('../middlewares/isAdmin');

router.get('/', function (req, res) {
  res.send('hey from users router');
});

router.post('/register', createUser);


router.get('/logout', logoutUser);



router.get('/shop', isLoggedIn, async function (req, res) {
  let products = await productModel.find()
  let error = req.flash('error')

  let header = req.cookies.token
  let isAdmin = req.user.isAdmin
  res.render('shop', { products, error, header, isAdmin });

});

router.post('/login', loginUser);




module.exports = router;
