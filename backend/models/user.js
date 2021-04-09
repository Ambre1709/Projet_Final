const { Model } = require('sequelize');
module.exports = (sequelize, dataTypes) => {
    class User extends Model {
        static associate(models) {
            
            models.User.hasMany(models.Post, {
              foreignKey: "idUser",
              onDelete: "cascade",
              hooks: true,
            });
            models.User.hasMany(models.Comment, {
              foreignKey: "idUser",
              onDelete: "cascade",
              hooks: true,
            });
          }
    }
    User.init(
        {
            email: dataTypes.STRING,
            name: dataTypes.STRING,
            firstname: dataTypes.STRING,
            password: dataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'User',
        }
    );
    return User;
};