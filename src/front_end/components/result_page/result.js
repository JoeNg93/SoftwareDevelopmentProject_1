import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSortedRecipesWithIngredients, setSortKey } from './../../actions/index';
import _ from 'lodash';
import { Link } from 'react-router-dom';

class Result extends Component {

  constructor() {
    super();
    this.state = {
      currentPage: 1
    };
  }

  componentDidMount() {
    $('#searchResultsHtml').find('#filter').on('change', e => {
      this.onFilterChange(e);
    });
  }

  componentWillMount() {
    this.props.getSortedRecipesWithIngredients(this.props.queryIngredients, 'numOfLikes', 0, 0);
  }

  componentDidUpdate() {
    this.highlightCurrentPage(this.state.currentPage);
  }

  highlightCurrentPage(currentPage) {
    $('.pagination').find(`li:contains(${currentPage})`).addClass('active');
  }

  getNumOfIngredientsHave(recipe) {
    return recipe.ingredients.filter(ingredient => this.props.queryIngredients.indexOf(ingredient.name) != -1).length;
  }

  renderQueryRecipes() {
    const startIndex = (this.state.currentPage - 1) * 6;
    const endIndex = (this.state.currentPage) * 6;

    const currentDisplayRecipes = this.props.queryRecipes.slice(startIndex, endIndex);

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
                  <li># of Ingredients You Have: {this.getNumOfIngredientsHave(recipe)} / {recipe.totalIngredients}</li>
                  <li>Likes: {recipe.numOfLikes}</li>
                  <li>Dislikes: {recipe.numOfDislikes}</li>
                  {this.renderMissingIngredientsOfRecipe(recipe)}
                </ul>
              </div>
            </div>
          </div>
        );
      });
    } else {
      return (
        <h3>No Results, Sorry</h3>
      );
    }
  }

  renderMissingIngredientsOfRecipe(recipe) {
    const missingIngredients = recipe.ingredients.filter(ingredient => this.props.queryIngredients.indexOf(ingredient.name) == -1);
    const missingIngredientsName = _.map(missingIngredients, 'name');
    if (missingIngredientsName.length) {
      return (
        <li className="missingIngredients">You Don't Have: {missingIngredientsName.toString()}</li>
      );
    }
  }

  renderFooter() {
    let numOfPages = 1;
    const numOfQueryRecipes = this.props.queryRecipes.length;
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

  onClickChangePage(currentPage) {
    $('.pagination').find(`li:contains(${this.state.currentPage})`).removeClass('active');
    this.setState({ currentPage });
  }

  onFilterChange(event) {
    const sortKey = event.target.value;
    this.props.setSortKey(sortKey);
    this.props.getSortedRecipesWithIngredients(this.props.queryIngredients, sortKey, 0, 0);
  }

  render() {
    return (
      <div>
        <main>
          <div className="container" id="results">
            <div className="col s12">
              <div className="row">
                <div className="input-field col s12 m4 offset-m8">
                  <select id="filter">
                    <option value="numOfLikes" disabled>Choose your option</option>
                    <option value="numOfLikes" selected>Popularity</option>
                    <option value="numOfIngredientsMissing"># of Ingredients</option>
                  </select>
                  <label>Filter by:</label>
                </div>

              </div>
            </div>

            <div className="col s12">
              <div className="row">
                {this.renderQueryRecipes()}
              </div>
            </div>
          </div>
        </main>

        <footer>
          <ul className="pagination center">
            {this.renderFooter()}
          </ul>
        </footer>

      </div>
    );



  }
}

function mapStateToProps(state) {
  return {
    queryRecipes: state.recipes.queryRecipes,
    queryIngredients: state.ingredients.queryIngredients
  };
}

export default connect(mapStateToProps, { getSortedRecipesWithIngredients, setSortKey })(Result);