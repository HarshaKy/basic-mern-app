const mongoose = require('mongoose')
const validator = require('validator')

var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },

    addresses: {
        hometown: {
            type: String,
            required: true,
            trim: true,
            minlength: 1
        },
        current: {
            type: String,
            required: true,
            trim: true,
            minlength: 1
        },
        work: {
            type: String,
            required: true,
            trim: true,
            minlength: 1
        }
    }
})

var User = mongoose.model('User', UserSchema)

module.exports = {User}