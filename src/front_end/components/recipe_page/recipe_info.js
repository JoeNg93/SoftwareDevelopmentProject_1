import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';


class RecipeInfo extends Component {
  renderIngredientsInRecipe(recipe) {
    return recipe.ingredients.map((ingredient) => {
      return (
        <li>{ingredient.quantity} {ingredient.name}</li>
      );
    });
  }

  renderDirectionsInRecipe(recipe) {
    return recipe.instructions.map((instruction) => {
      return (
          <li>
            <span className="directions">{instruction}</span>
            <br/>
          </li>
      );
    });
  }

  render() {
    const recipe = this.props.recipe;
    if (recipe) {
      return (
        <main>
          <div className="container" id="recipeTitle">
            <div className="row valign-wrapper">
              <div className="col s6">
                <h4 className="valign">{recipe.name}</h4>

                <blockquote>{recipe.description}</blockquote>

                <span id="titleSpan">
                  <h6>Like this Recipe?</h6>
                  <a className="btn btn-floating pulse" id="thumbup"><i className="material-icons">thumb_up</i></a>
                  <a className="btn btn-floating pulse" id="thumbdown"><i className="material-icons">thumb_down</i></a>
                  <br />
                  <a className="waves-effect waves-light btn" id="addFavorite"><i
                    className="material-icons left">playlist_add</i>Favorite
                    </a>
                </span>
              </div>
              <div className="col s6">
                <img id="recipeImg" src={`http://res.cloudinary.com/dicyn7jds/image/upload/c_scale,h_200,w_200/${recipe.image.versionId}/${recipe.image._id}.${recipe.image.imageType}`} />
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col s12">
                <h5>Ingredients:</h5>
                <ul id="recipeIngredients">
                  {this.renderIngredientsInRecipe(recipe)}
                </ul>
              </div>
            </div>
          </div>

          <section>
            <div className="container">
              <div className="row">
                <div className="col s12">
                  <h5>Directions</h5>
                  <span className="valign-wrapper"><i className="material-icons left valign">query_builder</i>{`${recipe.cookingTime}m`}</span>
                  <ol className="custom-counter">
                    {this.renderDirectionsInRecipe(recipe)}
                  </ol>
                </div>
              </div>
            </div>
          </section>
        </main>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    recipe: state.recipes.recipe
  }
}

export default connect(mapStateToProps)(RecipeInfo);