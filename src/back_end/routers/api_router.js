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

const { MAILGUN_API_KEY } = require('./../config/keyConfig');
const mailgun = new Mailgun({ apiKey: MAILGUN_API_KEY, domain: 'mail.joehub.fi' });

const { encrypt } = require('./../utils/auth');

const router = express.Router();

cloudinary.config({
  cloud_name: 'dicyn7jds',
  api_key: '785114968596375',
  api_secret: 'e9LjJaNFsCVKQwetKpU09wtzR9g'
});

router.get('/', (req, res) => {
  res.send('API is working');
});

// --------------------------------------------------
// RECIPE ROUTES

router.get('/recipes', (req, res) => {
  Recipe.find().then((recipes) => {
    res.send({ recipes });
  }).catch((err) => {
    res.status(400).send();
  });
});

router.get('/recipe', (req, res) => {
  if (req.query.ingredients === undefined) {
    return res.status(400).send();
  }

  const sortKey = req.query.sort || '';

  const sortOrder = sortKey === 'numOfIngredientsMissing' ? 1 : -1;

  const ingredients = req.query.ingredients.split(",").map(ingredient => ingredient.trim());

  Recipe.findByIngredients(ingredients)
    .then((recipes) => {
      if (recipes.length == 0) {
        return res.status(404).send();
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
      res.send({ recipes: sortOrder == 1 ? responseRecipes : responseRecipes.reverse() });
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
  return _.pick(['_id', 'email', 'favoriteRecipes', 'ingredients'])(user);
}

router.get('/users', (req, res) => {
  User.find({})
    .then((users) => {
      const usersReturn = users.map(user => getUserPropertyForResponse(user));
      res.send({ users: usersReturn });
    })
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
  const hostName = 'http://localhost:8765';
  const urlPath = `${hostName}/auth/validate?key=${key}`;
  ejs.renderFile(path.resolve(__dirname, '..', 'utils', 'email_form.ejs'), { url: urlPath }, (err, renderedHtmlString) => {
    const mail = new MailComposer({
      from: 'varIngredient <joe@mail.joehub.fi>',
      to: email,
      subject: 'Verify your email asap, motherfucker!',
      html: renderedHtmlString
    });

    mail.compile().build((err, message) => {
      const dataToSend = {
        to: email,
        message: message.toString()
      };

      mailgun.messages().sendMime(dataToSend, (err, body) => {
        if (err) {
          return res.status(400).send(err);
        }
        res.send({ status: body });
      });
    });
  });
});

module.exports = {
  api_router: router,
  addIngredientName,
  getUserPropertyForResponse
};

