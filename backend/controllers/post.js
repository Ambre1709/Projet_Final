// MODULES
//const mysql = require('../dbConnect').connection;
const fs = require("fs"); // Permet de gérer les fichiers stockés

// CREATEPOST
exports.createPost = (req, res, next) => {
    if (req.body.title === "" || req.body.content === "") {
        return res.status(400).json({ error: "Merci de remplir tous les champs." });
      }
    models.Post.create({
      idUsers: userId,
      title: req.body.title,//titre du post
      content: req.body.content,//contenu du post
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`/*le front end ne connaissant pas l'url de l'image il faut le définir manuellement*/
    });
      .then(() => res.status(201).json({ message: 'Sauce enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  };

//GETALLPOSTS
exports.getAllPosts = (req, res, next) => {

}

//GETONEPOST
exports.getOnePost = (req, res, next) => {

}

// DELETEPOST
exports.deletePost = (req, res, next) => {

}

//CREATECOMMENT
exports.createComment = (req, res, next) => {

}

//REACTPOST
exports.reactPost = (req, res, next) => {

}
