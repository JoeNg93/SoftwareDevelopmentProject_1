import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  likeRecipe,
  unlikeRecipe,
  dislikeRecipe,
  undislikeRecipe,
  getUser,
  postUserFavoriteRecipe
} from './../../actions/index';


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
    this.state = {
      modalMessage: '',
      displayModalFooter: true,
      modalHeader: ''
    };
    this.modalDisplayTime = 1000;
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
      this.setState({ modalMessage: 'Please login to like this recipe', displayModalFooter: true, modalHeader: 'Warning' });
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
      this.setState({ modalMessage: 'Please login to dislike this recipe', displayModalFooter: true, modalHeader: 'Warning' });
      $('#likeDislikeModalRecipePage').modal('open');
    }
  }

  onClickAddRecipeFavorite(e) {
    if (this.props.currentUser) {

      if (this.props.currentUser.favoriteRecipes.find(recipe => recipe._id === this.props.recipe._id)) {
        this.setState({ modalMessage: 'This recipe is already in your favorite', modalHeader: 'Failed', displayModalFooter: false });
        $('#likeDislikeModalRecipePage').modal('open');
        setTimeout(function () {
          $('#likeDislikeModalRecipePage').modal('close');
        }, this.modalDisplayTime);
        return;
      }
      this.props.postUserFavoriteRecipe(this.props.currentUser._id, this.props.recipe._id, this.props.recipe.name)
        .then(() => {
          this.setState({ modalMessage: 'Added to your favorite recipes', displayModalFooter: false, modalHeader: 'Success' });
          $('#likeDislikeModalRecipePage').modal('open');
          setTimeout(function () {
            $('#likeDislikeModalRecipePage').modal('close');
          }, this.modalDisplayTime);
        });

    } else {
      this.setState({ modalMessage: 'Please login to add this recipe to your favorite', displayModalFooter: true, modalHeader: 'Warning' });
      $('#likeDislikeModalRecipePage').modal('open')
    }
  }

  renderModalFooter() {
    if (this.state.displayModalFooter) {
      return (
        <div className="modal-footer">
          <div className="row">
            <div className="col s2 offset-s5">
              <Link to="/" className="modal-action modal-close waves-effect waves-default btn"
                style={{ backgroundColor: '#307197' }}>
                Homepage
                </Link>
            </div>
          </div>
        </div>
      );
    } else {
      return <div></div>;
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
                      <div className="col s6 m3 offset-m3 center">
                        <h5>{recipe.numOfLikes}</h5>
                      </div>
                      <div className="col s6 m3 center">
                        <h5>{recipe.numOfDislikes}</h5>
                      </div>

                      <div className="col s6 m3 offset-m3 center">
                        <a href="#!" onClick={this.onClickLikeRecipe.bind(this)}>
                          <i className="material-icons medium" style={{ color: this.props.currentUser && this.props.currentUser.likedRecipes.indexOf(recipe._id) != -1 ? this.blueColor : this.greyColor }}>thumb_up</i>
                        </a>
                      </div>
                      <div className="col s6 m3 center">
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
                  <h2 className="red-text text-darken-1">{this.state.modalHeader}</h2>
                </div>
              </div>
              <hr />
              <div className="row">
                { this.state.modalHeader === 'Success' && <i className="material-icons large">done</i> }
                <h5>{this.state.modalMessage}</h5>
              </div>
            </div>

            {this.renderModalFooter()}

          </div>

          <div id="addedFavoriteRecipeModal" className="modal">
            <div className="modal-content center">
              <div className="row">
                <div className="col s6 offset-s3">
                  <h3>Success</h3>
                </div>
              </div>
              <hr />
              <div className="row">
                <p>Added to your favorite recipes</p>
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
                  <h3>{this.state.modalHeader}</h3>
                </div>
              </div>
              <hr />
              <div className="row">
                <h5>{this.state.modalMessage}</h5>
              </div>
            </div>

            {this.renderModalFooter()}

          </div>

          <div id="addedFavoriteRecipeModal" className="modal">
            <div className="modal-content center">
              <div className="row">
                <div className="col s6 offset-s3">
                  <h3>Success</h3>
                </div>
              </div>
              <hr />
              <div className="row">
                <p>Added to your favorite recipes</p>
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

const dispachActions = {
  likeRecipe,
  unlikeRecipe,
  dislikeRecipe,
  undislikeRecipe,
  getUser,
  postUserFavoriteRecipe
};

export default connect(mapStateToProps, dispachActions)(RecipeInfo);