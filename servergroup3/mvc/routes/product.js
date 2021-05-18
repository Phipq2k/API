const productrouter = require('express-promise-router')()
const productController = require('../controllers/product')
const { ValidateBody, ValidateParams, schema } = require('../helpers/validatehelpers')
const { upload } = require('../helpers/configimagefile')

productrouter.route('/')
    .get(productController.getProduct)
    .post(upload, productController.newProduct)

productrouter.route('/:productID')
    .get(productController.getOneProduct)
    .put(upload, productController.replaceProduct)
    .patch(upload, productController.updateProduct)
    .delete(productController.deleteProductById)

productrouter.route('/image')
    .post(upload, productController.uploadImage)


module.exports = productrouter