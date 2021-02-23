const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Product = require('../models/product')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')

var mailVerif = 'hugo.lm2707@gmail.com'


router.get('/', (req, res) => {
    res.render('user/profil')
})

router.get('/profil', async (req, res) => {

    var _uid = req.cookies['uid']

    userInfos = await User.find({ _id: _uid })
    console.log(userInfos);
    res.render('user/profil', {
        userInfos: userInfos,
        userProducts: userProductsByID
    })   
})

router.get('/login', (req, res) => {
    res.render('user/login')
})

router.get('/register', (req, res) => {
    res.render('user/register')
})

router.post('/userLogin', async (req, res) => {
    let loginOptions = {}
    loginOptions.mail = new RegExp(req.body.loginMail, 'i')
    const loginUser = await User.find(loginOptions)
    if (loginUser == '') {
        return res.render('user/login', {
            errorMessage: 'Aucun utilisateur trouvé'
        }) 
    } else {
        // if (loginUser[0].password == req.body.loginPassword){
            const hashCompare = await bcrypt.compare(req.body.loginPassword, loginUser[0].password)
            if (hashCompare){
                res.cookie('uid', loginUser[0]._id, {expires: new Date(2069, 0, 1)})
                res.cookie('uname', loginUser[0].name, {expires: new Date(2069, 0, 1)})
                res.cookie('isConnected', true, {expires: new Date(2069, 0, 1)})
                var userInfos = await User.find({ _id: req.cookies['uid']})
                console.log(userInfos)
                res.render('user/profil/')
            } else
                res.render('user/login', { errorMessage: 'Mot de passe incorrect' }) 
        }      
})

router.post('/userRegister', async (req, res) => {
    const hash = await bcrypt.hash(req.body.registerPassword, 10)
    try {
        const newUser = new User ({
            name: req.body.registerName,
            mail: req.body.registerMail,
            password: hash,
            isAuth: false
        })
        await newUser.save()
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'mailnode420@gmail.com',
              pass: 'Nodenode420'
            }
          });
          
          var mailOptions = {
            from: 'mailnode420@gmail.com',
            to: 'hugo.lm2707@gmail.com',
            subject: 'ok boomer',
            text: 'laisse moi dormir zebi'
          };
          
          transporter.sendMail(mailOptions)
        res.render('user/login', {
            successMessage: 'Compte crée'
        })
    } catch(e) {
        console.log(e);
        res.render('user/register', {
            errorMessage: 'Erreur'
        })
    }
})
    
router.get('/logout', (req, res) => {
    res.clearCookie()
    res.redirect('/products/all')
})
    
module.exports = router 