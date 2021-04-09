const fs = require("fs"); // Permet de gérer les fichiers stockés
const { Post} = require('../models');

// CREATEPOST
exports.createPost = (req, res, next) => {
    if (!req.body.title === "" || !req.body.content === "") {
        return res.status(400).json({ error: "Merci de remplir tous les champs." });
      }
    Post.create({
      title: req.body.title,//titre du post
      content: req.body.content,//contenu du post
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`/*le front end ne connaissant pas l'url de l'image il faut le définir manuellement*/
    });
      then(() => res.status(201).json({ message: 'Message enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  };

//GETALLPOSTS
exports.getAllPosts = (req, res, next) => {

}

//GETONEPOST
exports.getOnePost = (req, res, next) => {
  Post.findOne({
    attributes: ["id", "idUsers", "title", "content", "image", "createdAt", "updatedAt",],
    where: { id: req.params.id },
  })
    .then((message) => {
      res.status(200).json(message);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
}

// DELETEPOST
exports.deletePost = (req, res, next) => {

}

