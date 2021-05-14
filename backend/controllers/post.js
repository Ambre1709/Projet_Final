const { Post, User } = require("../models");
//----------------------------------------------------------------------------------------------------------------------
// CREATEPOST
exports.createPost = (req, res, next) => {
  if (!req.body.title === "" || !req.body.content === "") {
    return res.status(400).json({ error: "Merci de remplir tous les champs." });
  }
  Post.create({
    idUser: res.locals.userId,
    title: req.body.title, //titre du post
    content: req.body.content, //contenu du post
    /*le front end ne connaissant pas l'url de l'image il faut le définir manuellement*/
    image:
      req.body.content && req.file
        ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        : null,
  })
    .then(() => res.status(201).json({ message: "Message enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};
//----------------------------------------------------------------------------------------------------------------------
//GETALLPOSTS
exports.getAllPosts = (req, res, next) => {
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
    include: [{ model: User, attributes: ["firstname", "lastname"] }],
  })
    .then((posts) => {
      res.status(200).json(posts);
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
      "idUser",
      "title",
      "content",
      "image",
      "createdAt",
      "updatedAt",
    ],
    where: { id: req.params.id },
  })
    .then((post) => {
      res.status(200).json(post);
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
  Post.findOne({
    where: { id: req.params.id },
  })
    .then((post) => {
      if (!post.idUsers === userId || !isAdmin === true) {
        if (post.image !== null) {
          const filename =
            post.image.split(
              "/images/"
            )[1]; /*récuperer le nom du fichier à supprimer*/
          fs.unlink(`images/${filename}`, () => {
            /*on le supprime avec unlink*/
            post
              .destroy()
              .then(() =>
                res.status(200).json({ message: "Message supprimé !" })
              )
              .catch((error) => res.status(400).json({ error }));
          });
        } else {
          post
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
