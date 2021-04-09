const { Model } = require('sequelize');
module.exports = (sequelize, dataTypes) => {
    class Comment extends Model {}
    Comment.init(
    {
      idUsers: dataTypes.INTEGER,
      idMessages: dataTypes.INTEGER,
      comment: dataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};