const { Model } = require('sequelize');
module.exports = (sequelize, dataTypes) => {
    class Post extends Model {
        static associate(models) {
            models.Post.belongsTo(models.User, {
              foreignKey: {
                name: "idUser",
                allowNull: false,
              },
            });
            models.Post.hasMany(models.Comment, {
              foreignKey: {
                name: "idPost",
                allowNull: false,
              },
            });
          }
    }
    
    Post.init(
        {
            idUsers: {
                type: dataTypes.INTEGER,
                allowNull: false,
            },
            title: {
                type: dataTypes.STRING,
                allowNull: false,
            },
            content: dataTypes.TEXT,
        },
        {
            sequelize,
            modelName: 'Post',
        }
    );
    return Post;
};