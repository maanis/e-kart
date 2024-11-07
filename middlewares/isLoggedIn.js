const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

module.exports.isLoggedIn = async (req, res) => {
    console.log(req.cookies.token)
    if (!req.cookies.token) {
        require.flash('error', 'please login first');
        res.redirect('/index');
    } else {
        let decoded = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
        let user = await userModel.findOne({ email: decoded.email });
        console.log(user)
    }
}