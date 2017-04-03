const { mongoose } = require('./../db/mongoose');

const IngredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  categoryID: String
});

const Ingredient = mongoose.model('Ingredient', IngredientSchema);

module.exports = {
  Ingredient
};
