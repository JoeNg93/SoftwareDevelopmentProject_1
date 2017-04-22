import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import RecipesReducer from './reducer_recipes';
import IngredientsReducer from './reducer_ingredients';
import CategoriesReducer from './reducer_categories';
import UsersReducer from './reducer_users';

const rootReducer = combineReducers({
  form: formReducer,
  recipes: RecipesReducer,
  ingredients: IngredientsReducer,
  categories: CategoriesReducer,
  users: UsersReducer
});

export default rootReducer;