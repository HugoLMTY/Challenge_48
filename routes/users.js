const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const SMTPTransport = require("nodemailer/lib/smtp-transport");

var mailVerif = "hugo.lm2707@gmail.com";

router.get("/", (req, res) => {
  res.render("user/login");
});

router.get("/profil", async (req, res) => {
  var _uid = req.cookies["uid"];
  var _uname = req.cookies["uname"];

  if (_uid != null) {
    userInfos = await User.find({ _id: _uid });
    console.log(userInfos);
    res.render("user/profil", userInfos);
  } else {
    res.redirect("/users/login");
  }
});

router.get("/register", (req, res) => {
  res.render("user/register");
});

router.get("/login", (req, res) => {
  var _uid = req.cookies["uid"];

  if (_uid != null) res.redirect("user/profil");
  else res.render("user/login");
});

router.get("/register", (req, res) => {
  var _uid = req.cookies["uid"];

  if (_uid != null) res.redirect("user/profil");
  else res.render("user/register");
});

router.post("/userLogin", async (req, res) => {
  let loginOptions = {};
  loginOptions.mail = new RegExp(req.body.loginMail, "i");
  const loginUser = await User.find(loginOptions);
  if (loginUser == "") {
    return res.render("user/login", {
      errorMessage: "Aucun utilisateur trouvé",
    });
  } else {
    // if (loginUser[0].password == req.body.loginPassword){
    const hashCompare = await bcrypt.compare(
      req.body.loginPassword,
      loginUser[0].password
    );
    if (hashCompare) {
      res.cookie("uid", loginUser[0]._id, { expires: new Date(2069, 0, 1) });
      res.cookie("uname", loginUser[0].name, { expires: new Date(2069, 0, 1) });
      res.cookie("isConnected", true, { expires: new Date(2069, 0, 1) });
      return res.redirect("/users/profil");
    } else
      return res.render("user/login", {
        errorMessage: "Mot de passe incorrect",
      });
  }
});

router.post("/userRegister", async (req, res) => {
  const hash = await bcrypt.hash(req.body.registerPassword, 10);
  try {
    const newUser = new User({
      name: req.body.registerName,
      mail: req.body.registerMail,
      password: hash,
      isAuth: false,
    });
    await newUser.save();

    var transporter = nodemailer.createTransport(
      new SMTPTransport({
        host: "smtp.gmail.com",
        secure: true, // use SSL
        port: 465, // port for secure SMTP
        auth: {
          user: "mailnode420@gmail.com",
          pass: "Nodenode420",
        },
        tls: {
          rejectUnauthorized: false,
        },
      })
    );

    var mailOptions = {
      from: "mailnode420@gmail.com",
      to: "fxu93120@gmail.com",
      subject: "PassionFroid",
      text:
        "Bienvenue sur le PassionFroid, votre compte à été créer et votre mail à été vérifié.",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.render("user/login", {
      successMessage: "Compte crée",
    });
  } catch (e) {
    console.log(e);
    res.render("user/register", {
      errorMessage: "Erreur",
    });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie();
  res.redirect("/products/index");
});

module.exports = router;
