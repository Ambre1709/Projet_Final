const { Post, User } = require("../models");
//----------------------------------------------------------------------------------------------------------------------
// CREATEPOST
exports.createPost = (req, res, next) => {
  if (req.body.title === "" || req.body.content === "") {
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
exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.id } });
    if (!post) {
      res.status(404).json({
        message: "Post not found",
      });
      return;
    }

    if (post.idUser !== res.locals.userId && !res.locals.isAdmin) {
      res.status(403).json({
        message: "Not authorized",
      });
      return;
    }
    // if (message.image !== null) {
    //   const filename = message.image.split("/images/")[1];
    //   fs.unlink(`images/${filename}`,
    await post.destroy();
    res.status(200).json({
      message: "Post deleted",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
