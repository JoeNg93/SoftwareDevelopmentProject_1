const { mongoose } = require('./../db/mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [
    {
      access: {
        type: String,
      },
      token: {
        type: String
      }
    }
  ],
  favoriteRecipes: [mongoose.Schema.Types.ObjectId],
  ingredients: [String]
});

const User = mongoose.model('User', UserSchema);

module.exports = {
  User
};