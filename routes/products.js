const express = require('express')
const router = express.Router()
const Product = require('../models/product')

router.get('/index', (req, res) => {
    res.render('products/index')
})

router.get('/display', (req, res) => {
    res.render('products/display')
})

router.get('/all', async (req, res) => {

<<<<<<< Updated upstream
=======
    currentStates =  []
    console.log(req.query.productIsProduct)
    console.log(req.query.productIsHuman)
    currentStates.currentName = req.query.productName
    currentStates.currentTags = req.query.productTags
    currentStates.currentColl = req.query.productColl
    currentStates.currentDate = req.query.productDate
    currentStates.currentIsProduct = getState(req.query.productIsProduct)
    currentStates.currentIsHuman = getState(req.query.productIsHuman)
    currentStates.currentIsInstitu = getState(req.query.productIsInstitu)
    currentStates.currentIsCopyrighted = getState(req.query.productIsCopyrighted)

    

    console.log(currentStates)


>>>>>>> Stashed changes
    const searchOptions = {}
    if (req.query.productName)
        searchOptions.name = req.query.productName

    if (req.query.productTags)
        searchOptions.tags = req.query.productTags

    if (req.query.productDate)
        searchOptions.date = req.query.productDate

    if (req.query.productIsProduct == 'on')
        searchOptions.isProduct = true
        searchOptions.name = req.query.productName
    
    if (req.query.productIsInstitu == 'on')
        searchOptions.isInstitu = true
        searchOptions.name = req.query.productName

    if (req.query.productIsHuman == 'on')
        searchOptions.isHuman = true
        searchOptions.name = req.query.productName
    
    if (req.query.productIsCopyright == 'on')
        searchOptions.isCopyrighted = true
        searchOptions.name = req.query.productName
        

   console.log(searchOptions)

    productList = await Product.find(searchOptions)
    res.render('products/index', productList)
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