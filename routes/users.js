const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')

var mailVerif = 'hugo.lm2707@gmail.com'

router.get('/', (req, res) => {
    res.render('user/login')
})

router.get('/profil', (req, res) => {
    res.render('user/profil')
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

router.get('/login', (req, res) => {
    res.render('user/login')
})

router.get('/register', (req, res) => {
    res.render('user/register')
})

router.post('/login', async (req, res) => {
    let loginOptions = {}
    loginOptions.mail = new RegExp(req.query.loginMail)
    
    const loginUser = await User.find(loginOptions)
    if (loginUser == '') {
        return res.render('users/login', {
            errorMessage: 'Aucun utilisateur trouvé'
        }) 
    } else {
        // if (loginUser[0].password == req.body.loginPassword){
            const hashCompare = bcrypt.compare(req.query.loginPassword, loginUser[0].password)
            if (hashCompare){
                const  {id, name, mail, password} = loginUser[0]
                res.cookie('uid', id, {expires: new Date(2069, 0, 1)})
                res.cookie('uname', name, {expires: new Date(2069, 0, 1)})
                res.cookie('isConnected', true, {expires: new Date(2069, 0, 1)})

                return res.redirect('/user/profil')
            } else
                return res.render('users/login', { errorMessage: 'Mot de passe incorrect' }) 
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
              user: 'mailing node',
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
    
    
module.exports = router 