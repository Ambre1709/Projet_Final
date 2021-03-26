// MODULES
//const mysql = require('../dbConnect').connection;
const env = require("../environment"); // Récupère les variables d'environnement
const bcrypt = require('bcrypt'); 
const jwt = require("jsonwebtoken");
const fs = require("fs"); // Permet de gérer les fichiers stockés


//SIGNUP
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const email = req.body.email;
            const firstName = req.body.firstName;
            const lastName = req.body.lastName;
            const password = hash;

// ???????????????????????????????
        })
        .catch(e => res.status(500).json(e));
}

//LOGIN
exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
//?????????????????????????
}

//DELETE
exports.delete = (req, res, next) => {

}

//PROFILE
exports.profile = (req, res, next) => {

}

//MODIFY
exports.modify = (req, res, next) => {

}