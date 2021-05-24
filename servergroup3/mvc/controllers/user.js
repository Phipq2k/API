/**
 * We can interact with mongoose in 3 way
 * [x] Callback
 * [x] Promises
 * [x] Async/await (Promises) 
 */


const userModel = require('../models/user')
const jwt = require('jsonwebtoken')
const JWT_SECRET = 'shdsahdh#3$#2@jkdhjdhsdhjsjkahdhh%%%%'


//Async/await
const getUser = async(req, res, next) => {
    const user = await userModel.find({})
    return res.status(201).json({ user })
}


const newUser = async(req, res, next) => {
    const newuser = new userModel(req.value.body)
    await newuser.save()
    return res.status(200).json({ user: newuser })


}

const loginUser = async(req, res, next) => {
    const userEmail = req.value.body.userEmail
    const userPassword = req.value.body.userPassword
    const exituser = await userModel.find({ userEmail, userPassword }).lean()
    const token = jwt.sign({
        id: exituser._id,
        userEmail: exituser.userEmail
    }, JWT_SECRET)

    console.log('token: ', token);
    return res.status(201).json({ token })

}

const changePassWordUser = async(req, res, next) => {

    const { token, newpassword } = req.value.body
    const exitUser = jwt.verify(token, JWT_SECRET)
    console.log('user ', exitUser)
    const _id = exitUser.id
    await exitUser.findByIdAndUpdate({ _id }, {
        $set: { newpassword }
    })
    return res.status(201).json({ success: true })

}




const getOneUser = async(req, res, next) => {
    const { userID } = req.value.params
        //console.log('Request params', req.params)
    const user = await userModel.findById(userID)
        //console.log('user info', user)

    res.status(200).json({ user })
}

const replaceUser = async(req, res, next) => {
    //enforce new product to old product
    const { userID } = req.value.params
    const result = await userModel.findByIdAndUpdate(userID)
    return res.status(201).json({ success: true })

}

const updateUser = async(req, res, next) => {
    //number of fields
    const { userID } = req.value.params
    const newUser = req.body
    const result = await userModel.findByIdAndUpdate(userID, newUser)
    return res.status(201).json({ success: true })
}
const deleteUserById = async(req, res, next) => {
    const { userID } = req.value.params
    const deleteuserbyid = await userModel.findByIdAndRemove(userID)

    res.status(201).json({ success: true })
}


module.exports = {
    getUser,
    newUser,
    getOneUser,
    replaceUser,
    updateUser,
    deleteUserById,
    loginUser,
    changePassWordUser
}