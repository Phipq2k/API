const express = require('express')
const userrouter = require('express-promise-router')()
const userController = require('../controllers/user')
const { ValidateBody, ValidateParams, schema } = require('../helpers/validatehelpers')

userrouter.route('/')
    .get(userController.getUser)

userrouter.route('/:userID')
    .get(ValidateParams(schema.idSchema, 'userID'), userController.getOneUser)
    .put(ValidateBody(schema.userUpdateSchema), ValidateParams(schema.idSchema, 'userID'), userController.replaceUser)
    .patch(ValidateBody(schema.userSchema), ValidateParams(schema.idSchema, 'userID'), userController.updateUser)
    .delete(ValidateParams(schema.idSchema, 'userID'), userController.deleteUserById)

userrouter.route('/:userID/decks')
    .get(ValidateParams(schema.idSchema, 'userID'), userController.getUserDecks)
    .post(ValidateParams(schema.idSchema, 'userID'), userController.newUserDeck)

userrouter.route('/register').post(ValidateBody(schema.userSchema), userController.newUser)

userrouter.route('/login').post(ValidateBody(schema.userLogin), userController.loginUser)
userrouter.route('/:userID/change-password').put(ValidateParams(schema.idSchema, 'userID'), ValidateBody(schema.userChangePassword), userController.changePassWordUser)

module.exports = userrouter