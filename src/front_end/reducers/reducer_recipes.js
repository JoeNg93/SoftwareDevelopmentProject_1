import { GET_RECIPES, GET_RECIPE_ID, GET_RECIPE_QUERY_INGREDIENT, GET_TOP_THREE_RECIPES, LIKE_RECIPE, UNLIKE_RECIPE, DISLIKE_RECIPE, UNDISLIKE_RECIPE } from './../actions/index';

const INITIAL_STATE = {
  allRecipes: [],
  queryRecipes: [],
  currentRecipe: null,
  topThreeRecipes: []
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_RECIPES:
      return { ...state, allRecipes: action.payload.data.recipes };
    case GET_RECIPE_QUERY_INGREDIENT:
      return { ...state, queryRecipes: action.payload.data.recipes };
    case GET_RECIPE_ID:
    case LIKE_RECIPE:
    case UNLIKE_RECIPE:
    case DISLIKE_RECIPE:
    case UNDISLIKE_RECIPE:
      return { ...state, currentRecipe: action.payload.data.recipe };
    case GET_TOP_THREE_RECIPES:
      return { ...state, topThreeRecipes: action.payload.data.recipes.reverse() };
    default:
      return state;
  }
}