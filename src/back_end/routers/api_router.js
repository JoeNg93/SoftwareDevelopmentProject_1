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
  Recipe.find().then((recipes) => {
    res.send(recipes);
  }).catch((err) => {
    res.status(400).send();
  });
});

router.get('/recipe/:id', (req, res) => {
  const id = req.params.id;

  Recipe.findOne({_id: id}).then((recipe) => {
    if (!recipe) {
      res.status(404).send();
    }
    res.send(recipe);
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

router.get('/ingredient/:id', (req, res) => {
  const id = req.params.id;

  Ingredient.findOne({_id: id}).then((ingredient) => {
    if (!ingredient) {
      res.status(404).send():
    }
    res.send(ingredient);
  }).catch((err) => {
    res.status(400).send();
  });
});

router.get('/categories', (req, res) => {
  Category.find().then((categories) => {
    res.send(categories);
  }).catch((err) => {
    res.status(400).send();
  });
});

router.get('/category/:id', (req, res) => {
  const id = req.params.id;

  Category.findOne({_id: id}).then((category) => {
    if (!category) {
      res.status(404).send();
    }
    res.send(category);
  }).catch((err) => {
    res.status(400).send();
  });
});

module.exports = router;