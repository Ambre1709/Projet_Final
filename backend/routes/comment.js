const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment");
const auth = require("../middleware/auth");

router.get("/:id/comments", auth, commentCtrl.getAllComment);
router.post("/:id/comment/", auth, commentCtrl.createComment);
router.delete("/:idPosts/comment/:id", auth, commentCtrl.deleteComment);

module.exports = router;