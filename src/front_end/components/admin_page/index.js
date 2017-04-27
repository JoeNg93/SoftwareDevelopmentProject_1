import React, { Component } from 'react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import PostRecipeForm from './post_recipe_form';
import PostCategoryForm from './post_category_form';
import PostIngredientForm from './post_ingredient_form';
import UserInfo from './user_info';
import SideNav from './side_nav';

import { getUser } from './../../actions/index';

class AdminPage extends Component {
  componentWillMount() {
    console.log('Heee');
    this.props.getUser().then(() => {
      if (!this.props.currentUser || !this.props.currentUser.isAdmin) {
        this.props.history.push('/');
      }
    });
  }

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

function mapStateToProps(state) {
  return {
    currentUser: state.users.currentUser
  };
}

export default withRouter(connect(mapStateToProps, { getUser })(AdminPage));