import { createStore, applyMiddleware } from 'redux';

import ReduxPromise from 'redux-promise';

import reducers from './../reducers/index';

export const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(ReduxPromise)
);