const { Model } = require('sequelize');
module.exports = (sequelize, dataTypes) => {
    class User extends Model {}
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