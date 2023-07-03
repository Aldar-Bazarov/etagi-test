const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Apartment = sequelize.define('apartment', {
    id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    floor: { type: DataTypes.INTEGER, allowNull: false },
    pos_on_floor: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    rooms: { type: DataTypes.INTEGER, allowNull: false },
    area_total: { type: DataTypes.FLOAT, allowNull: false },
    area_kitchen: { type: DataTypes.FLOAT, allowNull: false },
    area_live: { type: DataTypes.FLOAT, allowNull: false },
    layout_image: { type: DataTypes.STRING, allowNull: false },
});

module.exports = {
    Apartment
}