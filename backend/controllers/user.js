// MODULES
//const mysql = require('../dbConnect').connection;
const bcrypt = require('bcrypt'); 
const jwt = require("jsonwebtoken");
const fs = require("fs"); // Permet de gérer les fichiers stockés
const passwordValidator = require('password-validator');

//creation du schema
let schema = new passwordValidator();
schema
    .is().min(8) //au moins 8 caractères
    .is().max(20) // pas plus de 20 caractères
    .has().uppercase() // au moins une minuscule
    .has().lowercase() // au moins une majuscule
    .has().digits(1) // au moins un chiffre
    .has().not().spaces()  //pas d'espaces                         
    .is().not().oneOf(['Passw0rd', 'Password123']);


    const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//----------------------------------------------------------------------------------------------------------------------
//SIGNUP
exports.signup = async (req, res, next) => {
    
    if(!regexEmail.test(req.body.email)){
        return res.status(400).json({ error: "Email incorrect" });
    }
    //if(mdp)!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    if (
        req.body.email == "" || req.body.name == "" || req.body.firstname == "" || req.body.password == "") {
        return res
          .status(400)
          .json({ error: "Merci de remplir tous les champs !" });
      }


    bcrypt.hash(req.body.password, 10) /*on hash le mdp et on execute 10 fois l'algorithme*/
    .then(hash => {/*on récup le hash*/
      const user = models.User.create({
          email: req.body.email,
          name: req.body.name,
          firstname: req.body.firstname,
          password: hash,
          isAdmin: false,
        })
          .then((user) => {
            res.status(201).json({
              userId: user.id,
              isAdmin: user.isAdmin,
            });
      });
        then(() => res.status(201).json({ message: 'Utilisateur créé !' }))/*201 création de ressources*/
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));/*500 erreur serveur*/
};
//----------------------------------------------------------------------------------------------------------------------
//LOGIN
exports.login = (req, res, next) => {
if (req.body.email == null || req.body.password == null) {
    return res
      .status(400)
      .json({ error: "Merci de remplir tous les champs !" });
  }
  models.User.findOne({ email: req.body.email })
  .then(user => {/*on vérifie si on a récupéré un user ou non*/
    if (!user) {/*Si on ne trouve pas d'utilisateur erreur 401*/
      return res.status(401).json({ error: 'Utilisateur non trouvé !' });
    }
    bcrypt.compare(req.body.password, user.password)/*si oui, comparer le mot de passe entré par l'utilisateur avec le hash enregistré dans la base de données*/
      .then(valid => {
        if (!valid) {
          return res.status(401).json({ error: 'Mot de passe incorrect !' });/*si le mdp ne correspond pas*/
        }
        res.status(200).json({/*si le mdp est true on renvoi un obj json*/
          userId: user.id,   /* avec l'id*/
          name: user.name,
          firstname: user.firstname,
          token: jwt.sign(    /*et avec un token /// 3 arguments demandés: */
            { userId: user.id },/*correspondance de l'id utilisateur*/
            process.env.TOKEN_LOGIN,/*le token*/
            { expiresIn: '24h' }/*expiration du token de 24h*/
          )
        });
      })
      .catch(error => res.status(500).json({ error }));/*erreur serveur*/
  })
  .catch(error => res.status(500).json({ error }));/*erreur serveur*/
};
//----------------------------------------------------------------------------------------------------------------------
//DELETE
exports.deleteProfile = (req, res, next) => {
    models.User.findOne({ _id: req.params.id })
        .then((user) => {
          if (user.id === userId) {
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
//PROFILE
exports.profile = (req, res, next) => {

}
//----------------------------------------------------------------------------------------------------------------------
//MODIFY
exports.modify = (req, res, next) => {

}