const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
        firstName: {
            trim: true,
            type: String,
            required: true,
        },
        lastName: {
            type: String
        },
        userDateOfBirth: {
            type: Number
        },
        userEmail: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },
        accommodation: {
            type: String,
            default: ''
        },
        userPassword: {
            type: String,
            required: true,
            default: ''
        },
        decks: [{
            type: Schema.Types.ObjectId,
            ref: 'Deck'
        }]
    }, {
        collection: 'users'
    },

    {
        timestamps: true
    }

)

const User = mongoose.model('User', userSchema)
module.exports = User