const express = require('express');
const formidable = require('express-formidable');

const { Category } = require('./../models/categories');
const { Ingredient } = require('./../models/ingredients');
const { Recipe } = require('./../models/recipes');
const { User } = require('./../models/users');

const { ObjectID } = require('mongodb');

const router = express.Router();

router.use(formidable());

router.get('/', (req, res) => {
  res.send('API is working');
});

router.get('/recipes', (req, res) => {
  Recipe.find().then((recipes) => {
    res.send({ recipes });
  }).catch((err) => {
    res.status(400).send();
  });
});

router.get('/recipe/:id', (req, res) => {
  const id = req.params.id;

  Recipe.findOne({ _id: id }).then((recipe) => {
    if (!recipe) {
      res.status(404).send();
    }
    res.send({ recipe });
  }).catch((err) => {
    res.status(400).send();
  });
});

router.get('/recipe', (req, res) => {
  if (req.query.ingredients === undefined) {
    res.status(400).send();
  }

  const ingredients = req.query.ingredients.split(",").map(ingredient => ingredient.trim());

  Recipe.findByIngredients(ingredients)
    .then((recipes) => {
      if (recipes.length == 0) {
        res.status(404).send();
      }
      res.send({ recipes });
    })
    .catch((err) => {
      res.status(400).send();
    });
});

router.post('/recipe', (req, res) => {
  const fields = req.fields;
  const files = req.files;
  const recipe = new Recipe({
    name: fields.name,
    image: {
      _id: fields.image._id,
      versionId: fields.image.version_id,
      imageType: fields.image.type
    },
    ingredients: fields.ingredients || [],
    cookingTime: fields.cookingTime || 0,
    numOfMeals: fields.numOfMeals || 1,
    instructions: fields.instructions || [],
  });

  recipe.save().then((doc) => {
    res.send({ recipe: doc });
  }).catch((err) => {
    res.status(400).send();
  });

});

router.get('/ingredients', (req, res) => {
  Ingredient.find().then((ingredients) => {
    res.send({ ingredients });
  }).catch((err) => {
    res.status(400).send();
  });
});

router.get('/ingredient/:id', (req, res) => {
  const id = req.params.id;

  Ingredient.findOne({ _id: id }).then((ingredient) => {
    if (!ingredient) {
      res.status(404).send();
    }
    res.send({ ingredient });
  }).catch((err) => {
    res.status(400).send();
  });
});

router.post('/ingredient', (req, res) => {
  const fields = req.fields;
  const categoryID = fields.categoryID;

  if (!ObjectID.isValid(categoryID)) {
    res.status(400).send();
  }

  Category.findOne({ _id: categoryID }).then((category) => {
    if (!category) {
      res.status(404).send();
    }
    const ingredient = new Ingredient({
      name: fields.name,
      categoryID: category._id,
      categoryName: category.name
    });
    return ingredient.save();
  }).then((doc) => {
    res.send({ ingredient: doc });
  }).catch((err) => {
    res.status(400).send();
  });

});

router.get('/categories', (req, res) => {
  Category.find().then((categories) => {
    res.send({ categories });
  }).catch((err) => {
    res.status(400).send();
  });
});

router.get('/category/:id', (req, res) => {
  const id = req.params.id;

  Category.findOne({ _id: id }).then((category) => {
    if (!category) {
      res.status(404).send();
    }
    res.send({ category });
  }).catch((err) => {
    res.status(400).send();
  });
});

router.get('/category/:id/ingredients', (req, res) => {
  const id = req.params.id;

  Category.findOne({ _id: id }).then((category) => {
    if (!category) {
      res.status(404).send();
    }
    return Ingredient.find({ categoryID: category._id.toHexString() });
  }).then((ingredients) => {
    if (ingredients.length == 0) {
      res.status(404).send();
    }
    res.send({ ingredients });
  }).catch((err) => {
    res.status(400).send();
  });
});

router.post('/category', (req, res) => {
  const fields = req.fields;
  const category = new Category({
    name: fields.name
  });

  category.save().then((doc) => {
    res.send({ category: doc });
  }).catch((err) => {
    res.status(400).send();
  });
});

module.exports = router;