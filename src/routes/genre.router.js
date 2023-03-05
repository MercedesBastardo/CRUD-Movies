const { getAll, create, getOne, remove, update } = require('../controllers/genre.controllers');
const express = require('express');

const genreRoutes = express.Router();

genreRoutes.route('/')
    .get(getAll)
    .post(create);

genreRoutes.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = genreRoutes;