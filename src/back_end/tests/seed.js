const { ObjectID } = require('mongodb');

const { Category } = require('./../models/categories');
const { Ingredient } = require('./../models/ingredients');
const { Recipe } = require('./../models/recipes');
const { User } = require('./../models/users');

const categories = [
  {
    _id: new ObjectID(),
    name: 'Meats'
  },
  {
    _id: new ObjectID(),
    name: 'Vegetables'
  },
  {
    _id: new ObjectID(),
    name: 'Dairy'
  },
  {
    _id: new ObjectID(),
    name: 'Spices'
  },
  {
    _id: new ObjectID(),
    name: 'Oils'
  }
];

const recipes = [];

const users = [];

const ingredients = [
  {
    _id: new ObjectID(),
    name: 'bacon',
    category: categories[0]._id
  },
  {
    _id: new ObjectID(),
    name: 'ground beef',
    category: categories[0]._id
  },
  {
    _id: new ObjectID(),
    name: 'onion',
    category: categories[1]._id
  },
  {
    _id: new ObjectID(),
    name: 'chili pepper',
    category: categories[1]._id
  },
  {
    _id: new ObjectID(),
    name: 'eggs',
    category: categories[2]._id
  },
  {
    _id: new ObjectID(),
    name: 'cream',
    category: categories[2]._id
  },
  {
    _id: new ObjectID(),
    name: 'chive',
    category: categories[3]._id
  },
  {
    _id: new ObjectID(),
    name: 'garlic powder',
    category: categories[3]._id
  },
  {
    _id: new ObjectID(),
    name: 'olive oil',
    category: categories[4]._id
  },
  {
    _id: new ObjectID(),
    name: 'peanut oil',
    category: categories[4]._id
  }
];

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
