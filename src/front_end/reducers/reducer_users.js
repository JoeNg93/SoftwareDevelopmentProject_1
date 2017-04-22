import { CHECK_SESSION_KEY, LOGIN } from './../actions/index';

const INITIAL_STATE = {
  isSessionKeyExist: false,
  currentUser: null,
  allUsers: []
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHECK_SESSION_KEY:
      return { ...state, isSessionKeyExist: action.payload.data };
    case LOGIN:
      return { ...state, currentUser: action.payload.data ? action.payload.data.user : null };
    default:
      return state;
  }
}
