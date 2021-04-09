const { Comment } = require('../models');

//CREATECOMMENT
exports.createComment = (req, res, next) => {
    if (!req.body.comment === "") {
      return res
        .status(400)
        .json({ error: "Merci de remplir le champ." });
    }
    Comment.create({
        idUsers: userId,
        idMessages: req.params.id,
        comment: req.body.comment,
    })
    .then(() => res.status(200).json({ message: "Commentaire envoyé !" }))
    .catch((error) => res.status(500).json(error));
};

exports.getAllComment = (req, res, next) => {
 
  };