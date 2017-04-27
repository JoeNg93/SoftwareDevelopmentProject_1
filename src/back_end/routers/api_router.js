const express = require('express');
const cloudinary = require('cloudinary');
const path = require('path');
const _ = require('lodash/fp');
const Mailgun = require('mailgun-js');
const MailComposer = require('nodemailer/lib/mail-composer');
const ejs = require('ejs');

const { Category } = require('./../models/categories');
const { Ingredient } = require('./../models/ingredients');
const { Recipe } = require('./../models/recipes');
const { User } = require('./../models/users');

const { ObjectID } = require('mongodb');

const { MAILGUN_API_KEY, HOST_URL } = require('./../config/keyConfig');
const mailgun = new Mailgun({ apiKey: MAILGUN_API_KEY, domain: 'mail.joehub.fi' });

const { encrypt } = require('./../utils/auth');

const router = express.Router();

cloudinary.config({
  cloud_name: 'dicyn7jds',
  api_key: '785114968596375',
  api_secret: 'e9LjJaNFsCVKQwetKpU09wtzR9g'
});

router.get('/', (req, res) => {
  res.send({
    "apiPath": {
      "Recipe": {
        "GET /recipes": "Get all the recipes in db",
        "GET /recipe?ingredients=..&sort=...&skip=...&limit=...": "Get recipes according to ingredients and sort those recipes depends on numOfLikes or numOfIngredientsMissing",
        "GET /recipe/:id": "Get recipe according to its id",
        "POST /recipe": "Submit a single recipe",
        "POST /recipe/:id/increaseLike": "Increase numOfLikes of a recipe specified by its id by 1",
        "POST /recipe/:id/decreaseLike": "Decrease numOfLikes of a recipe specified by its id by 1",
        "POST /recipe/:id/increaseDislike": "Increase numOfDislikes of a recipe spcified by its id by 1",
        "POST /recipe/:id/decreaseDislike": "Decrease numOfDislikes of a recipe specified by its id by 1"
      },
      "Ingredient": {
        "GET /ingredients": "Get all the ingredients in db",
        "GET /ingredient/:id": "Get an ingredient specified by its id",
        "POST /ingredient": 'Submit a single ingredient. Fields: name, categoryID'
      },
      "Category": {
        "GET /categories": "Get all the categories in db",
        "GET /category/:id": "Get a category specified by its id",
        "GET /category/:id/ingredients": "Get ingredients in a category specified by its id",
        "POST /category": "POST a single category. Fields: name"
      },
      "User": {
        "GET /users": "Get all users in db",
        "GET /user/:userId/favoriteRecipes": "Get favorite recipes of an user specified by its id",
        "GET /user/:userId/ingredients": "Get ingredients of an user specified by its id",
        "POST /user/:userId/favoriteRecipe": "Submit a single favorite recipe for an user with id. Fields: _id, name",
        "POST /user/:userId/ingredient": "Submit a single ingredient for an user with id. Fields: _id, name",
        "POST /user/v2": "Register user info. Fields: email, password",
        "DELETE /user/:userId/ingredient/:ingredientId": "Delete an ingredient",
        "DELETE /user/:userId/favoriteRecipe/:recipeId": "Delete a favorite recipe",
        "POST /user/:userId/likeRecipe": "Like a recipe -> increase num of likes of recipe by 1 and add the _id of the recipe to user's liked recipes array. Fields: _id (recipeId)",
        "POST /user/:userId/unlikeRecipe": "Unlike a recipe -> decrease num of likes of recipe by 1 and remove the _id of the recipe from user's liked recipes . Fields: _id (recipeId)",
        "POST /user/:userId/dislikeRecipe": "Dislike a recipe -> same as above, but for num of dislikes and user's disliked recipes. Fields: _id(recipeId)",
        "POST /user/:userId/undislikeRecipe": "Undislike a recipe -> same as above, but for num of dislikes and user's disliked recipes. Fields: _id(recipeId)"
      },
      "Auth (use /auth instead of /api)": {
        "POST /login": "Login. Fields: email, password",
        "GET /logout": "Logout"
      }
    }
  });
});

// --------------------------------------------------
// RECIPE ROUTES

