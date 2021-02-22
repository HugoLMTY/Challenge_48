const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String
    },
    coll: {
        type: String
    },
    extension: {
        type: String
    },
    typeImg: {
        type: String
    },
    format: {
        type: String  
    },
    path: {
        type: String
    },
    tags: {
        type: Array
    },
    maxDateUsing: {
        type: Date
    },
    isProduct: {
        type: Boolean
    },
    isHuman: {
        type: Boolean
    },
    isInstitu: {
        type: Boolean
    },
    isCopyrighted: {
        type: Boolean
    }
})

module.exports = mongoose.model('Product', productSchema)
