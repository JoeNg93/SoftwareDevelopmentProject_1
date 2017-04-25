import { LOGIN, LIKE_RECIPE, UNLIKE_RECIPE, DISLIKE_RECIPE, UNDISLIKE_RECIPE, GET_USER, POST_USER_ID_FAVORITE_RECIPE, POST_USER_ID_INGREDIENT, DELETE_USER_ID_FAVORITE_RECIPE, DELETE_USER_ID_INGREDIENT } from './../actions/index';

const INITIAL_STATE = {
  currentUser: null,
  allUsers: []
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN:
    case GET_USER:
    case LIKE_RECIPE:
    case UNLIKE_RECIPE:
    case DISLIKE_RECIPE:
    case UNDISLIKE_RECIPE:
    case POST_USER_ID_FAVORITE_RECIPE:
    case POST_USER_ID_INGREDIENT:
    case DELETE_USER_ID_FAVORITE_RECIPE:
    case DELETE_USER_ID_INGREDIENT:
      return { ...state, currentUser: action.payload.data ? action.payload.data.user : null };
    default:
      return state;
  }
}
