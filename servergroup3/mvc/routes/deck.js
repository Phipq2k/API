const express = require('express')
const deckRoutes = require('express-promise-router')()
const deckController = require('../controllers/deck')
const { ValidateBody, ValidateParams, schema } = require('../helpers/validatehelpers')

deckRoutes.route('/')
    .get(deckController.getDeck)
    .post(ValidateBody(schema.newdeckSchema), deckController.newDeck)

deckRoutes.route('/:deckID')
    .get(ValidateParams(schema.idSchema, 'deckID'), deckController.getOneDeck)
    .put(ValidateParams(schema.idSchema, 'deckID'), ValidateBody(schema.newdeckSchema), deckController.replaceDeck)
    .patch(ValidateParams(schema.idSchema, 'deckID'), ValidateBody(schema.optiondeckSchema), deckController.updateDeck)
    .delete(ValidateParams(schema.idSchema, 'deckID'), deckController.deleteDeck)
module.exports = deckRoutes