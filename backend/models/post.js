const { Model } = require('sequelize');
module.exports = (sequelize, dataTypes) => {
    class Post extends Model {}
    Post.init(
        {
            title: {
                type: dataTypes.STRING,
                allowNull: false,
            },
                content:{
                    type: dataTypes.TEXT,
                },
                url: {
                    type: dataTypes.STRING,
                },
        },
        {
            sequelize,
            modelName: 'Post',
        }
    );
    return Post;
};