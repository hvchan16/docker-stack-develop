const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('marz', process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
});

const Product = sequelize.define('Product', {
    ProductID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ProductName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ProductPhotoURL: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ProductStatus: {
        type: DataTypes.ENUM('Active', 'InActive'),
        allowNull: false,
    },
}, {
    tableName: 'Product',
    timestamps: false,
});

module.exports = { sequelize, Product };
