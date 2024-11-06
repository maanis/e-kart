const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    image: String,
    name: String,
    price: Number,
    discount: {
        type: number,
        default: 0
    },
    bgcolor: string,
    panelcolor: string,
    textcolor: string,
})

module.exports = mongoose.model('product', productSchema);