import { GET_RECIPES, GET_RECIPE_ID, GET_RECIPE_QUERY_INGREDIENT, GET_TOP_THREE_RECIPES } from './../actions/index';

const INITIAL_STATE = {
  allRecipes: [],
  queryRecipes: [],
  recipe: null,
  topThreeRecipes: []
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_RECIPES:
      return { ...state, allRecipes: action.payload.data.recipes };
    case GET_RECIPE_QUERY_INGREDIENT:
      return { ...state, queryRecipes: action.payload.data.recipes };
    case GET_RECIPE_ID:
      return { ...state, recipe: action.payload.data.recipe };
    case GET_TOP_THREE_RECIPES:
      return { ...state, topThreeRecipes: action.payload.data.recipes.reverse() };
    default:
      return state;
  }
}