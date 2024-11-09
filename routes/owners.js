var express = require('express');
var router = express.Router();
const ownerModel = require('../models/owner-model');
const { isLoggedIn } = require('../middlewares/isLoggedIn');
const { isAdmin } = require('../middlewares/isAdmin');
const tokenGenerator = require('../utils/jwtToken');
const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV === `development`) {
    router.post('/create', async function (req, res) {
        let owner = await ownerModel.find()
        if (owner.length > 0) return res.status(503).send('you cant create a new owner');
        let { fullname, email, password } = req.body
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.status(500).send('server error');
                if (fullname && email && password != '') {
                    let newUser = await ownerModel.create({
                        fullname,
                        email,
                        password: hash,
                    });
                    res.cookie('token', tokenGenerator(newUser))
                    res.send(newUser);
                }
                else {
                    req.flash('error', 'Please fill all fields')
                    res.redirect('/')
                }
            });
        })
    });
}
router.get('/', function (req, res) {
    res.send('hey from owners router');
});

router.get('/create-products', isLoggedIn, isAdmin, function (req, res) {
    let success = req.flash('success');

    res.render('createproducts', { success, header: req.login })
});

module.exports = router;