router.get('/recipes', (req, res) => {
  const sortKey = req.query.sort || '';
  const limit = Number(req.query.limit) || 0;

  Recipe.find().limit(limit).then((recipes) => {
    res.send({ recipes: sortKey === 'numOfLikes' ? _.sortBy(sortKey)(recipes).reverse() : _.sortBy(sortKey)(recipes) });
  }).catch((err) => {
    res.status(400).send();
  });
});

router.get('/recipe', (req, res) => {
  if (req.query.ingredients === undefined) {
    return res.status(400).send();
  }

  const sortKey = req.query.sort || '';

  const skip = Number(req.query.skip) || 0;

  const limit = Number(req.query.limit) || 0;

  const ingredients = req.query.ingredients.split(",").map(ingredient => ingredient.trim());

  Recipe.findByIngredients(ingredients, skip, limit)
    .then((recipes) => {
      if (recipes.length == 0) {
        return res.send({ recipes: [] });
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
    .then((recipes) => {
      const responseRecipes = _.sortBy(sortKey)(recipes);
      res.send({ recipes: sortKey === 'numOfLikes' ? responseRecipes.reverse() : responseRecipes });
    })
    .catch(err => res.status(400).send());
});

router.get('/recipe/:id', (req, res) => {
  const id = req.params.id;

  Recipe.findOne({ _id: id }).then((recipe) => {
    if (!recipe) {
      return res.status(404).send();
    }
    res.send({ recipe });
  }).catch((err) => {
    res.status(400).send();
  });
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
      recipe = Object.assign({}, recipe, { ingredients: ingredientsWithName });
      recipe = new Recipe(recipe);
      return recipe.save();
    })
    .then(doc => res.send({ recipe: doc }))
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

router.post('/recipe/:id/increaseLike', (req, res) => {
  Recipe.findByIdAndUpdate(req.params.id, { $inc: { numOfLikes: 1 } }, { new: true })
    .then((recipe) => {
      if (!recipe) {
        return res.status(404).send();
      }
      res.send({ recipe });
    })
    .catch(err => res.status(400).send(err));
});

router.post('/recipe/:id/decreaseLike', (req, res) => {
  Recipe.findByIdAndUpdate(req.params.id, { $inc: { numOfLikes: -1 } }, { new: true })
    .then((recipe) => {
      if (!recipe) {
        return res.status(404).send();
      }
      res.send({ recipe });
    })
    .catch(err => res.status(400).send());
});

router.post('/recipe/:id/increaseDislike', (req, res) => {
  Recipe.findByIdAndUpdate(req.params.id, { $inc: { numOfDislikes: 1 } }, { new: true })
    .then((recipe) => {
      if (!recipe) {
        return res.status(404).send();
      }
      res.send({ recipe });
    })
    .catch(err => res.status(400).send());
});

router.post('/recipe/:id/decreaseDislike', (req, res) => {
  Recipe.findByIdAndUpdate(req.params.id, { $inc: { numOfDislikes: -1 } }, { new: true })
    .then((recipe) => {
      if (!recipe) {
        return res.status(404).send();
      }
      res.send({ recipe });
    })
    .catch(err => res.status(400).send());
});

// --------------------------------------------------
// INGREDIENT ROUTES

router.get('/ingredients', (req, res) => {
  Ingredient.find({}).then((ingredients) => {
    res.send({ ingredients });
  }).catch((err) => {
    res.status(400).send();
  });
});

router.get('/ingredient/:id', (req, res) => {
  const id = req.params.id;

  Ingredient.findOne({ _id: id }).then((ingredient) => {
    if (!ingredient) {
      return res.status(404).send();
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
    return res.status(400).send();
  }

  Category.findOne({ _id: categoryID }).then((category) => {
    if (!category) {
      return res.status(404).send();
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

// --------------------------------------------------
// CATEGORY ROUTES

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
      return res.status(404).send();
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
      return res.status(404).send();
    }
    return Ingredient.find({ categoryID: category._id.toHexString() });
  }).then((ingredients) => {
    if (ingredients.length == 0) {
      return res.status(404).send();
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

// --------------------------------------------------
// USER ROUTES

function getUserPropertyForResponse(user) {
  return _.pick(['_id', 'email', 'favoriteRecipes', 'ingredients', 'likedRecipes', 'dislikedRecipes', 'isAdmin', 'facebook_id'])(user);
}

router.get('/users', (req, res) => {
  User.find({})
    .then((users) => {
      const usersReturn = users.map(user => getUserPropertyForResponse(user));
      res.send({ users: usersReturn });
    })
    .catch(err => res.status(400).send());
});

router.get('/user', (req, res) => {
  const token = req.varIngredientSession.token || req.get('Authorization');

  if (!token) {
    return res.status(401).send();
  }

  User.findByToken(token)
    .then(user => res.send({ user: getUserPropertyForResponse(user) }))
    .catch(err => res.status(400).send());
});

router.get('/user/:id/favoriteRecipes', (req, res) => {
  const userId = req.params.id;

  if (!ObjectID.isValid(userId)) {
    return res.status(400).send();
  }

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send();
      }
      res.send({ favoriteRecipes: user.favoriteRecipes });
    })
    .catch(err => res.status(400).send());
});

router.get('/user/:id/ingredients', (req, res) => {
  const userId = req.params.id;

  if (!ObjectID.isValid(userId)) {
    return res.status(400).send();
  }

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send();
      }
      res.send({ ingredients: user.ingredients });
    })
    .catch(err => res.status(400).send());
});

router.post('/user/:id/favoriteRecipe', (req, res) => {
  const userId = req.params.id;

  if (!ObjectID.isValid(userId)) {
    return res.status(400).send();
  }

  const fields = req.fields;
  const recipe = {
    _id: fields._id,
    name: fields.name
  };

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send();
      }
      user.favoriteRecipes.push(recipe);
      return user.save();
    })
    .then(user => res.send({ user: getUserPropertyForResponse(user) }))
    .catch(err => res.status(400).send());

});

router.post('/user/:id/ingredient', (req, res) => {
  const userId = req.params.id;

  if (!ObjectID.isValid(userId)) {
    return res.status(400).send();
  }

  const fields = req.fields;
  const ingredient = {
    _id: fields._id,
    name: fields.name
  };

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send();
      }
      user.ingredients.push(ingredient);
      return user.save();
    })
    .then(user => res.send({ user: getUserPropertyForResponse(user) }))
    .catch(err => res.status(400).send());
});

