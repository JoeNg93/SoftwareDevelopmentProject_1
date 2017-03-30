const express = require('express');
const bodyParser = require('body-parser');

const { Category } = require('./../models/categories');
const { Ingredient } = require('./../models/ingredients');
const { Recipe } = require('./../models/recipes');
const { User } = require('./../models/users');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('API is working');
});

router.get('/recipes', (req, res) => {
  Recipes.find().then((recipes) => {
    res.send(recipes);
  }).catch((err) => {
    res.status(400).send();
  });
});

router.get('/ingredients', (req, res) => {
  Ingredient.find().then((ingredients) => {
    res.send(ingredients);
  }).catch((err) => {
    res.status(400).send();
  });
});

module.exports = router;