const express = require('express')
const expressLayout = require('express-ejs-layouts')
const app = express()
const mongoose = require('mongoose')
const db = mongoose.connection

mongoose.connect('mongodb://localhost/chall48', {
    useNewUrlParser: true
})
db.on('error', error => console.log('err: ', error))
db.once('open', () => console.log('Mongoose connecté'))

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layout/layout')
app.use(expressLayout)
app.use(express.static(__dirname + '/ressources'))

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(3000)