/**
 * We can interact with mongoose in 3 way
 * [x] Callback
 * [x] Promises
 * [x] Async/await (Promises) 
 */
const productModel = require('../models/product')

//Async/await
const getProduct = async(req, res, next) => {
    const product = await productModel.find({})
    return res.status(201).json({ product })
}


const uploadImage = async(req, res, next) => {
    const imgFile = req.file.filename
    console.log('name: ', imgFile);
    await new productModel({ img: imgFile }).save()
    return res.status(201).send('upload successfull')

}

const newProduct = async(req, res, next) => {
    const newproduct = new productModel({
        id: req.body.id,
        title: req.body.title,
        price: req.body.price,
        category: req.body.category,
        subcategory: req.body.subcategory,
        sale: req.body.sale,
        img: req.file.filename,
        inventory: req.body.inventory,
        description: req.body.description
    })
    await newproduct.save()
    return res.status(200).json({ product: newproduct })


}
const getOneProduct = async(req, res, next) => {
    const { productID } = req.params
    console.log('Request params', req.params)
    const product = await productModel.findById(productID)
    console.log('product info', product)

    res.status(200).json({ product })
}

const replaceProduct = async(req, res, next) => {
    //enforce new product to old product
    const { productID } = req.params
    const newProduct = {
        id: req.body.id,
        title: req.body.title,
        price: req.body.price,
        category: req.body.category,
        subcategory: req.body.subcategory,
        sale: req.body.sale,
        img: req.file.filename,
        inventory: req.body.inventory,
        description: req.body.description
    }
    const result = await productModel.findByIdAndUpdate(productID, newProduct)
    return res.status(201).json({ success: true })

}

const updateProduct = async(req, res, next) => {
    //number of fields
    const { productID } = req.params
    const newProduct = {
        id: req.body.id,
        title: req.body.title,
        price: req.body.price,
        category: req.body.category,
        subcategory: req.body.subcategory,
        sale: req.body.sale,
        img: req.file.filename,
        inventory: req.body.inventory,
        description: req.body.description
    }
    const result = await productModel.findByIdAndUpdate(productID, newProduct)
    return res.status(201).json({ success: true })
}
const deleteProductById = async(req, res, next) => {
    const { productID } = req.params
    const deleteproductbyid = await productModel.findByIdAndRemove(productID)

    res.status(201).json({ success: true })
}


module.exports = {
    getProduct,
    newProduct,
    getOneProduct,
    replaceProduct,
    updateProduct,
    deleteProductById,
    uploadImage
}