import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import PostRecipeForm from './post_recipe_form';
import PostCategoryForm from './post_category_form';
import PostIngredientForm from './post_ingredient_form';
import UserInfo from './user_info';
import SideNav from './side_nav';

class AdminPage extends Component {
  

  componentDidMount() {
    $('.button-collapse').sideNav();
  }

  render() {
    return (
      <div id="adminPageHtml">
        <SideNav />
        <Route path="/admin/post/recipe" component={PostRecipeForm} />
        <Route path="/admin/post/category" component={PostCategoryForm} />
        <Route path="/admin/post/ingredient" component={PostIngredientForm} />
        <Route path="/admin/get/users" component={UserInfo} />
      </div>
    );
  } // end render()
}

export default AdminPage;