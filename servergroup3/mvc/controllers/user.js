/**
 * We can interact with mongoose in 3 way
 * [x] Callback
 * [x] Promises
 * [x] Async/await (Promises) 
 */
const userModel = require('../models/user')

//Async/await
const getUser = async(req, res, next) => {

    const user = await userModel.find({})
    return res.status(201).json({ user })
}

const newUser = async(req, res, next) => {
    const newuser = new userModel(req.body)
    await newuser.save()
    return res.status(200).json({ user: newuser })


}
const getOneUser = async(req, res, next) => {
    const { userID } = req.params
    console.log('Request params', req.params)
    const user = await userModel.findById(userID)
    console.log('user info', user)

    res.status(200).json({ user })
}

const replaceUser = async(req, res, next) => {
    //enforce new product to old product
    const { userID } = req.params
    const newUser = req.body
    const result = await userModel.findByIdAndUpdate(userID, newUser)
    return res.status(201).json({ success: true })

}

const updateUser = async(req, res, next) => {
    //number of fields
    const { userID } = req.params
    const newUser = req.body
    const result = await userModel.findByIdAndUpdate(userID, newUser)
    return res.status(201).json({ success: true })
}
const deleteUserById = async(req, res, next) => {
    const { userID } = req.params
    const deleteuserbyid = await userModel.findByIdAndRemove(userID)

    res.status(201).json({ success: true })
}


module.exports = {
    getUser,
    newUser,
    getOneUser,
    replaceUser,
    updateUser,
    deleteUserById
}