/**
 * We can interact with mongoose in 3 way
 * [x] Callback
 * [x] Promises
 * [x] Async/await (Promises) 
 */


const Deck = require('../models/deck')
const userModel = require('../models/user')

//Async/await
const getUser = async(req, res, next) => {

    const user = await userModel.find({})
    return res.status(201).json({ user })
}
const getUserDecks = async(req, res, next) => {
    const { userID } = req.params

    //get User
    const user = await userModel.findById(userID).populate('decks')
    return res.status(200).json({
        decks: user.decks
    })


}

const newUser = async(req, res, next) => {
    const newuser = new userModel(req.body)
    await newuser.save()
    return res.status(200).json({ user: newuser })


}
const newUserDeck = async(req, res, next) => {
    const { userID } = req.params
        //create new deck
    const newDeck = new Deck(req.body)

    //getUser

    const user = await userModel.findById(userID)

    //Assign user as a deck's owner
    newDeck.owner = user
        //save the deck
    await newDeck.save()
        //Add deck to user's decks array 'decks'
    user.decks.push(newDeck._id)

    //Save the user
    await user.save()

    return res.status(201).json({
        deck: newDeck
    })


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
    getUserDecks,
    newUser,
    newUserDeck,
    getOneUser,
    replaceUser,
    updateUser,
    deleteUserById
}