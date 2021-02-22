const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    mail: {
        type: String
    },
    password: {
        type: String
    },
    isAuth: {
        type: Boolean
    }
})


module.exports = mongoose.model('User', userSchema)
