const userModel = require('../models/user-model');
const ownerModel = require('../models/owner-model');
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


// module.exports.loginUser = async (req, res) => {
//     const { email, password, isAdmin } = req.body;

//     try {
//         let user;
//         if (isAdmin) {
//             user = await ownerModel.findOne({ email });
//             bcrypt.compare(password, user.password, function (err, result) {
//                 if (!result) {
//                     req.flash('error', 'Invalid Password')
//                     res.redirect('/')
//                     return
//                 };
//                 res.cookie('token', tokenGenerator(user));
//                 res.redirect('/owners/create-products')
//             })
//         } else {
//             user = await userModel.findOne({ email });
//             bcrypt.compare(password, user.password, function (err, result) {
//                 if (!result) {
//                     req.flash('error', 'Invalid Password')
//                     res.redirect('/')
//                     return
//                 };
//                 res.cookie('token', tokenGenerator(user));
//                 res.redirect('shop')
//                 console.log(user)
//                 console.log(isAdmin)
//             })
//         }

//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Server error');
//     }
// };

module.exports.loginUser = async (req, res) => {
    const { email, password, isAdmin } = req.body;

    try {
        let user;
        if (isAdmin) {
            user = await ownerModel.findOne({ email });
            bcrypt.compare(password, user.password, function (err, result) {
                if (!result) {
                    req.flash('error', 'Invalid Password')
                    res.redirect('/')
                    return
                };
                const token = jwt.sign({ email, id: user._id, isAdmin: user.isAdmin }, process.env.SECRET_KEY)
                res.cookie('token', token)
                res.redirect('shop')
            })
        } else {
            user = await userModel.findOne({ email });
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

    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};


module.exports.logoutUser = function (req, res) {
    res.cookie('token', '');
    res.redirect('/')
}

// module.exports = { createUser };