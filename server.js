const express = require('express')
const expressLayout = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const db = mongoose.connection

mongoose.connect('mongodb+srv://admin:admin@cluster0.1mslv.mongodb.net/PassionFroid', {
    useNewUrlParser: true
})
db.on('error', error => console.log('err: ', error))
db.once('open', () => console.log('Mongoose connecté'))

const indexRouter = require('./routes/index')
const userRouter = require('./routes/users')
const productRouter = require('./routes/products')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layout/layout')
app.use(express.static('public'))
app.use(expressLayout)
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

app.use('/', indexRouter)
app.use('/users', userRouter)
app.use('/products', productRouter)
app.use(express.static(__dirname + '/ressources'))

app.listen(3000)