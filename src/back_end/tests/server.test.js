const { app } = require('./../server/server');

const path = require('path');

const { addIngredientName } = require('./../routers/api_router');

const { ObjectID } = require('mongodb');

const request = require('supertest');
const { expect } = require('chai');

const { recipes, ingredients, users, categories }  = require('./seed');

const { Category } = require('./../models/categories');
const { Ingredient } = require('./../models/ingredients');
const { Recipe } = require('./../models/recipes');
const { User } = require('./../models/users');

const { populateCategories, populateIngredients, populateRecipes, populateUsers } = require('./seed');

beforeEach(populateCategories);
beforeEach(populateIngredients);
beforeEach(populateRecipes);
beforeEach(populateUsers);

// --------------------------------------------------
// CATEGORY TEST

describe('GET /categories', () => {
  it('should get the list of categories', (done) => {
    request(app)
      .get('/api/categories')
      .expect(200)
      .expect((res) => {
        expect(res.body.categories.length).to.equal(categories.length);
      })
      .end(done);
  });
});

describe('GET /category/:id', () => {
  it('should return a single category with valid id', (done) => {
    request(app)
      .get(`/api/category/${categories[0]._id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.category._id).to.equal(categories[0]._id.toHexString());
      })
      .end(done);
  });

  it('should return 404 if id is not found', (done) => {
    request(app)
      .get(`/api/category/${new ObjectID()}`)
      .expect(404)
      .end(done);
  });

  it('should return 400 if id is invalid', (done) => {
    request(app)
      .get('/api/category/1249@%8259w')
      .expect(400)
      .end(done);
  });
});

describe('GET /category/:id/ingredients', () => {
  it('should return a list of ingredients with exist category id', (done) => {
    request(app)
      .get(`/api/category/${categories[4]._id}/ingredients`)
      .expect(200)
      .expect((res) => {
        expect(res.body.ingredients).to.have.length(ingredients.filter(ingredient => ingredient.categoryName == categories[4].name).length);
      })
      .end(done);
  });

  it('should return 404 if id is not found', (done) => {
    const fakeID = new ObjectID();

    request(app)
      .get(`/api/category/${fakeID}/ingredients`)
      .expect(404)
      .end(done);
  });

  it('should return 400 with invalid id', (done) => {
    request(app)
      .get('/api/category/h245@/ingredients')
      .expect(400)
      .end(done);
  });

  it('should return 404 if no ingredients in the category', (done) => {
    const categoryID = categories[5]._id;

    request(app)
      .get(`/api/category/${categoryID}/ingredients`)
      .expect(404)
      .end(done);
  });
});

describe('POST /category', () => {
  it('should return an inserted category', (done) => {
    const category = {
      name: 'test'
    };

    request(app)
      .post('/api/category')
      .send(category)
      .expect(200)
      .expect((res) => {
        expect(res.body.category.name).to.equal(category.name);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Category.findOne({ _id: res.body.category._id }).then((data) => {
          expect(data.name).to.equal(category.name);
          done();
        }).catch((err) => {
          done(err);
        });
      });
  });

  it('should not insert category without name', (done) => {
    const category = {};

    request(app)
      .post('/api/category')
      .send(category)
      .expect(400)
      .end(done);
  });
});

// --------------------------------------------------
// INGREDIENT TEST

describe('GET /ingredients', () => {
  it('should return a list of ingredients', (done) => {
    request(app)
      .get('/api/ingredients')
      .expect(200)
      .expect((res) => {
        expect(res.body.ingredients).to.have.length(ingredients.length);
      })
      .end(done);
  });
});

describe('GET /ingredient/:id', () => {
  it('should return a single ingredient with valid id', (done) => {
    request(app)
      .get(`/api/ingredient/${ingredients[0]._id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.ingredient._id).to.equal(ingredients[0]._id.toHexString());
        expect(res.body.ingredient.categoryID).to.equal(categories[0]._id.toHexString());
      })
      .end(done);
  });

  it('should return 404 with id is not found', (done) => {
    request(app)
      .get(`/api/ingredient/${new ObjectID()}`)
      .expect(404)
      .end(done);
  });

  it('should return 400 if id is invalid', (done) => {
    request(app)
      .get('/api/ingredient/2334124(@*%')
      .expect(400)
      .end(done);
  });
});

