var express = require('express');
var router = express.Router();
const db = require('../configs/mongoose-connection');
const upload = require('../configs/multer')
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const productModel = require('../models/product-model');
const ownerModel = require('../models/owner-model');
const { isAdmin } = require('../middlewares/isAdmin');
const userModel = require('../models/user-model');

router.get('/', function (req, res) {
  res.send('hey from products router');
});

router.post('/create', isLoggedIn, upload.single('image'), async (req, res) => {
  let admin = await userModel.findOne({ email: req.user.email });
  const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body
  let product = await productModel.create({
    image: req.file.filename,
    name,
    price,
    discount,
    bgcolor,
    panelcolor,
    textcolor,
  })
  console.log(req.user)
  admin.cart.push(product._id);
  await admin.save();
  res.redirect('/users/shop')
})

module.exports = router;
