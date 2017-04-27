import React, { Component } from 'react';
import { getCategories, removeQueryIngredient, addQueryIngredients, getSortedRecipesWithIngredients, getUser, getIngredients } from './../../actions/index';
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom';

class SideNav extends Component {
  componentWillMount() {
    this.props.getCategories();
    this.props.getIngredients();
    this.props.getUser();
  }

  componentDidUpdate() {
    this.props.queryIngredients.forEach(ingredientName => this.checkIngredientCheckbox(ingredientName));
  }

  renderCategories() {
    if (this.props.categories.length) {
      return this.props.categories
        .map((category) => {
          return (
            <li id={category.name}>
              <div className="collapsible-header">{category.name.charAt(0).toUpperCase() + category.name.slice(1)}</div>
              <div className="collapsible-body">
                <span>
                  {this.renderIngredientsInCategory(category.name)}
                </span>
              </div>
            </li>
          );
        });
    }
  }

  onClickOnCheckbox(e) {
    const isChecked = $(e.target).prop('checked');
    const ingredientName = $('#searchResultsHtml').find(`label[id=${e.target.id}]`).html();
    if (isChecked) {
      this.props.addQueryIngredients(ingredientName);
    } else {
      this.props.removeQueryIngredient(ingredientName);
    }
  }

  renderIngredientsInCategory(categoryName) {
    return this.props.ingredients.filter(ingredient => ingredient.categoryName === categoryName)
      .map((ingredient) => {
        const isChecked = this.props.queryIngredients.indexOf(ingredient.name) != -1;
        return (
          <span>
            <input type="checkbox" className="filled-in" id={ingredient._id} onClick={this.onClickOnCheckbox.bind(this)} />
            <label htmlFor={ingredient._id} id={ingredient._id}>{ingredient.name}</label>
          </span>
        );
      });
  }

  renderQueryIngredients() {
    return this.props.queryIngredients.map((ingredientName) => {
      return (
        <li className="collection-item" id={ingredientName}>
          <div>
            {ingredientName}<a href="#!" className="secondary-content" onClick={this.onClickRemoveQueryIngredient.bind(this)}><i className="material-icons" id={ingredientName}>delete</i></a>
          </div>
        </li>
      );
    });
  }

  onClickMyPantry(e) {
    if (this.props.currentUser) {
      this.props.history.push(`/user/${this.props.currentUser._id}`);
      return;
    } else {
      $('#myPantryModalResultPage').modal('open');
    }
  }

  onClickRemoveQueryIngredient(e) {
    const removeIngredientName = $(e.target).attr('id');
    this.uncheckIngredientCheckbox(removeIngredientName);
    this.props.removeQueryIngredient(removeIngredientName);
  }

  uncheckIngredientCheckbox(ingredientName) {
    const checkboxId = $('#searchResultsHtml').find(`label:contains(${ingredientName})`).prop('id');
    $('#searchResultsHtml').find(`input[id=${checkboxId}]`).prop('checked', false);
  }

  checkIngredientCheckbox(ingredientName) {
    const checkboxId = $('#searchResultsHtml').find(`label:contains(${ingredientName})`).prop('id');
    $('#searchResultsHtml').find(`input[id=${checkboxId}]`).prop('checked', true);
  }

  onClickSearchAgain(e) {
    this.props.getSortedRecipesWithIngredients(this.props.queryIngredients, this.props.sortKey, 0, 0);
  }

  render() {
    return (
      <div>

        <header>
          <nav className="top-nav teal hide-on-large-only">
            <div className="container">
              <div className="nav-wrapper">
                <Link to="/" className="brand-logo">
                  <span className="topNavBrandNameVar">var</span>
                  <span className="topNavBrandNameIngredient">Ingredient</span>
                </Link>
                <a href="#" data-activates="nav-mobile" className="button-collapse"><i
                  className="material-icons" id="smallNavMenuSearch">menu</i></a>
              </div>
            </div>
          </nav>

          <ul id="nav-mobile" className="side-nav fixed">
            <li className="logo fill"><Link id="logo-container" to="/"><img src="http://res.cloudinary.com/rwbarker/image/upload/c_scale,h_300,w_300/v1492503178/logo_final_bxjwsl.png" /></Link></li>
            <li className="center"><Link to="/" className="waves-effect waves-orange navlinks home">Home</Link></li>
            <li className="center"><a href="#myPantryModal" className="waves-effect waves-orange navlinks myPantry" onClick={this.onClickMyPantry.bind(this)}>My Pantry</a></li>
            <li className="center"><a href="#!" className="waves-effect waves-orange navlinks updateSearch" onClick={this.onClickSearchAgain.bind(this)}><i className="material-icons">search</i></a></li>
            <li className="divider"></li>
            <li className="center searchIngredients">
              Query Ingredients
            <ul className="collection center">
                {this.renderQueryIngredients()}
              </ul>
            </li>
            <li className="divider"></li>
            <li className="center addIngredients">Add Ingredients</li>
            <ul className="collapsible" data-collapsible="expandable">
              {this.renderCategories()}
            </ul>
          </ul>
        </header>

        <div id="myPantryModalResultPage" className="modal">
          <div className="modal-content center">
            <div className="row">
              <div className="col s6 offset-s3">
                <h2 className="red-text text-darken-1">Warning</h2>
              </div>
            </div>
            <hr />
            <div className="row">
              <h5>Please back to home page and login to check your Pantry</h5>
            </div>
          </div>
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
        </div>

      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories.allCategories,
    ingredients: state.ingredients.allIngredients,
    queryIngredients: state.ingredients.queryIngredients,
    sortKey: state.ingredients.sortKey,
    currentUser: state.users.currentUser
  }
}

export default withRouter(connect(mapStateToProps, { getCategories, removeQueryIngredient, addQueryIngredients, getSortedRecipesWithIngredients, getUser, getIngredients })(SideNav));