describe('POST /ingredient', () => {
  it('should return an inserted ingredient', (done) => {
    const ingredient = {
      name: 'yoloIngredient',
      categoryID: categories[0]._id.toHexString()
    };

    request(app)
      .post('/api/ingredient')
      .send(ingredient)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Ingredient.findOne({ _id: res.body.ingredient._id }).then((doc) => {
          expect(doc.name).to.equal(ingredient.name);
          expect(doc.categoryID).to.equal(ingredient.categoryID);
          done();
        }).catch((err) => {
          done(err);
        });
      });
  });

  it('should not insert ingredient without name', (done) => {
    const ingredient = {
      categoryID: categories[0]._id.toHexString()
    };

    request(app)
      .post('/api/ingredient')
      .send(ingredient)
      .expect(400)
      .end(done);
  });

  it('should not insert ingredient with invalid ObjectID', (done) => {
    const ingredient = {
      name: 'Wow',
      categoryID: '3515@%'
    };

    request(app)
      .post('/api/ingredient')
      .send(ingredient)
      .expect(400)
      .end(done);
  });
});

// --------------------------------------------------
// RECIPE TEST

describe('GET /recipes', () => {
  it('should return a list of recipes', (done) => {
    request(app)
      .get('/api/recipes')
      .expect(200)
      .expect((res) => {
        expect(res.body.recipes).to.have.length(recipes.length);
      })
      .end(done);
  });
});

