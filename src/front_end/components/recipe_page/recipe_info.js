import React, { Component } from 'react';
import { connect } from 'react-redux';
import { likeRecipe, unlikeRecipe, dislikeRecipe, undislikeRecipe, getUser } from './../../actions/index';


class RecipeInfo extends Component {

  renderIngredientsInRecipe(recipe) {
    return recipe.ingredients.map((ingredient) => {
      return (
        <li>{ingredient.quantity} {ingredient.name}</li>
      );
    });
  }

  constructor(props) {
    super(props);
    this.greyColor = '#9e9e9e';
    this.blueColor = '#01579b';
  }

  renderDirectionsInRecipe(recipe) {
    return recipe.instructions.map((instruction) => {
      return (
        <li>
          <span className="directions">{instruction}</span>
          <br />
        </li>
      );
    });
  }

  onClickLikeRecipe(e) {
    if (this.props.currentUser) {
      const isLiked = this.props.currentUser.likedRecipes.indexOf(this.props.recipe._id) != -1;
      const isDisliked = this.props.currentUser.dislikedRecipes.indexOf(this.props.recipe._id) != -1;

      if (isLiked) {
        this.props.unlikeRecipe(this.props.currentUser._id, this.props.recipe._id);
      } else {
        if (isDisliked) {
          this.props.undislikeRecipe(this.props.currentUser._id, this.props.recipe._id).then(() => {
            this.props.likeRecipe(this.props.currentUser._id, this.props.recipe._id);
          });
          return;
        }
        this.props.likeRecipe(this.props.currentUser._id, this.props.recipe._id);
      }
    } else {
      $('#likeDislikeModalRecipePage').modal('open');
    }
  }

  onClickDislikeRecipe(e) {
    if (this.props.currentUser) {
      const isLiked = this.props.currentUser.likedRecipes.indexOf(this.props.recipe._id) != -1;
      const isDisliked = this.props.currentUser.dislikedRecipes.indexOf(this.props.recipe._id) != -1;

      if (isDisliked) {
        this.props.undislikeRecipe(this.props.currentUser._id, this.props.recipe._id);
      } else {
        if (isLiked) {
          this.props.unlikeRecipe(this.props.currentUser._id, this.props.recipe._id).then(() => {
            this.props.dislikeRecipe(this.props.currentUser._id, this.props.recipe._id)
          });
          return;
        }
        this.props.dislikeRecipe(this.props.currentUser._id, this.props.recipe._id);
      }
    } else {
      $('#likeDislikeModalRecipePage').modal('open');
    }
  }

  onClickAddRecipeFavorite(e) {
    if (this.props.currentUser) {

    } else {
      $('#likeDislikeModalRecipePage').modal('open');
    }
  }

  render() {
    const recipe = this.props.recipe;
    if (recipe) {
      return (
        <div>

          <main>
            <div className="container" id="recipeTitle">
              <div className="row valign-wrapper">
                <div className="col s6">
                  <h4 className="valign">{recipe.name}</h4>

                  <blockquote>{recipe.description}</blockquote>

                  <span id="titleSpan">
                    <h6>Like this Recipe?</h6>
                    <div className="row">
                      <div className="col s3 offset-s3 center">
                        <h5>{recipe.numOfLikes}</h5>
                      </div>
                      <div className="col s3 center">
                        <h5>{recipe.numOfDislikes}</h5>
                      </div>

                      <div className="col s3 offset-s3 center">
                        <a href="#!" onClick={this.onClickLikeRecipe.bind(this)}>
                          <i className="material-icons medium" style={{ color: this.props.currentUser && this.props.currentUser.likedRecipes.indexOf(recipe._id) != -1 ? this.blueColor : this.greyColor }}>thumb_up</i>
                        </a>
                      </div>
                      <div className="col s3 center">
                        <a href="#!" onClick={this.onClickDislikeRecipe.bind(this)}>
                          <i className="material-icons medium" style={{ color: this.props.currentUser && this.props.currentUser.dislikedRecipes.indexOf(recipe._id) != -1 ? this.blueColor : this.greyColor }}>thumb_down</i>
                        </a>
                      </div>
                    </div>

                    <br />
                    <a className="waves-effect waves-light btn" id="addFavorite" onClick={this.onClickAddRecipeFavorite.bind(this)}><i
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

          <div id="likeDislikeModalRecipePage" className="modal">
            <div className="modal-content center">
              <div className="row">
                <div className="col s6 offset-s3">
                  <h3>Warning</h3>
                </div>
              </div>
              <hr />
              <div className="row">
                <p>Please back to home page and login to like/dislike/add favorite this recipe</p>
              </div>
            </div>
            <div className="modal-footer center">
              <div className="row">
                <div className="col s6 offset-s3">
                  <a href="/" class="modal-action modal-close waves-effect waves-default btn">Back To Homepage</a>
                </div>
              </div>
            </div>
          </div>

          <div id="addRecipeFavoriteModalRecipePage" className="modal">
            <div className="modal-content center">
              <div className="row">
                <div className="col s6 offset-s3">
                  <h3>Warning</h3>
                </div>
              </div>
              <hr />
              <div className="row">
                <p>Please back to home page and login to add this recipe to favorites</p>
              </div>
            </div>
            <div className="modal-footer center">
              <div className="row">
                <div className="col s6 offset-s3">
                  <a href="/" class="modal-action modal-close waves-effect waves-default btn">Back To Homepage</a>
                </div>
              </div>
            </div>
          </div>

        </div>

      );
    } else {
      return (
        <div>

          <div id="likeDislikeModalRecipePage" className="modal">
            <div className="modal-content center">
              <div className="row">
                <div className="col s6 offset-s3">
                  <h3>Warning</h3>
                </div>
              </div>
              <hr />
              <div className="row">
                <p>Please back to home page and login to like/dislike/add favorite this recipe</p>
              </div>
            </div>
            <div className="modal-footer center">
              <div className="row">
                <div className="col s6 offset-s3">
                  <a href="/" class="modal-action modal-close waves-effect waves-default btn">Back To Homepage</a>
                </div>
              </div>
            </div>
          </div>

          <div id="addRecipeFavoriteModalRecipePage" className="modal">
            <div className="modal-content center">
              <div className="row">
                <div className="col s6 offset-s3">
                  <h3>Warning</h3>
                </div>
              </div>
              <hr />
              <div className="row">
                <p>Please back to home page and login to add this recipe to favorites</p>
              </div>
            </div>
            <div className="modal-footer center">
              <div className="row">
                <div className="col s6 offset-s3">
                  <a href="/" class="modal-action modal-close waves-effect waves-default btn">Back To Homepage</a>
                </div>
              </div>
            </div>
          </div>

        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    recipe: state.recipes.currentRecipe,
    currentUser: state.users.currentUser
  }
}

export default connect(mapStateToProps, { likeRecipe, unlikeRecipe, dislikeRecipe, undislikeRecipe, getUser })(RecipeInfo);