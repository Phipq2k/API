const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    id: {
        type: Number
    },
    title: {
        type: String
    },
    price: {
        type: Number
    },
    category: {
        type: String
    },
    subcategory: {
        type: String
    },
    sale: {
        type: Boolean
    },
    img: {
        type: String
    },
    inventory: {
        type: Number
    },
    description: {
        type: String
    }

}, {

    collection: 'product'
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product