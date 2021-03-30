const { Sequelize, Model, DataTypes } = require('sequelize');

module.exports = new Sequelize(
    process.env.DB_NAME, //назнание БД
    process.env.DB_USER, // имя пользователя
    process.env.DB_PASSWORD,
    {
        dialect: "postgres",
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
)


