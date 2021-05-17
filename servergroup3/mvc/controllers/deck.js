/**
 * We can interact with mongoose in 3 way
 * [x] Callback
 * [x] Promises
 * [x] Async/await (Promises) 
 */


const Deck = require('../models/deck')
const User = require('../models/user')


//Async/await
const getDeck = async(req, res, next) => {
    const decks = await Deck.find({})
    return res.status(201).json({ decks })
}

const newDeck = async(req, res, next) => {
    //find owner
    const owner = await User.findById(req.value.body.owner)
    const deck = req.body
    delete deck.owner
    deck.owner = owner._id
        //create new deck
    const newDeck = new Deck(deck)
    await newDeck.save()

    //Add newly created deck to the actual decks
    owner.decks.push(newDeck._id)
    await owner.save()

    return res.status(201).json({
        decks: newDeck
    })



}
const getOneDeck = async(req, res, next) => {
    const deck = await Deck.findById(req.value.params.deckID)
    return res.status(201).json({ deck })
}
const replaceDeck = async(req, res, next) => {
    const { deckID } = req.value.params
    const newDeck = req.value.body
    const result = await Deck.findByIdAndUpdate(deckID, newDeck)
    return res.status(201).json({ success: true })

}
const updateDeck = async(req, res, next) => {
    const { deckID } = req.value.params
    const newDeck = req.value.body
    const result = await Deck.findByIdAndUpdate(deckID, newDeck)
    return res.status(201).json({ success: true })
}
const deleteDeck = async(req, res, next) => {
    const { deckID } = req.value.params

    //get a deck
    const deck = await Deck.findById(deckID)
    const ownerID = deck.owner
    const owner = await User.findById(ownerID)
        //remove the deck
    await deck.remove()

    //remove deck from owner's decks list
    owner.decks.pull(deck)
    return res.status(201).json({ success: true })



}





module.exports = {
    getDeck,
    newDeck,
    getOneDeck,
    replaceDeck,
    updateDeck,
    deleteDeck
}