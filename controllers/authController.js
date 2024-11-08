const userModel = require('../models/user-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const tokenGenerator = require('../utils/jwtToken');

module.exports.createUser = async function (req, res) {
    try {
        let { fullname, email, password } = req.body;
        let user = await userModel.findOne({ email });
        if (user) {
            req.flash('error', 'You already have an account, Please logIn')
            res.redirect('/')
        }
        else {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, async (err, hash) => {
                    if (err) return res.status(500).send('server error');
                    if (fullname && email && password != '') {
                        let newUser = await userModel.create({
                            fullname,
                            email,
                            password: hash,
                        });
                        res.cookie('token', tokenGenerator(newUser))
                        res.redirect('shop');
                    }
                    else {
                        req.flash('error', 'Please fill all fields')
                        res.redirect('/')
                    }
                });
            })
        }

    } catch (error) {
        res.send(error.message);
    }

}

module.exports.loginUser = async function (req, res) {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) return res.status(404).send('User not found');

    if (email && password === '') {
        req.flash('error', 'Please provide the login details')
        res.redirect('/')
        return
    }
    else {
        bcrypt.compare(password, user.password, function (err, result) {
            if (!result) {
                req.flash('error', 'Invalid Password')
                res.redirect('/')
                return
            };
            res.cookie('token', tokenGenerator(user));
            res.redirect('shop')
        })
    }
}

module.exports.logoutUser = function (req, res) {
    res.cookie('token', '');
    res.redirect('/')
}

// module.exports = { createUser };