const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');
const ownerModel = require('../models/owner-model');

module.exports.isLoggedIn = async (req, res, next) => {
    if (!req.cookies.token) {
        req.flash('error', 'Please login first');
        return res.redirect('/');
    }

    try {
        const decoded = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
        if (decoded.hasOwnProperty('isAdmin')) {
            let user = await ownerModel.findOne({ email: decoded.email });
            req.user = user;
        } else {
            let user = await userModel.findOne({ email: decoded.email });
            req.user = user;
        }
        next()
    } catch (error) {
        req.flash('error', 'Invalid or expired token');
        return res.redirect('/');
    }
};
