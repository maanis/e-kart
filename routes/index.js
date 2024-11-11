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
  // console.log(user.cart)
  const exists = user.cart.filter(e => e.productId.equals(product._id))
  if (exists.length > 0) {
    exists[0].quantity += 1;
  } else {
    user.cart.push({ productId: product._id, quantity: 1 });
  }
  // console.log(exists)
  await user.save();
  req.flash('error', 'added to cart');
  res.redirect('/users/shop')
});

router.get('/cart', isLoggedIn, async function (req, res) {
  user = await userModel.findOne({ email: req.user.email }).populate('cart.productId');
  cart = user.cart
  let message = req.flash('massage')
  console.log(message)
  res.render('cart', { header: true, cart, message });
});


router.get('/less/:id', isLoggedIn, async function (req, res) {
  const user = await userModel.findOne({ email: req.user.email })
  const productId = user.cart.findIndex(e => e._id.equals(req.params.id))
  if (user.cart[productId].quantity > 1) {
    user.cart[productId].quantity -= 1;
  } else {
    user.cart.splice(productId, 1)
  }
  await user.save()
  res.redirect('/cart')
});

router.get('/add/:id', isLoggedIn, async function (req, res) {
  const user = await userModel.findOne({ email: req.user.email })
  const productId = user.cart.findIndex(e => e._id.equals(req.params.id))
  if (user.cart[productId].quantity < 10) {
    user.cart[productId].quantity += 1;
    await user.save()
  } else {
    req.flash('massage', `you can't add more items`)
  }
  res.redirect('/cart')
});

router.get('/remove/:id', isLoggedIn, async function (req, res) {
  const user = await userModel.findOne({ email: req.user.email })
  let index = user.cart.findIndex(e => e._id.equals(req.params.id))
  console.log(index)
  user.cart.splice(index, 1)
  await user.save()
  res.redirect('/cart')
});














module.exports = router;
