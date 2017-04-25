import React, { Component } from 'react';
import { connect } from 'react-redux';

import SideNav from './side_nav';
import RecipeInfo from './recipe_info';

import { getRecipeWithId, getUser } from './../../actions/index';

class RecipePage extends Component {
  componentWillMount() {
    const recipeId = this.props.match.params.id;
    this.props.getRecipeWithId(recipeId);
    this.props.getUser();
  }

  componentDidMount() {
    $(".button-collapse").sideNav();
    $('.modal').modal();
  }

  render() {
    return (
      <div id="recipePageHtml">
        <SideNav />
        <RecipeInfo />
      </div>
    );
  }
}

export default connect(null, { getRecipeWithId, getUser })(RecipePage);