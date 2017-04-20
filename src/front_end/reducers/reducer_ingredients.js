import { GET_INGREDIENTS, GET_INGREDIENT_ID, ADD_QUERY_INGREDIENTS, REMOVE_QUERY_INGREDIENT, CLEAR_QUERY_INGREDIENTS, SET_SORT_KEY } from './../actions/index';

const INITIAL_STATE = {
  allIngredients: [],
  ingredient: null,
  queryIngredients: [],
  sortKey: 'numOfLikes'
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_INGREDIENTS:
      return { ...state, allIngredients: action.payload.data.ingredients };
    case GET_INGREDIENT_ID:
      return { ...state, ingredient: action.payload.data.ingredient };
    case ADD_QUERY_INGREDIENTS:
      return { ...state, queryIngredients: Array.from(new Set([...state.queryIngredients, ...action.payload]))};
    case REMOVE_QUERY_INGREDIENT:
      return { ...state, queryIngredients: state.queryIngredients.filter(x => x != action.payload) };
    case CLEAR_QUERY_INGREDIENTS:
      return { ...state, queryIngredients: [] };
    case SET_SORT_KEY:
      return { ...state, sortKey: action.payload };
    default:
      return state;
  }
}

