const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
    res.render('user/login')
})

router.post('/newUser', async (req, res) => {

    const user = new User({
        name: 'test',
        mail: 'a@a',
        password: 'eheh',
        isAuth: true,
    })
    user.save().then(
        res.redirect('/')
    )
})



module.exports = router 