import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { HOST_URL } from './../../../back_end/config/keyConfig';

import {
  deleteUserFavoriteRecipe,
} from './../../actions/index';

import _ from 'lodash';

class FavoriteRecipes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      favoriteRecipesWithDetails: []
    };
    this.removeRecipeId = null;
  }

  getRecipeDetails(recipeId) {
    return axios.get(`${HOST_URL}/api/recipe/${recipeId}`)
      .then(response => response.data.recipe);
  }

  componentDidUpdate() {
    console.log('Do update');
    this.highlightCurrentPage(this.state.currentPage);

    Promise.all(
      this.props.currentUser.favoriteRecipes.map(recipe => this.getRecipeDetails(recipe._id))
    ).then((recipes) => {
      if (this.state.favoriteRecipesWithDetails.length != recipes.length) {
        this.setState({ favoriteRecipesWithDetails: recipes });
      }
    });

  }

  highlightCurrentPage(currentPage) {
    $('.pagination').find(`li:contains(${currentPage})`).addClass('active');
  }

  onClickChangePage(currentPage) {
    $('.pagination').find(`li:contains(${this.state.currentPage})`).removeClass('active');
    this.setState({ currentPage });
  }

  onClickRemoveRecipe(recipeId) {
    $('#removeRecipeModal').modal('open');
    this.removeRecipeId = recipeId;
  }

  onClickConfirmRemoveRecipe(e) {
    this.props.deleteUserFavoriteRecipe(this.props.currentUser._id, this.removeRecipeId);
    $('#removeRecipeModal').modal('close');
  }

  onClickCancelRemoveRecipe(e) {
    $('#removeRecipeModal').modal('close');
  }

  renderFavoriteRecipes() {
    const startIndex = (this.state.currentPage - 1) * 6;
    const endIndex = (this.state.currentPage) * 6;

    const currentDisplayRecipes = this.state.favoriteRecipesWithDetails.slice(startIndex, endIndex);

    if (currentDisplayRecipes.length) {
      return currentDisplayRecipes.map((recipe) => {
        return (
          <div className="col s12 m4" key={recipe._id}>
            <div className="card">
              <div className="card-image">
                <Link to={`/recipe/${recipe._id}`}>
                  <img src={`http://res.cloudinary.com/dicyn7jds/image/upload/c_scale,h_200,w_200/${recipe.image.versionId}/${recipe.image._id}.${recipe.image.imageType}`} />
                </Link>
              </div>
              <div className="card-content">
                <ul>
                  <li><h4><Link to={`/recipe/${recipe._id}`}>{recipe.name}</Link></h4></li>
                  <li># of Ingredients You Have: {this.getNumOfIngredientsHave(recipe)} / {recipe.ingredients.length}</li>
                  <li>Likes: {recipe.numOfLikes}</li>
                  <li>Dislikes: {recipe.numOfDislikes}</li>
                  {this.renderMissingIngredientsOfRecipe(recipe)}
                </ul>
              </div>
              <div className="card-action">
                <button className="btn waves-effect waves-light red lighten-1" style={{ display: 'block', width: '100%' }} onClick={() => this.onClickRemoveRecipe(recipe._id)}>Remove Recipe</button>
              </div>
            </div>
          </div>
        );
      });
    } else {
      return (
        <h3>Seems that you dont have any favorite recipes</h3>
      );
    }
  }

  renderFooter() {
    let numOfPages = 1;
    const numOfQueryRecipes = this.props.currentUser.favoriteRecipes.length;
    const recipesPerPage = 6;
    if (numOfQueryRecipes) {
      numOfPages = Math.ceil(numOfQueryRecipes / recipesPerPage);
    }

    const renderData = [];
    renderData.push((
      <li><a href="#!" onClick={e => this.onClickChangePage.bind(this)(1)}><i className="material-icons">chevron_left</i></a></li>
    ));

    for (let i = 1; i <= numOfPages; i++) {
      renderData.push((
        <li className="waves-effect"><a href="#!" onClick={e => this.onClickChangePage.bind(this)(e.target.innerHTML)}>{i}</a></li>
      ));
    }

    renderData.push((
      <li className="waves-effect"><a href="#!" onClick={e => this.onClickChangePage.bind(this)(numOfPages)}><i className="material-icons">chevron_right</i></a></li>
    ));

    return renderData;
  }

  getNumOfIngredientsHave(recipe) {
    return recipe.ingredients.filter(ingredient => this.props.currentUser.ingredients.indexOf(ingredient.name) != -1).length;
  }

  renderMissingIngredientsOfRecipe(recipe) {
    const missingIngredients = recipe.ingredients.filter(ingredient => _.map(this.props.currentUser.ingredients, 'name').indexOf(ingredient.name) == -1);
    const missingIngredientsName = _.map(missingIngredients, 'name');
    if (missingIngredientsName.length) {
      return (
        <li className="missingIngredients">You Don't Have: {missingIngredientsName.toString()}</li>
      );
    }
  }

  render() {
    if (this.props.currentUser) {
      return (
        <div>
          <main>
            <div className="container" id="results">

              <div className="col s12">
                <div className="row center">
                  <h2>Favorite Recipes</h2>
                </div>
              </div>

              <div className="col s12">
                <div className="row">
                  {this.renderFavoriteRecipes()}
                </div>
              </div>
            </div>
          </main>

          <footer>
            <ul className="pagination center">
              {this.renderFooter()}
            </ul>
          </footer>

          <div id="removeRecipeModal" className="modal">

            <div className="modal-content center">
              <div className="row">
                <div className="col s6 offset-s3">
                  <h2 className="red-text text-darken-1">Warning</h2>
                </div>
              </div>
              <hr />
              <div className="row">
                <h5>Are you sure you want to delete this recipe?</h5>
              </div>
            </div>
            <div className="modal-footer">
              <div className="row">
                <div className="col s5 m3 offset-m2">
                  <button className="btn waves-effect waves-light teal lighten-1" style={{ display: 'block', width: '100%' }} onClick={this.onClickConfirmRemoveRecipe.bind(this)}>YES</button>
                </div>
                <div className="col s5 offset-s2 m3 offset-m2">
                  <button className="btn waves-effect waves-light red lighten-1" style={{ display: 'block', width: '100%' }} onClick={this.onClickCancelRemoveRecipe}>NO</button>
                </div>
              </div>
            </div>

          </div>

        </div>
      );
    } else {
      return <div></div>;
    }

  }

}

function mapStateToProps(state) {
  return {
    currentUser: state.users.currentUser
  };
}

const dispatchActions = {
  deleteUserFavoriteRecipe,
};

export default connect(mapStateToProps, dispatchActions)(FavoriteRecipes);