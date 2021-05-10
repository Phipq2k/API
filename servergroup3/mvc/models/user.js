const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
        userAvatar: {
            type: Number
        },
        userName: {
            trim: true,
            type: String,
            required: true
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
        }
    }, {
        timestamps: true
    }

)

const User = mongoose.model('User', userSchema)
module.exports = User