describe('GET /recipe/:id', () => {
  it('should return a single recipe with valid id', (done) => {
    request(app)
      .get(`/api/recipe/${recipes[0]._id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.recipe._id).to.equal(recipes[0]._id.toHexString());
      })
      .end(done);
  });

  it('should return 404 if id is not found', (done) => {
    request(app)
      .get(`/api/recipe/${new ObjectID()}`)
      .expect(404)
      .end(done);
  });

  it('should return 400 if id is invalid', (done) => {
    request(app)
      .get('/api/recipe/iegcac')
      .expect(400)
      .end(done);
  });
});

describe('GET /recipe?ingredients=', () => {
  it('should return a list of recipes with valid ingredients query', (done) => {
    const ingredients = ['eggs', 'onion'];

    request(app)
      .get(`/api/recipe?ingredients=${ingredients}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.recipes).to.have.length(3);
        expect(res.body.recipes[0]).to.have.property('totalIngredients');
        expect(res.body.recipes[0]).to.have.property('numOfIngredientsHave');
        expect(res.body.recipes[0]).to.have.property('numOfIngredientsMissing');
      })
      .end(done);
  });

  it('should return empty array if the ingredients query is empty', (done) => {
    const ingredients = [];

    request(app)
      .get(`/api/recipe?ingredients=${ingredients}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.recipes).to.have.length(0);
      })
      .end(done);
  });

  it('should return 400 without ingredients query', (done) => {
    request(app)
      .get('/api/recipe?test=5')
      .expect(400)
      .end(done);
  });

  it('should return a list of recipes with valid ingredients query and sorting according to popularity', (done) => {
    const ingredients = ['eggs', 'onion'];

    request(app)
      .get(`/api/recipe?ingredients=${ingredients}&sort=numOfLikes`)
      .expect(200)
      .expect((res) => {
        expect(res.body.recipes).to.have.length(3);
        expect(res.body.recipes[0]).to.have.property('totalIngredients');
        expect(res.body.recipes[0]).to.have.property('numOfIngredientsHave');
        expect(res.body.recipes[0]).to.have.property('numOfIngredientsMissing');
        expect(res.body.recipes[0].numOfLikes).to.equal(recipes[4].numOfLikes);
      })
      .end(done);
  });

  it('should return a list of recipes with valid ingredients query and sorting according to numOfIngredientsMissing', (done) => {
    const ingredients = ['eggs', 'onion'];

    request(app)
      .get(`/api/recipe?ingredients=${ingredients}&sort=numOfIngredientsMissing`)
      .expect(200)
      .expect((res) => {
        expect(res.body.recipes).to.have.length(3);
        expect(res.body.recipes[0]).to.have.property('totalIngredients');
        expect(res.body.recipes[0]).to.have.property('numOfIngredientsHave');
        expect(res.body.recipes[0]).to.have.property('numOfIngredientsMissing');
        expect(res.body.recipes[0].numOfIngredientsMissing).to.equal(0);
      })
      .end(done);
  });
});

// describe('POST /recipe', () => {
//   it('should return an inserted recipe', (done) => {
//     const recipe = {
//       name: 'Test Recipe',
//       description: 'Very good recipe',
//       cookingTime: 50,
//       numOfMeals: 3,
//       instructions: [
//         'First instruction',
//         'Second instruction',
//         'Third instruction'
//       ],
//       ingredients: [
//         {
//           _id: ingredients[0]._id,
//           quantity: "100"
//         },
//         {
//           _id: ingredients[1]._id,
//           quantity: "50"
//         }
//       ]
//     };
//
//     console.log(JSON.stringify(recipe));
//
//     request(app)
//       .post('/api/recipe')
//       .field('recipe', JSON.stringify(recipe))
//       .attach('image', path.resolve(__dirname, '..', 'images', 'LeeJongSuk.jpg'))
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.recipe.name).to.equal(recipe.name);
//       })
//       .end((err, res) => {
//         Recipe.findById(res.body.recipe._id).then((recipeFromDb) => {
//           expect(recipeFromDb).to.exist;
//           expect(recipeFromDb.name).to.equal(recipe.name);
//           done();
//         }).catch((err) => {
//           return done(err);
//         });
//       });
//   });
// });

describe('POST /recipe/:id/increaseLike', () => {
  it('should increase numOfLikes by 1 with valid id', (done) => {
    request(app)
      .post(`/api/recipe/${recipes[0]._id}/increaseLike`)
      .expect(200)
      .expect((res) => {
        expect(res.body.recipe.numOfLikes).to.equal(recipes[0].numOfLikes + 1);
      })
      .end(done);
  });

  it('should return 404 if the id is not found', (done) => {
    request(app)
      .post(`/api/recipe/${new ObjectID()}/increaseLike`)
      .expect(404)
      .end(done);
  });

  it('should return 400 if id is not valid', (done) => {
    request(app)
      .post(`/api/recipe/125$!/increaseLike`)
      .expect(400)
      .end(done);
  });
});

describe('POST /recipe/:id/decreaseLike', () => {
  it('should decrease numOfLikes by 1 with valid id', (done) => {
    request(app)
      .post(`/api/recipe/${recipes[0]._id}/decreaseLike`)
      .expect(200)
      .expect((res) => {
        expect(res.body.recipe.numOfLikes).to.equal(recipes[0].numOfLikes - 1);
      })
      .end(done);
  });

  it('should return 404 if the id is not found', (done) => {
    request(app)
      .post(`/api/recipe/${new ObjectID()}/decreaseLike`)
      .expect(404)
      .end(done);
  });

  it('should return 400 if id is not valid', (done) => {
    request(app)
      .post(`/api/recipe/125$!/decreaseLike`)
      .expect(400)
      .end(done);
  });
});

describe('POST /recipe/:id/increaseDislike', () => {
  it('should increase numOfDislikes by 1 with valid id', (done) => {
    request(app)
      .post(`/api/recipe/${recipes[0]._id}/increaseDislike`)
      .expect(200)
      .expect((res) => {
        expect(res.body.recipe.numOfDislikes).to.equal(recipes[0].numOfDislikes + 1);
      })
      .end(done);
  });

  it('should return 404 if the id is not found', (done) => {
    request(app)
      .post(`/api/recipe/${new ObjectID()}/increaseDislike`)
      .expect(404)
      .end(done);
  });

  it('should return 400 if id is not valid', (done) => {
    request(app)
      .post(`/api/recipe/125$!/increaseDislike`)
      .expect(400)
      .end(done);
  });
});

describe('POST /recipe/:id/decreaseDislike', () => {
  it('should decrease numOfDislikes by 1 with valid id', (done) => {
    request(app)
      .post(`/api/recipe/${recipes[0]._id}/decreaseDislike`)
      .expect(200)
      .expect((res) => {
        expect(res.body.recipe.numOfDislikes).to.equal(recipes[0].numOfDislikes - 1);
      })
      .end(done);
  });

  it('should return 404 if the id is not found', (done) => {
    request(app)
      .post(`/api/recipe/${new ObjectID()}/decreaseDislike`)
      .expect(404)
      .end(done);
  });

  it('should return 400 if id is not valid', (done) => {
    request(app)
      .post(`/api/recipe/125$!/decreaseDislike`)
      .expect(400)
      .end(done);
  });
});

// --------------------------------------------------
// USER TEST

describe('GET /users', () => {
  it('should return a list of users', (done) => {
    request(app)
      .get('/api/users')
      .expect(200)
      .expect((res) => {
        expect(res.body.users).to.have.length(users.length);
        expect(res.body.users[0]).to.have.property('email');
        expect(res.body.users[0]).to.have.property('favoriteRecipes');
        expect(res.body.users[0]).to.have.property('ingredients');
        expect(res.body.users[0]).to.not.have.property('password');
      })
      .end(done);
  });
});

describe('GET /user/:id/favoriteRecipes', () => {
  it('should return favorite recipes with valid user id', (done) => {
    request(app)
      .get(`/api/user/${users[0]._id}/favoriteRecipes`)
      .expect(200)
      .expect((res) => {
        expect(res.body.favoriteRecipes).to.have.length(users[0].favoriteRecipes.length);
      })
      .end(done);
  });

  it('should return 404 if id is not found', (done) => {
    request(app)
      .get(`/api/user/${new ObjectID()}/favoriteRecipes`)
      .expect(404)
      .end(done);
  });

  it('should return 400 if id is not valid', (done) => {
    request(app)
      .get('/api/user/124@$/favoriteRecipes')
      .expect(400)
      .end(done);
  });
});

describe('GET /user/:id/ingredients', () => {
  it('should return a list of ingredients with valid id', (done) => {
    request(app)
      .get(`/api/user/${users[0]._id}/ingredients`)
      .expect(200)
      .expect((res) => {
        expect(res.body.ingredients).to.have.length(users[0].ingredients.length);
      })
      .end(done);
  });

  it('should return 404 if id is not found', (done) => {
    request(app)
      .get(`/api/user/${new ObjectID()}/ingredients`)
      .expect(404)
      .end(done);
  });

  it('should return 400 if id is not valid', (done) => {
    request(app)
      .get('/api/user/1255@/ingredients')
      .expect(400)
      .end(done);
  });
});

describe('POST /user/:id/favoriteRecipe', () => {
  it('should return an inserted favorite recipe', (done) => {
    const recipe = {
      _id: recipes[2]._id,
      name: recipes[2].name
    };
    request(app)
      .post(`/api/user/${users[0]._id}/favoriteRecipe`)
      .send(recipe)
      .expect(200)
      .expect((res) => {
        expect(res.body.user.favoriteRecipes).to.have.length(3);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(res.body.user._id)
          .then((user) => {
            if (!user) {
              return done('User not found');
            }
            expect(user.favoriteRecipes).to.have.length(3);
            done();
          })
          .catch(err => done(err));
      });
  });

  it('should return 400 if id is invalid', (done) => {
    const recipe = {
      _id: recipes[2]._id,
      name: recipes[2].name
    };

    request(app)
      .post(`/api/user/125z/favoriteRecipe`)
      .send(recipe)
      .expect(400)
      .end(done);
  });

  it('should return 404 if id is not found', (done) => {
    const recipe = {
      _id: recipes[2]._id,
      name: recipes[2].name
    };

    request(app)
      .post(`/api/user/${new ObjectID()}/favoriteRecipe`)
      .send(recipe)
      .expect(404)
      .end(done);
  });
});

describe('POST /user/:id/ingredient', () => {
  it('should return an inserted ingredient', (done) => {
    const ingredient = {
      _id: ingredients[2]._id,
      name: ingredients[2].name
    };

    request(app)
      .post(`/api/user/${users[0]._id}/ingredient`)
      .send(ingredient)
      .expect(200)
      .expect((res) => {
        expect(res.body.user.ingredients).to.have.length(3);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(res.body.user._id)
          .then((user) => {
            if (!user) {
              return done('Id not found');
            }
            expect(user.ingredients).to.have.length(3);
            done();
          })
          .catch(err => done(err));
      })
  });

  it('should return 400 if id is invalid', (done) => {
    const ingredient = {
      _id: ingredients[2]._id,
      name: ingredients[2].name
    };

    request(app)
      .post('/api/user/124z/ingredient')
      .send(ingredient)
      .expect(400)
      .end(done);
  });

  it('should return 404 if id is not found', (done) => {
    const ingredient = {
      _id: ingredients[2]._id,
      name: ingredients[2].name
    };

    request(app)
      .post(`/api/user/${new ObjectID()}/ingredient`)
      .send(ingredient)
      .expect(404)
      .end(done);
  });
});

describe('POST /user/v1', () => {
  it('should return a registered user', (done) => {
    const userData = {
      email: 'testtxxxt@gmail.com',
      password: '123hihi'
    };

    request(app)
      .post(`/api/user/v1`)
      .send(userData)
      .expect(200)
      .expect((res) => {
        expect(res.body.user.email).to.equal(userData.email);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(res.body.user._id)
          .then((user) => {
            if (!user) {
              return done('Id not found');
            }

            expect(user.email).to.equal(res.body.user.email);
            expect(user.password).to.not.equal(userData.password);
            done();
          })
          .catch(err => done(err));
      });
  });

  it('should return 400 if email is not valid', (done) => {
    const userData = {
      email: 'joo',
      password: 'ahihi'
    };

    request(app)
      .post(`/api/user/v1`)
      .send(userData)
      .expect(400)
      .end(done);
  });
});

describe('POST /user/:id/likeRecipe', () => {
  it('should return a user with new liked recipes', (done) => {
    const recipe = {
      _id: recipes[0]._id
    };
    const userId = users[0]._id;

    request(app)   
      .post(`/api/user/${userId}/likeRecipe`)
      .send(recipe)
      .expect(200)
      .expect((res) => {
        expect(res.body.user.likedRecipes).to.have.length(1);
      })
      .end((err, res) => {
        Recipe.findById(recipes[0]._id).then((recipe) => {
          expect(recipe.numOfLikes).to.equal(recipes[0].numOfLikes + 1);
          done();
        });
      });

  });
});

describe('POST /user/:id/unlikeRecipe', () => {
  it('should return a user object with removed like recipe', (done) => {
    const recipe = {
      _id: recipes[0]._id
    };
    const userId = users[0]._id;

    request(app)   
      .post(`/api/user/${userId}/unlikeRecipe`)
      .send(recipe)
      .expect(200)
      .expect((res) => {
        expect(res.body.user.likedRecipes).to.have.length(0);
      })
      .end((err, res) => {
        Recipe.findById(recipes[0]._id).then((recipe) => {
          expect(recipe.numOfLikes).to.equal(recipes[0].numOfLikes - 1);
          done();
        });
      });

  });
});

describe('POST /user/:id/dislikeRecipe', () => {
  it('should return a user with new disliked recipe', (done) => {
    const recipe = {
      _id: recipes[0]._id
    };
    const userId = users[0]._id;

    request(app)   
      .post(`/api/user/${userId}/dislikeRecipe`)
      .send(recipe)
      .expect(200)
      .expect((res) => {
        expect(res.body.user.dislikedRecipes).to.have.length(1);
      })
      .end((err, res) => {
        Recipe.findById(recipes[0]._id).then((recipe) => {
          expect(recipe.numOfDislikes).to.equal(recipes[0].numOfDislikes + 1);
          done();
        });
      });
  });
});

describe('POST /user/:id/undislikeRecipe', () => {
  it('should return a user with remove disliked recipe', (done) => {
    const recipe = {
      _id: recipes[0]._id
    };
    const userId = users[0]._id;

    request(app)   
      .post(`/api/user/${userId}/undislikeRecipe`)
      .send(recipe)
      .expect(200)
      .expect((res) => {
        expect(res.body.user.dislikedRecipes).to.have.length(0);
      })
      .end((err, res) => {
        Recipe.findById(recipes[0]._id).then((recipe) => {
          expect(recipe.numOfDislikes).to.equal(recipes[0].numOfDislikes - 1);
          done();
        });
      });

  });
});

describe('DELETE /user/:userId/ingredient/:ingredientId', () => {
  it('should return a user with deleted ingredient', (done) => {
    request(app)
      .delete(`/api/user/${users[0]._id}/ingredient/${ingredients[0]._id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.user.ingredients).to.have.length(1);
      })
      .end(done);
  });
});

describe('DELETE /user/:userId/favoriteRecipe/:recipeId', () => {
  it('should return a user with deleted favorite recipe', (done) => {
    request(app)
      .delete(`/api/user/${users[0]._id}/favoriteRecipe/${recipes[0]._id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.user.favoriteRecipes).to.have.length(1);
      })
      .end(done);
  });
});

describe('Test addIngredientName functionality', () => {
  it('should return a new ingredient array with name property inside', (done) => {
    const ingredientTest = [
      { _id: ingredients[0]._id },
      { _id: ingredients[1]._id }
    ];
    addIngredientName(ingredientTest).then((newIngredients) => {
      expect(newIngredients).to.have.length(2);
      expect(newIngredients[0].name).to.equal(ingredients[0].name);
      done();
    }).catch((err) => {
      done(err);
    });
  });
});