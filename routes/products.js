const express = require('express')
const router = express.Router()
const Product = require('../models/product')

router.get('/index', (req, res) => {
    res.render('products/index')
})

router.get('/all', async (req, res) => {
    productList = await Product.find({})
        res.render('products/index', productList)
})

router.get('/addProduct', (req, res) => {
    res.render('products/new')
})

router.post('/newProduct', async (req, res) => {
    const newProduct = Product ({
        name: req.body.productName,
        path: req.body.productPath,
        coll: req.body.productCollection,
        extension: req.body.productExt,
        typeImg: req.body.productTypeImg,
        format: req.body.product,
        tags: ['test', 'ok'],
        isProduct: req.body.product,
        isHuman: req.body.product,
        isInstitu: req.body.product,
        isCopyrighted: req.body.product
    })
    newProduct.save().then(
        res.send('ok')
    )
})

module.exports = router 