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
  let admin = await ownerModel.findOne({ email: req.user.email });
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
  // console.log(req.user)
  admin.products.push(product._id);
  await admin.save();
  req.flash('success', 'Product created successfully');
  res.redirect('/owners/create-products')
})

router.post('/update/:id', isLoggedIn, upload.single('image'), async (req, res) => {
  let { name, price, discount } = req.body
  let product = await productModel.findByIdAndUpdate(req.params.id, { name, price, discount }, { new: true })
  // console.log(req.file)
  if (req.file) {
    let image = req.file.filename
    product.image = image
    await product.save()
  }
  res.redirect('/users/shop')
})



module.exports = router;
