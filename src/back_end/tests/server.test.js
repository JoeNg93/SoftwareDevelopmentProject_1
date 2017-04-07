const { app } = require('./../server/server');

const { addIngredientName } = require('./../routers/api_router');

const { ObjectID } = require('mongodb');

const request = require('supertest');
const { expect } = require('chai');

const { recipes, ingredients, users, categories }  = require('./seed');

const { Category } = require('./../models/categories');
const { Ingredient } = require('./../models/ingredients');
const { Recipe } = require('./../models/recipes');

const { populateCategories, populateIngredients, populateRecipes, populateUsers } = require('./seed');

beforeEach(populateCategories);
beforeEach(populateIngredients);
beforeEach(populateRecipes);

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
        expect(res.body.ingredients).to.have.length(2);
        expect(res.body.ingredients[0]._id).to.equal(ingredients[8]._id.toHexString());
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

describe('GET /recipe', () => {
  it('should return a list of recipes with valid ingredients query', (done) => {
    const ingredients = ['eggs', 'onion'];

    request(app)
      .get(`/api/recipe?ingredients=${ingredients}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.recipes).to.have.length(3);
      })
      .end(done);
  });

  it('should return 404 not found if the ingredients query is empty', (done) => {
    const ingredients = [];

    request(app)
      .get(`/api/recipe?ingredients=${ingredients}`)
      .expect(404)
      .end(done);
  });

  it('should return 400 without ingredients query', (done) => {
    request(app)
      .get('/api/recipe?test=5')
      .expect(400)
      .end(done);
  });
});

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