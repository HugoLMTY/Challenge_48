const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    path: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Product', productSchema)
