const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Movie = sequelize.define('movie', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    synopsis: {
        type: DataTypes.TEXT,
        
    },
    releaseYear: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    // genresId
    // actorId
    // directorId

});


module.exports = Movie;