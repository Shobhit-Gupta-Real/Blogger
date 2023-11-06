const { default: mongoose } = require('mongoose')
const {Schema, model} = mongoose

const Userschema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const Usermodel = model('User', Userschema)
module.exports = Usermodel;