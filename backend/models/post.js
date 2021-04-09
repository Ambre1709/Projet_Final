const { Model } = require('sequelize');
module.exports = (sequelize, dataTypes) => {
    class Post extends Model {}
    Post.init(
        {
            idUsers: DataTypes.INTEGER,
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