const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('TouristActivity', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        difficulty: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
                max: 5
            }
        },
        duration: {
            type: DataTypes.INTEGER,

        },
        season: {
            type: DataTypes.ENUM("Summer", "Winter", "Spring", "Autumn")
            //buscar lo de permitir solo valores especificos
        }
    })}