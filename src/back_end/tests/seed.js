const { ObjectID } = require('mongodb');

const { Category } = require('./../models/categories');
const { Ingredient } = require('./../models/ingredients');
const { Recipe } = require('./../models/recipes');
const { User } = require('./../models/users');

const categories = [
  {
    _id: new ObjectID(),
    name: 'meats'
  },
  {
    _id: new ObjectID(),
    name: 'vegetables'
  },
  {
    _id: new ObjectID(),
    name: 'dairy'
  },
  {
    _id: new ObjectID(),
    name: 'spices'
  },
  {
    _id: new ObjectID(),
    name: 'oils'
  },
  {
    _id: new ObjectID(),
    name: 'fuck'
  }
];

const users = [];

const ingredients = [
  {
    _id: new ObjectID(),
    name: 'bacon',
    categoryID: categories[0]._id,
    categoryName: categories[0].name
  },
  {
    _id: new ObjectID(),
    name: 'ground beef',
    categoryID: categories[0]._id,
    categoryName: categories[0].name
  },
  {
    _id: new ObjectID(),
    name: 'onion',
    categoryID: categories[1]._id,
    categoryName: categories[1].name
  },
  {
    _id: new ObjectID(),
    name: 'chili pepper',
    categoryID: categories[1]._id,
    categoryName: categories[1].name
  },
  {
    _id: new ObjectID(),
    name: 'eggs',
    categoryID: categories[2]._id,
    categoryName: categories[2].name
  },
  {
    _id: new ObjectID(),
    name: 'cream',
    categoryID: categories[2]._id,
    categoryName: categories[2].name
  },
  {
    _id: new ObjectID(),
    name: 'chive',
    categoryID: categories[3]._id,
    categoryName: categories[3].name
  },
  {
    _id: new ObjectID(),
    name: 'garlic powder',
    categoryID: categories[3]._id,
    categoryName: categories[3].name
  },
  {
    _id: new ObjectID(),
    name: 'olive oil',
    categoryID: categories[4]._id,
    categoryName: categories[4].name
  },
  {
    _id: new ObjectID(),
    name: 'peanut oil',
    categoryID: categories[4]._id,
    categoryName: categories[4].name
  }
];

const recipes = [
  {
    _id: new ObjectID(),
    name: "Barefoot Contessa's Oven Roasted Bacon",
    description: 'Fake description 1',
    image: {
      _id: 'd2syxoq3xatkj516r3wb',
      versionId: 'v1491336195',
      imageType: 'jpg'
    },
    ingredients: [
      {
        _id: ingredients[0]._id,
        quantity: "500g",
        name: 'bacon'
      }
    ],
    cookingTime: 22,
    numOfMeals: 4,
    instructions: [
      'Preheat oven to 400 degrees Fahrenheit',
      'Place a sheet of parchment paper on a sheet pan',
      'Lay the bacon on top of the parchment paper',
      'Bake for 15 to 20 mins until the bacon is really crispy',
      'Drain on paper towels and server'
    ],
    numOfLikes: 2000,
    numOfDislikes: 50
  },
  {
    _id: new ObjectID(),
    name: "Captain Blue's Grill-Roasted Onions",
    description: 'Fake description 2',
    image: {
      _id: 'yktrqrqsmlrf2ct5eca2',
      versionId: 'v1491336210',
      imageType: 'jpg'
    },
    ingredients: [
      {
        _id: ingredients[2]._id,
        quantity: "100",
        name: 'onion'
      }
    ],
    cookingTime: 35,
    numOfMeals: 2,
    instructions: [
      'Place the onions on BBQ grill',
      'Roast 30 minutes- gas grill, middle shelf; charcoal, indirect heat.',
      'Remove from grill onto disposable surface (there will be lots of carbon), cut the bottom off the onion and the soft, steamed interior should come out easily, leaving behind the charred skin layers.',
      'Remove to clean plate.',
      'Slice/ chop the onions and toss with seasonings.',
      '(We serve them over buttered baked potatoes and top with grated cheddar cheese, fresh ground pepper and Tabasco. We stick a clean, food-use-only non-anodized aluminum nail or tent stake through the stem / tail ends of the onion before it goes on the grill. We find that it helps with even heat distribution - it works great for potatoes too.)'
    ],
    numOfLikes: 932,
    numOfDislikes: 30
  },
  {
    _id: new ObjectID(),
    name: 'Boiled Eggs',
    description: 'Fake description 3',
    image: {
      _id: 'c23rhh7jdphrv9srea8a',
      versionId: 'v1491336203',
      imageType: 'jpg'
    },
    ingredients: [
      {
        _id: ingredients[4]._id,
        quantity: "6 eggs",
        name: 'eggs'
      }
    ],
    cookingTime: 15,
    numOfMeals: 3,
    instructions: [
      'Place the eggs in a medium saucepan and cover with room temperature water',
      'Bring the eggs to a boil, remove from the heat and let sit for 8 minutes',
      'Shock the eggs in cold water to stop the cooking and shrink the egg from the shell'
    ],
    numOfLikes: 527,
    numOfDislikes: 10
  },
  {
    _id: new ObjectID(),
    name: 'Chive Oil',
    description: 'Fake description 4',
    image: {
      _id: 'swe1h5phbi1g2bljbthc',
      versionId: 'v1491336217',
      imageType: 'png'
    },
    ingredients: [
      {
        _id: ingredients[6]._id,
        quantity: "100",
        name: 'chive'
      },
      {
        _id: ingredients[8]._id,
        quantity: "2",
        name: 'olive oil'
      }
    ],
    cookingTime: 10,
    numOfMeals: 2,
    instructions: [
      'Set a coffee filter in a sieve set over a heatproof measuring cup or bowl',
      'Purée chives and oil in a blender until well blended. Transfer to a small saucepan and cook over medium-high heat, stirring occasionally, until mixture is sizzling, about 3 minutes',
      'Remove chive oil from heat and strain though prepared sieve (do not press on solids or oil will be cloudy); let cool'
    ],
    numOfLikes: 5612,
    numOfDislikes: 125
  },
  {
    _id: new ObjectID(),
    name: 'Things that have both eggs and onion',
    description: 'Fake description 5',
    image: {
      _id: 'vqkcn3r180xzc5aikh9e',
      versionId: 'v1491336232',
      imageType: 'jpg'
    },
    ingredients: [
      {
        _id: ingredients[4]._id,
        quantity: "3 eggs",
        name: 'eggs'
      },
      {
        _id: ingredients[2]._id,
        quantity: "100",
        name: 'onion'
      },
      {
        _id: ingredients[0]._id,
        quantity: "200g",
        name: 'bacon'
      }
    ],
    cookingTime: 10,
    numOfMeals: 2,
    instructions: [
      'Ask your girlfriend'
    ],
    numOfLikes: 1523,
    numOfDislikes: 30
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
