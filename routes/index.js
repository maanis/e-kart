var express = require('express');
var router = express.Router();
const db = require('../configs/mongoose-connection');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');


router.get('/', function (req, res) {
  let error = req.flash('error');
  let header = false
  res.render('index', { error, header });
});

// router.get('/cart', function (req, res) {
//   res.render('cart')
// });

router.get('/edit/:id', async function (req, res) {
  let product = await productModel.findById({ _id: req.params.id });
  res.render('editproduct', { product });
});


router.get('/delete/:id', async function (req, res) {
  let product = await productModel.findOneAndDelete({ _id: req.params.id });
  res.redirect('/users/shop')
  // res.send('product')
});
router.get('/cart/:id', isLoggedIn, async function (req, res) {
  let user = await userModel.findOne({ email: req.user.email })
  let product = await productModel.findById(req.params.id);
  user.cart.push(product._id);
  await user.save();
  user = await userModel.findOne({ email: req.user.email }).populate('cart');
  console.log(user.cart)
  req.flash('error', 'added to cart');
  res.redirect('/users/shop')
});

router.get('/cart', isLoggedIn, async function (req, res) {
  user = await userModel.findOne({ email: req.user.email }).populate('cart');
  cart = user.cart

  res.render('cart', { header: true, cart });
});









module.exports = router;
