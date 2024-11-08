const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

module.exports.isLoggedIn = async (req, res, next) => {
    if (!req.cookies.token) {
        req.flash('error', 'Please login first');
        return res.redirect('/');
    }

    try {
        const decoded = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
        const user = await userModel.findOne({ email: decoded.email });

        if (!user) {
            req.flash('error', 'User not found');
            return res.redirect('/');
        }

        req.user = user;
        req.login = true;
        next();
    } catch (error) {
        req.flash('error', 'Invalid or expired token');
        return res.redirect('/');
    }
};