router.delete('/user/:userId/ingredient/:ingredientId', (req, res) => {
  const userId = req.params.userId;
  const ingredientId = req.params.ingredientId;

  if (!ObjectID.isValid(userId)) {
    return res.status(400).send();
  }

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(401).send();
      }

      const ingredientIndex = user.ingredients.findIndex(ingredient => ingredient._id === ingredientId);
      user.ingredients.splice(ingredientIndex, 1);
      return user.save();
    })
    .then(user => res.send({ user: getUserPropertyForResponse(user) }))
    .catch(err => res.status(400).send());

});

router.delete('/user/:userId/favoriteRecipe/:recipeId', (req, res) => {
  const userId = req.params.userId;
  const recipeId = req.params.recipeId;

  if (!ObjectID.isValid(userId)) {
    return res.status(400).send();
  }

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(401).send();
      }

      const recipeIndex = user.favoriteRecipes.findIndex(recipe => recipe._id === recipeId);
      user.favoriteRecipes.splice(recipeIndex, 1);
      return user.save();
    })
    .then(user => res.send({ user: getUserPropertyForResponse(user) }))
    .catch(err => res.status(400).send());
});

router.post('/user/:id/likeRecipe', (req, res) => {
  const userId = req.params.id;
  const recipeId = req.fields._id;
  let user = null;
  let recipe = null;

  User.findById(userId)
    .then((foundUser) => {
      if (!foundUser) {
        return res.status(401).send();
      }
      user = foundUser;
      return Recipe.findById(recipeId);
    })
    .then((foundRecipe) => {
      if (!foundRecipe) {
        return res.status(404).send();
      }
      foundRecipe.numOfLikes += 1;
      return foundRecipe.save();
    })
    .then((foundRecipe) => {
      user.likedRecipes.push(recipeId);
      recipe = foundRecipe;
      return user.save();
    })
    .then(user => res.send({ user: getUserPropertyForResponse(user), recipe }))
    .catch(err => {
      res.status(400).send();
    });
});

