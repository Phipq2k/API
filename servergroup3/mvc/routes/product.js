const productrouter = require('express-promise-router')()
const productController = require('../controllers/product')
const { ValidateBody, ValidateParams, schema } = require('../helpers/validatehelpers')

productrouter.route('/')
    .get(productController.getProduct)
    .post(productController.newProduct)

productrouter.route('/:productID')
    .get(productController.getOneProduct)
    .put(productController.replaceProduct)
    .patch(productController.updateProduct)
    .delete(productController.deleteProductById)

module.exports = productrouter