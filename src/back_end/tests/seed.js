const { ObjectID } = require('mongoose');

const { Category } = require('./../models/categories');
const { Ingredient } = require('./../models/ingredients');
const { Recipe } = require('./../models/recipes');
const { User } = require('./../models/users');

const recipes = [];

const users = [];

const ingredients = [];

const categories = [];

const populateRecipes = (done) => {
  Recipe.remove({}).then(() => {
    return Recipe.insertMany(recipes);
  }).then(() => done());
};

const populateIngredients = (done) => {
  Ingredient.remove({}).then(() => {
    return Ingredient.insertMany(ingredients);
  }).then(() => done());
};

const populateCategories = (done) => {
  Category.remove({}).then(() => {
    return Category.insertMany(categories);
  }).then(() => done());
};

const populateUsers = (done) => {

};

module.exports = {
  recipes,
  ingredients,
  users,
  categories,
  populateCategories,
  populateIngredients,
  populateRecipes,
  populateUsers
};