router.post('/user/:id/unlikeRecipe', (req, res) => {
  const userId = req.params.id;
  const recipeId = req.fields._id;
  let user = null;
  let recipe = null;

  User.findById(userId)
    .then((foundUser) => {
      if (!foundUser) {
        return res.status(401).send();
      }
      user = foundUser;
      return Recipe.findById(recipeId);
    })
    .then((foundRecipe) => {
      if (!foundRecipe) {
        return res.status(404).send();
      }
      foundRecipe.numOfLikes -= 1;
      return foundRecipe.save();
    })
    .then((foundRecipe) => {
      const recipeIndex = user.likedRecipes.findIndex(recipeId => recipeId === foundRecipe._id);
      user.likedRecipes.splice(recipeIndex, 1);
      recipe = foundRecipe
      return user.save();
    })
    .then(user => res.send({ user: getUserPropertyForResponse(user), recipe }))
    .catch(err => {
      res.status(400).send();
    });

});

router.post('/user/:id/dislikeRecipe', (req, res) => {
  const userId = req.params.id;
  const recipeId = req.fields._id;
  let user = null;
  let recipe = null;

  User.findById(userId)
    .then((foundUser) => {
      if (!foundUser) {
        return res.status(401).send();
      }
      user = foundUser;
      return Recipe.findById(recipeId);
    })
    .then((foundRecipe) => {
      if (!foundRecipe) {
        return res.status(404).send();
      }
      foundRecipe.numOfDislikes += 1;
      return foundRecipe.save();
    })
    .then((foundRecipe) => {
      user.dislikedRecipes.push(recipeId);
      recipe = foundRecipe
      return user.save();
    })
    .then(user => res.send({ user: getUserPropertyForResponse(user), recipe }))
    .catch(err => {
      res.status(400).send();
    });
    
});

router.post('/user/:id/undislikeRecipe', (req, res) => {
  const userId = req.params.id;
  const recipeId = req.fields._id;
  let user = null;
  let recipe = null;

  User.findById(userId)
    .then((foundUser) => {
      if (!foundUser) {
        return res.status(401).send();
      }
      user = foundUser;
      return Recipe.findById(recipeId);
    })
    .then((foundRecipe) => {
      if (!foundRecipe) {
        return res.status(404).send();
      }
      foundRecipe.numOfDislikes -= 1;
      return foundRecipe.save();
    })
    .then((foundRecipe) => {
      const recipeIndex = user.likedRecipes.findIndex(recipeId => recipeId === foundRecipe._id);
      user.dislikedRecipes.splice(recipeIndex, 1);
      recipe = foundRecipe
      return user.save();
    })
    .then(user => res.send({ user: getUserPropertyForResponse(user), recipe }))
    .catch(err => {
      res.status(400).send();
    });

});


router.post('/user/v1', (req, res) => {
  const { email, password } = req.fields;
  const user = new User({
    email,
    password
  });

  user.save()
    .then(user => res.send({ user: getUserPropertyForResponse(user) }))
    .catch(err => res.status(400).send());
});

router.post('/user/v2', (req, res) => {
  const { email, password } = req.fields;
  const key = encrypt(`${email},${password}`);
  // const hostName = 'http://localhost:8765';
  // const hostName = 'https://var-ingredient.joehub.fi';
  const urlPath = `${HOST_URL}/auth/validate?key=${key}`;
  ejs.renderFile(path.resolve(__dirname, '..', 'utils', 'email_form.ejs'), { url: urlPath }, (err, renderedHtmlString) => {
    const mail = new MailComposer({
      from: 'varIngredient <joe@mail.joehub.fi>',
      to: email,
      subject: 'Verify your email at varIngredient',
      html: renderedHtmlString
    });

    mail.compile().build((err, message) => {
      const dataToSend = {
        to: email,
        message: message.toString()
      };

      mailgun.messages().sendMime(dataToSend, (err, body) => {
        if (err) {
          return res.status(400).send({ status: 'fail' });
        }
        res.send({ status: 'success' });
      });
    });
  });
});

router.post('/test', (req, res) => {
  const { fields, files } = req;
  console.log(JSON.parse(fields.recipe));
  console.log(files.image && files.image.path);
  res.send();
});

module.exports = {
  api_router: router,
  addIngredientName,
  getUserPropertyForResponse
};

