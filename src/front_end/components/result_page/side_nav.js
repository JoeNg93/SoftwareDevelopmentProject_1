import React, { Component } from 'react';
import { getCategories, removeQueryIngredient, addQueryIngredients, getSortedRecipesWithIngredients } from './../../actions/index';
import { connect } from 'react-redux';

class SideNav extends Component {
  componentWillMount() {
    this.props.getCategories();
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
            <input type="checkbox" className="filled-in" id={ingredient._id} onClick={this.onClickOnCheckbox.bind(this)}/>
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
            {ingredientName}<a href="#!" className="secondary-content" onClick={this.onClickRemoveQueryIngredient.bind(this)}><i className="material-icons"  id={ingredientName}>delete</i></a>
          </div>
        </li>
      );
    });
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
      <header>
        <nav className="top-nav teal hide-on-large-only">
          <div className="container">
            <div className="nav-wrapper">
              <a href="/" className="brand-logo">
                <span className="topNavBrandNameVar">var</span>
                <span className="topNavBrandNameIngredient">Ingredient</span>
              </a>
              <a href="#" data-activates="nav-mobile" className="button-collapse"><i
                className="material-icons" id="smallNavMenuSearch">menu</i></a>
            </div>
          </div>
        </nav>


        <div className="container">
          <a href="#" data-activates="nav-mobile" className="button-collapse side-nav full hide-on-large-only"><i
            className="material-icons">menu</i></a>
        </div>
        <ul id="nav-mobile" className="side-nav fixed">
          <li className="logo fill"><a id="logo-container" href="/"><img src="http://res.cloudinary.com/rwbarker/image/upload/c_scale,h_300,w_300/v1492503178/logo_final_bxjwsl.png" /></a></li>
          <li className="center"><a href="/" className="waves-effect waves-orange navlinks home">Home</a></li>
          <li className="center"><a href="#!" className="waves-effect waves-orange navlinks myPantry">My Pantry</a></li>
          <li className="center"><a href="#!" className="waves-effect waves-orange navlinks updateSearch" onClick={this.onClickSearchAgain.bind(this)}><i className="material-icons">search</i></a></li>
          <li className="divider"></li>
          <li className="center searchIngredients">
            My Ingredients
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
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories.allCategories,
    ingredients: state.ingredients.allIngredients,
    queryIngredients: state.ingredients.queryIngredients,
    sortKey: state.ingredients.sortKey
  }
}

export default connect(mapStateToProps, { getCategories, removeQueryIngredient, addQueryIngredients, getSortedRecipesWithIngredients })(SideNav);