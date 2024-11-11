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
    cart: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product',
            },
            quantity: { type: Number, default: 1 }
        },

    ],
})

module.exports = mongoose.model('user', userSchema);