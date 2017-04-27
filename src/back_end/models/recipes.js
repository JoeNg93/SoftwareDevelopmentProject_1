const { mongoose } = require('./../db/mongoose');

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
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
  numOfLikes: {
    type: Number,
    default: 0
  },
  numOfDislikes: {
    type: Number,
    default: 0
  }
});

RecipeSchema.statics.findByIngredients = function (ingredients, skip, limit) {
  return Recipe.find({
    ingredients: {
      $elemMatch: {
        name: { $in: ingredients }
      }
    }
  }).skip(skip).limit(limit);
};

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = {
  Recipe
};