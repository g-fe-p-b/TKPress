const Sequelize = require("sequelize");

const connection = new Sequelize('DataBase Name', 'user', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection;