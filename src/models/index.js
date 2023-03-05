const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");


// Trae todos los generos de una pelicula
Movie.belongsToMany(Genre, {through: 'movieGenres'});
Genre.belongsToMany(Movie, {through: 'movieGenres'});

//Trae todos los actores de una pelicula

Movie.belongsToMany(Actor, {through: 'movieActors'});
Actor.belongsToMany(Movie, {through: 'movieActors'});

//Trae todos los directores de una pelicula

Movie.belongsToMany(Director, {through: 'movieDirectors'});
Director.belongsToMany(Movie, {through: 'movieDirectors'});