const { mongoose } = require('./../db/mongoose');

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  image: {
    _id: String,
    versionId: String,
    imageType: String
  },
  ingredients: [
    {
      _id: String,
      quantity: String,
      name: String
    }
  ],
  cookingTime: Number,
  numOfMeals: Number,
  instructions: [String],
  numOfLikes: Number,
  numOfDislikes: Number
});

RecipeSchema.statics.findByIngredients = function (ingredients) {
  return Recipe.find({
    ingredients: {
      $elemMatch: {
        name: { $in: ingredients }
      }
    }
  });
};

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = {
  Recipe
};