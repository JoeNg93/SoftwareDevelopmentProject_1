const { mongoose } = require('./../db/mongoose');

const IngredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  categories: [mongoose.Schema.Types.ObjectId]
});

const Ingredient = mongoose.model('Ingredient', IngredientSchema);

module.exports = {
  Ingredient
};
