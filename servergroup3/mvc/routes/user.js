const express = require('express')
const userrouter = require('express-promise-router')()
const userController = require('../controllers/user')

userrouter.route('/')
    .get(userController.getUser)
    .post(userController.newUser)

userrouter.route('/:userID')
    .get(userController.getOneUser)
    .put(userController.replaceUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUserById)

userrouter.route('/:userID/decks')
    .get(userController.getUserDecks)
    .post(userController.newUserDeck)

module.exports = userrouter