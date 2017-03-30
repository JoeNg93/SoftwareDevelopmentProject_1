const { mongoose } = require('./../db/mongoose');

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: String,
  ingredients: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      quantity: String,
      name: String
    }
  ],
  cookingTime: Number,
  numOfMeals: Number,
  difficulty: Number,
  instructions: String,
  numOfLikes: Number,
  numOfDislikes: Number
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = {
  Recipe
};