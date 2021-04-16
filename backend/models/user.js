const { Model } = require("sequelize");
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
      email: { type: dataTypes.STRING, unique: true },
      firstname: dataTypes.STRING,
      lastname: dataTypes.STRING,
      password: dataTypes.STRING,
      isAdmin: dataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
