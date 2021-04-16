const { Post } = require("../models");
//----------------------------------------------------------------------------------------------------------------------
// CREATEPOST
exports.createPost = (req, res, next) => {
  if (!req.body.title === "" || !req.body.content === "") {
    return res.status(400).json({ error: "Merci de remplir tous les champs." });
  }
  Post.create({
    idUsers: userId,
    title: req.body.title, //titre du post
    content: req.body.content, //contenu du post
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }` /*le front end ne connaissant pas l'url de l'image il faut le définir manuellement*/,
  })
    .then(() => res.status(201).json({ message: "Message enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};
//----------------------------------------------------------------------------------------------------------------------
//GETALLPOSTS
exports.getAllPosts = (req, res, next) => {
  Message.findAll({
    order: [["updatedAt", "DESC"]],
    attributes: [
      "id",
      "idUsers",
      "title",
      "content",
      "image",
      "createdAt",
      "updatedAt",
    ],
    include: [{ model: models.User, attributes: ["firstName", "lastname"] }],
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
//----------------------------------------------------------------------------------------------------------------------
//GETONEPOST
exports.getOnePost = (req, res, next) => {
  Post.findOne({
    attributes: [
      "id",
      "idUsers",
      "title",
      "content",
      "image",
      "createdAt",
      "updatedAt",
    ],
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
};
//----------------------------------------------------------------------------------------------------------------------
// DELETEPOST
exports.deletePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
    .then((message) => {
      if (!message.idUsers === userId || !isAdmin === true) {
        if (message.image !== null) {
          const filename = message.image.split(
            "/images/"
          )[1]; /*récuperer le nom du fichier à supprimer*/
          fs.unlink(`images/${filename}`, () => {
            /*on le supprime avec unlink*/
            message
              .destroy()
              .then(() =>
                res.status(200).json({ message: "Message supprimé !" })
              )
              .catch((error) => res.status(400).json({ error }));
          });
        } else {
          message
            .destroy()
            .then(() => {
              res.status(200).json({
                message: "Message supprimé !",
              });
            })
            .catch((error) => {
              res.status(400).json({
                error: error,
                message: "Le message n'a pas pu être supprimé",
              });
            });
        }
      }
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
