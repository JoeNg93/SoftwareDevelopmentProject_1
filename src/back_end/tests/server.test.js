const { app } = require('./../server/server');

const { ObjectID } = require('mongodb');

const request = require('supertest');
const { expect } = require('chai');

const { recipes, ingredients, users, categories }  = require('./seed');

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
        expect(res.body.ingredient.category).to.equal(categories[0]._id.toHexString());
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