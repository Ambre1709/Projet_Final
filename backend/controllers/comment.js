const { Comment, User } = require("../models");
//----------------------------------------------------------------------------------------------------------------------
//CREATECOMMENT
exports.createComment = (req, res, next) => {
  if (!req.body.comment) {
    return res.status(400).json({ error: "Merci de remplir le champ." });
  }
  console.log(req.params);
  Comment.create({
    idUser: res.locals.userId,
    idPost: req.params.postId,
    comment: req.body.comment,
  })
    .then(() => res.status(200).json({ message: "Commentaire envoyé !" }))
    .catch((error) => res.status(500).json(error));
};
//----------------------------------------------------------------------------------------------------------------------
exports.getAllComment = (req, res, next) => {
  Comment.findAll({
    where: { idPost: req.params.postId },
    order: [["updatedAt", "DESC"]],
    include: [{ model: User, attributes: ["firstName", "lastName", "id"] }],
  })
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
//----------------------------------------------------------------------------------------------------------------------
exports.deleteComment = (req, res, next) => {
  Comment.findOne({
    where: { idPosts: req.params.idPosts, id: req.params.id },
  }).then((comment) => {
    if (!comment.idUsers === userId || !isAdmin === true) {
      comment
        .destroy()
        .then(() => {
          res.status(200).json({
            message: "Commentaire supprimé !",
          });
        })
        .catch((error) => {
          res.status(400).json({
            error: error,
            message: "Le commentaire n'a pas pu être supprimé",
          });
        });
    }
  });
};
