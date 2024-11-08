var express = require('express');
var router = express.Router();
const db = require('../configs/mongoose-connection');
const ownerModel = require('../models/owner-model');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const upload = require('../configs/multer');
const { isAdmin } = require('../middlewares/isAdmin');

if (process.env.NODE_ENV === `development`) {
    router.post('/create', async function (req, res) {
        let owner = await ownerModel.find()
        if (owner.length > 0) return res.status(503).send('you cant create a new owner');
        let { fullname, email, password } = req.body
        let admin = await ownerModel.create({
            fullname,
            email,
            password,
        })
        res.send(admin)
    });
}

router.get('/', function (req, res) {
    res.send('hey from owners router');
});


router.get('/create-products', isLoggedIn, isAdmin, function (req, res) {
    let success = 1
    res.render('createproducts', { success, header: req.login })
});




module.exports = router;
