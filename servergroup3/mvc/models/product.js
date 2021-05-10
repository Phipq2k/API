const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    productName: {
        type: String
    },
    productType: {
        type: String
    },
    productDescription: {
        type: String
    },
    productPrice: {
        type: Number
    },
    productAmount: {
        type: Number
    }
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product