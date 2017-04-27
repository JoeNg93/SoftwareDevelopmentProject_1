import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { store } from './store';

import MainPage from './../components/main_page/index';
import ResultPage from './../components/result_page/index';
import UserPage from './../components/user_page/index';
import RecipePage from './../components/recipe_page/index';
import AdminPage from './../components/admin_page/index';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={MainPage} />
        <Route path="/result" component={ResultPage} />
        <Route path="/user/:id" component={UserPage} />
        <Route path="/recipe/:id" component={RecipePage} />
        <Route path="/admin" component={AdminPage} />
      </div>
    </Router>
  </Provider>
  , document.querySelector('.bigContainer'));