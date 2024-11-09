module.exports.isAdmin = (req, res, next) => {
    let user = req.user

    if (user.isAdmin) {
        next()
    }
    else {
        req.flash('error', 'You are not an admin');
        return res.redirect('/users/shop');
    }
};
