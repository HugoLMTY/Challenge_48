const express = require('express')
const router = express.Router()
const Product = require('../models/product')

router.get('/display', (req, res) => {
    res.render('products/display')
})

router.get('/editPub', (req, res) => {
    res.render('products/editpub')
})

router.get('/action', (req, res) => {

    const id_product = req.body.idProduct
    
    if (req.body.actionBtn == 'delete') {
        res.render('products/delete', {
            id: id_product
        })
    } else if (req.body.actionBtn == 'edit') {
        res.render('product/edit', {
            id: id_product
        })
    }
})


router.get('/all', async (req, res) => {

    currentStates =  []
    currentStates.currentName = req.query.productName
    currentStates.currentTags = req.query.productTags
    currentStates.currentColl = req.query.productColl
    currentStates.currentDate = req.query.productDate


    const searchOptions = {}
    if (req.query.productName)
        searchOptions.name = req.query.productName

    if (req.query.productTags)
        searchOptions.tags = req.query.productTags

    if (req.query.productDate)
        searchOptions.date = req.query.productDate

    if (req.query.productIsProduct == 'on'){
        searchOptions.isProduct = true
        currentStates.productIsProduct = true
    }
    
    if (req.query.productIsInstitu == 'on'){
        searchOptions.isInstitu = true
        currentStates.productIsInstitu = true
    }

    if (req.query.productIsHuman == 'on'){
        searchOptions.isHuman = true
        currentStates.productIsHuman = true
    }

    if (req.query.productIsCopyright == 'on'){
        searchOptions.isCopyrighted = true
        currentStates.productIsCopyright = true
    }
    
    console.log('state: ', currentStates)
    console.log('options: ', searchOptions)

    productList = await Product.find(searchOptions)
    res.render('products/index', {
        productList: productList,
        currents: currentStates
    })
})

router.get('/addProduct', (req, res) => {
    res.render('products/display')
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