const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passwordValidator = require("password-validator");
require("dotenv").config();
const { User, Post } = require("../models");
//----------------------------------------------------------------------------------------------------------------------
//creation du schema
let schema = new passwordValidator();
schema
  .is()
  .min(8) //au moins 8 caractères
  .is()
  .max(20) // pas plus de 20 caractères
  .has()
  .uppercase() // au moins une minuscule
  .has()
  .lowercase() // au moins une majuscule
  .has()
  .digits(1) // au moins un chiffre
  .has()
  .not()
  .spaces() //pas d'espaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]);

const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//----------------------------------------------------------------------------------------------------------------------
//SIGNUP
exports.signup = async (req, res, next) => {
  if (!regexEmail.test(req.body.email)) {
    return res.status(400).json({ error: "Email incorrect" });
  }
  if (!schema.validate(req.body.password)) {
    res.status(400).json({
      error:
        "le mot de passe doit contenir au moins 8 caractères dont 1 chiffre, 1 lettre majuscule et 1 minuscule",
    });
  }
  if (
    !req.body.email ||
    !req.body.firstname ||
    !req.body.lastname ||
    !req.body.password
  ) {
    // si vide oun'existe pas
    return res
      .status(400)
      .json({ error: "Merci de remplir tous les champs !" });
  }

  bcrypt
    .hash(
      req.body.password,
      10
    ) /*on hash le mdp et on execute 10 fois l'algorithme*/
    .then((hash) => {
      /*on récup le hash*/
      const user = User.create({
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: hash,
      })
        .then((user) => {
          res.status(201).json({
            userId: user.id,
            isAdmin: user.isAdmin,
          });
        })
        .catch((error) =>
          res.status(500).json({ error })
        ); /*500 erreur serveur*/
    })
    .catch((error) => res.status(500).json({ error })); /*500 erreur serveur*/
};
//----------------------------------------------------------------------------------------------------------------------
//LOGIN
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Merci de remplir tous les champs !" });
  }
  try {
    const user = await User.findOne({ where: { email } });
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.status(401).json({ error: "Utilisateur non trouvé !" });
      return;
    }
    res.status(200).json({
      userId: user.id /* avec l'id*/,
      firstname: user.firstname,
      lastname: user.lastname,
      token: jwt.sign(
        /*et avec un token /// 3 arguments demandés: */
        { userId: user.id } /*correspondance de l'id utilisateur*/,
        process.env.TOKEN /*le token*/,
        { expiresIn: "24h" }
      ),
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
//----------------------------------------------------------------------------------------------------------------------
exports.getOneProfile = (req, res, next) => {
  User.findOne({
    attributes: ["id", "email", "firstname", "lastname"],
    where: { id: req.params.id },
  })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
        message: "Utilisateur non trouvé !",
      });
    });
};
//----------------------------------------------------------------------------------------------------------------------
exports.modifyProfile = (req, res, next) => {
  if (!req.body.firstname || !req.body.lastname) {
    return res
      .status(400)
      .json({ error: "Veuillez remplir tous les champs !" });
  }

  User.findOne({ where: { id: req.params.id } }).then((user) => {
    if (user.id === res.locals.userId || isAdmin === true) {
      user
        .update({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
        })
        .then(() =>
          res.status(200).json({
            message: "Profil modifié !",
            user: {
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
            },
          })
        )
        .catch((error) =>
          res.status(400).json({ error: "Mise à jour impossible !" })
        );
    }
  });
};
//----------------------------------------------------------------------------------------------------------------------
exports.deleteProfile = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then((user) => {
      if (user.id === userId || isAdmin === true) {
        user
          .destroy()
          .then(() => {
            res.status(200).json({
              message: "Profil supprimé !",
            });
          })
          .catch((error) => {
            res.status(400).json({
              error: "Le profil n'a pas pu être supprimé !",
            });
          });
      }
    })
    .catch((error) => {
      res.status(400).json({
        error: "Le profil n'a pas pu être supprimé !",
      });
    });
};
//----------------------------------------------------------------------------------------------------------------------
exports.getAllPostProfile = (req, res, next) => {
  Post.findAll({
    order: [["updatedAt", "DESC"]],
    attributes: [
      "id",
      "idUser",
      "title",
      "content",
      "image",
      "createdAt",
      "updatedAt",
    ],
    where: { idUser: res.locals.userId },
    include: [{ model: User, attributes: ["firstname", "lastname"] }],
  })
    .then((messages) => {
      res.status(200).json(messages);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
