import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTopThreeRecipes } from './../../actions/index';
import { Link } from 'react-router-dom';

class TopRecipes extends Component {
  componentWillMount() {
    this.props.getTopThreeRecipes();
  } // end componentWillMount()

  renderRecipes() {
    return this.props.recipes.map((recipe) => {
      return (
        <div className="col s11 m3" key={recipe._id} style={{ marginLeft: '4%', marginRight: '4%' }}>
          <div className="card">
            <div className="card-image">
              <Link to={`/recipe/${recipe._id}`}>
                <img src={`http://res.cloudinary.com/dicyn7jds/image/upload/c_scale,h_200,w_200/${recipe.image.versionId}/${recipe.image._id}.${recipe.image.imageType}`} />
              </Link>
            </div>
            <div className="card-content">
              <ul>
                <li><h5><Link to={`/recipe/${recipe._id}`}>{recipe.name}</Link></h5></li>
                <li>Likes: {recipe.numOfLikes}</li>
                <li>Dislikes: {recipe.numOfDislikes}</li>
              </ul>
            </div>
          </div>
        </div>
      );
    })
  } // end renderRecipes()

  render() {
    if (this.props.recipes) {
      return (
        <section id="topRecipes" className="section scrollspy">
          <div className="row">
            <div className="col s12">
              <h3>Top Recipes</h3>
            </div>
          </div>
          <div className="row">
            {this.renderRecipes()}
          </div>
        </section>
      );
    } else {
      return (
        <section id="topRecipes" className="section scrollspy">
          <div className="row">
            <div className="col s12">
              <h3>Top Recipes</h3>
            </div>
          </div>
        </section>
      );
    }

  } // end render()

} // end TopRecipes

function mapStateToProps(state) {
  return {
    recipes: state.recipes.topThreeRecipes,
  };
}

export default connect(mapStateToProps, { getTopThreeRecipes })(TopRecipes);