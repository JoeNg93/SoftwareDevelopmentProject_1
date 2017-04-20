import { GET_CATEGORIES } from './../actions/index';

const INITIAL_STATE = {
  allCategories: []
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return { ...state, allCategories: action.payload.data.categories };
    default:
      return state;
  }
}