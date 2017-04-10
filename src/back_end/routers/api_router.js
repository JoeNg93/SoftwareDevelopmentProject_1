const express = require('express');
const formidable = require('express-formidable');
const cloudinary = require('cloudinary');
const path = require('path');

const { Category } = require('./../models/categories');
const { Ingredient } = require('./../models/ingredients');
const { Recipe } = require('./../models/recipes');
const { User } = require('./../models/users');

const { ObjectID } = require('mongodb');

const router = express.Router();


router.use(formidable({
  uploadDir: path.resolve(__dirname, '..', 'images'),
  keepExtensions: true
}));

cloudinary.config({
  cloud_name: 'dicyn7jds',
  api_key: '785114968596375',
  api_secret: 'e9LjJaNFsCVKQwetKpU09wtzR9g'
});

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

router.post('/recipe/:id/increaseLike', (req, res) => {
  Recipe.findByIdAndUpdate(req.params.id, { $inc: { numOfLikes: 1 } }, { new: true })
    .then((recipe) => {
      if (!recipe) {
        res.status(404).send();
      }
      res.send({ recipe });
    })
    .catch(err => res.status(400).send(err));
});

router.post('/recipe/:id/decreaseLike', (req, res) => {
  Recipe.findByIdAndUpdate(req.params.id, { $inc: { numOfLikes: -1 } }, { new: true })
    .then((recipe) => {
      if (!recipe) {
        res.status(404).send();
      }
      res.send({ recipe });
    })
    .catch(err => res.status(400).send());
});

router.post('/recipe/:id/increaseDislike', (req, res) => {
  Recipe.findByIdAndUpdate(req.params.id, { $inc: { numOfDislikes: 1 } }, { new: true })
    .then((recipe) => {
      if (!recipe) {
        res.status(404).send();
      }
      res.send({ recipe });
    })
    .catch(err => res.status(400).send());
});

router.post('/recipe/:id/decreaseDislike', (req, res) => {
  Recipe.findByIdAndUpdate(req.params.id, { $inc: { numOfDislikes: -1 } }, { new: true })
    .then((recipe) => {
      if (!recipe) {
        res.status(404).send();
      }
      res.send({ recipe });
    })
    .catch(err => res.status(400).send());
});

router.get('/recipe', (req, res) => {
  if (req.query.ingredients === undefined) {
    res.status(400).send();
  }

  const sortKey = req.query.sort || '';

  const sortOrder = req.query.sort === 'numOfIngredientsMissing' ? 1 : -1;

  const ingredients = req.query.ingredients.split(",").map(ingredient => ingredient.trim());

  Recipe.findByIngredients(ingredients, sortKey, sortOrder)
    .then((recipes) => {
      if (recipes.length == 0) {
        res.status(404).send();
      }
      let promiseQueues = recipes.map((recipe) => {
        return new Promise((resolve, reject) => {
          const totalIngredients = recipe.ingredients.length;
          const numOfIngredientsHave = recipe.ingredients.filter(ingredient => ingredients.indexOf(ingredient.name) != -1).length;
          const numOfIngredientsMissing = totalIngredients - numOfIngredientsHave;
          resolve(Object.assign({}, recipe._doc, { totalIngredients, numOfIngredientsHave, numOfIngredientsMissing }));
        });
      });
      return Promise.all(promiseQueues);
    })
    .then((recipes) => res.send({ recipes }))
    .catch(err => res.status(400).send(err));
});

router.post('/images/upload', (req, res) => {
  const localImagePath = files.image.path;
  uploadImageToCDN(localImagePath)
    .then(imageCDNInfo => res.send(imageCDNInfo))
    .catch(err => res.status(400).send());
});

router.post('/recipe', (req, res) => {
  const { fields, files } = req;

  let recipe = null;

  const localImagePath = files.image.path;
  uploadImageToCDN(localImagePath)
    .then((imageCDNInfo) => {
      recipe = JSON.parse(fields.recipe);
      recipe.image = imageCDNInfo;
      const ingredients = recipe.ingredients;
      return addIngredientName(ingredients);
    })
    .then((ingredientsWithName) => {
      Object.assign(recipe, { ingredients: ingredientsWithName });
      recipe = new Recipe(recipe);
      return recipe.save();
    })
    .then(doc => {
      res.send({ recipe: doc })
    })
    .catch(err => res.status(400).send());
  
  // let recipe = {
  //   name: fields.name,
  //   cookingTime: fields.cookingTime || 0,
  //   image: fields.image,
  //   numOfMeals: fields.numOfMeals || 1,
  //   instructions: fields.instructions || [],
  //   description: fields.description
  // };
  //
  // const ingredients = fields.ingredients;
  // addIngredientName(ingredients)
  //   .then((ingredientsWithName) => {
  //     Object.assign(recipe, { ingredients: ingredientsWithName });
  //     recipe = new Recipe(recipe);
  //     return recipe.save();
  //   })
  //   .then(doc => res.send({ recipe: doc }))
  //   .catch(err => res.status(400).send());

});

function uploadImageToCDN(localImagePath) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(localImagePath, function handleResponse(response) {
      let { public_id, version, format } = response;

      const image = {
        _id: public_id,
        versionId: `v${version}`,
        imageType: format
      };

      resolve(image);
    });
  });
}

function addIngredientName(ingredients) {
  const promiseQueues = [];
  ingredients.forEach((ingredient) => {
    promiseQueues.push(Ingredient.findOne({ _id: ingredient._id }).then((doc) => {
      if (!doc) return Promise.reject('id not found');
      return Object.assign({}, ingredient, { _id: doc._id, name: doc.name });
    }));
  });

  return Promise.all(promiseQueues);
}

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

module.exports = {
  router,
  addIngredientName
};