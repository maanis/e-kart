const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    picture: String,
    contact: String,
    orders: {
        type: Array,
        default: []
    },
    cart: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('user', userSchema);