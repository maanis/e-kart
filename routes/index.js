var express = require('express');
var router = express.Router();
const db = require('../configs/mongoose-connection');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const productModel = require('../models/product-model')


router.get('/', function (req, res) {
  let error = req.flash('error');
  let header = false
  res.render('index', { error, header });
});

router.get('/cart', function (req, res) {
  res.render('cart')
});

router.get('/edit/:id', async function (req, res) {
  let product = await productModel.findById({ _id: req.params.id });
  res.render('editproduct', { product });
});


router.get('/delete/:id', async function (req, res) {
  let product = await productModel.findOneAndDelete({ _id: req.params.id });
  res.redirect('/users/shop')
  // res.send('product')
});
router.get('/cart/:id', function (req, res) {

});








module.exports = router;
