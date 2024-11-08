module.exports.isAdmin = (req, res, next) => {
    // console.log(req.user.isAdmin)
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        req.flash('error', 'You are not an admin');
        return res.redirect('/users/shop');
    }
};
