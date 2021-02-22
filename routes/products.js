const express = require('express')
const router = express.Router()
const Product = require('../models/product')

router.get('/index', (req, res) => {
    res.render('products/index')
})

router.get('/new', (req, res) => {
    res.render('products/new')
})


router.get('/all', async (req, res) => {
    Product.find({}).then(
        (list) => productList,
        res.render('index', productList )
    )
})

router.post('/newProduct', async (req, res) => {
    const newProduct = Product ({
        name: 'testImg',
        path: 'logo-pomona-passionfroid',
        coll: 'res',
        extension: 'jpg',
        typeImg: 'logo',
        format: '1/1',
        tags: ['test', '420'],
        isProduct: true,
        isHuman: false,
        isInstitu: false,
        isCopyrighted: true
    })
    newProduct.save().then(
        res.send('ok')
    )
})

module.exports = router 