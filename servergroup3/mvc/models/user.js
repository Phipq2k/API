const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
        userAvatar: {
            type: Number
        },
        firstName: {
            trim: true,
            type: String,
            required: true
        },
        lastName: {
            type: String
        },
        userAge: {
            type: Number
        },
        userEmail: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },
        userPassword: {
            type: String,
            required: true
        },
        decks: [{
            type: Schema.Types.ObjectId,
            ref: 'Deck'
        }]
    }, {
        timestamps: true
    }

)

const User = mongoose.model('User', userSchema)
module.exports = User