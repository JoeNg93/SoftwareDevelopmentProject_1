import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getCategories, getIngredients, getUser, postUserIngredient, deleteUserIngredient } from './../../actions/index';
import _ from 'lodash';


class SideNav extends Component {
  componentWillMount() {
    this.props.getUser().then(() => {
      if (!this.props.currentUser) {
        this.props.history.push('/');
        return;
      }
      this.props.getCategories();
      this.props.getIngredients();
    })

  }

  componentDidUpdate() {
    _.map(this.props.currentUser.ingredients, 'name').forEach(ingredientName => this.checkIngredientCheckbox(ingredientName));
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
    console.log('isChecked: ', isChecked);
    const ingredientId = e.target.id;
    const ingredientName = $('#userPageHtml').find(`label[id=${ingredientId}]`).html();
    if (isChecked) {
      this.props.postUserIngredient(this.props.currentUser._id, ingredientId, ingredientName);
    } else {
      this.props.deleteUserIngredient(this.props.currentUser._id, ingredientId, ingredientName);
    }
  }

  renderIngredientsInCategory(categoryName) {
    return this.props.ingredients.filter(ingredient => ingredient.categoryName === categoryName)
      .map((ingredient) => {
        const isChecked = this.props.ingredients.indexOf(ingredient.name) != -1;
        return (
          <span>
            <input type="checkbox" className="filled-in" id={ingredient._id} onClick={this.onClickOnCheckbox.bind(this)} />
            <label htmlFor={ingredient._id} id={ingredient._id}>{ingredient.name}</label>
          </span>
        );
      });
  }

  renderMyIngredients() {
    return _.map(this.props.currentUser.ingredients, 'name').map((ingredientName) => {
      return (
        <li className="collection-item" id={ingredientName}>
          <div>
            {ingredientName}<a href="#!" className="secondary-content" onClick={this.onClickRemoveIngredient.bind(this)}><i className="material-icons" id={ingredientName}>delete</i></a>
          </div>
        </li>
      );
    });
  }

  onClickRemoveIngredient(e) {
    const removeIngredientName = $(e.target).attr('id');
    const removeIngredientId = this.props.currentUser.ingredients.find(ingredient => ingredient.name === removeIngredientName)._id;
    this.uncheckIngredientCheckbox(removeIngredientName);
    this.props.deleteUserIngredient(this.props.currentUser._id, removeIngredientId, removeIngredientName);
  }

  uncheckIngredientCheckbox(ingredientName) {
    const checkboxId = $('#userPageHtml').find(`label:contains(${ingredientName})`).prop('id');
    $('#userPageHtml').find(`input[id=${checkboxId}]`).prop('checked', false);
  }

  checkIngredientCheckbox(ingredientName) {
    const checkboxId = $('#userPageHtml').find(`label:contains(${ingredientName})`).prop('id');
    $('#userPageHtml').find(`input[id=${checkboxId}]`).prop('checked', true);
  }

  // NEED TO FIX
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
            <li className="center"><a href="#!" className="waves-effect waves-orange navlinks updateSearch" onClick={this.onClickSearchAgain.bind(this)}><i className="material-icons">search</i></a></li>
            <li className="divider"></li>
            <li className="center searchIngredients">
              My Ingredients
            <ul className="collection center">
                {this.renderMyIngredients()}
              </ul>
            </li>
            <li className="divider"></li>
            <li className="center addIngredients">Add Ingredients</li>
            <ul className="collapsible" data-collapsible="expandable">
              {this.renderCategories()}
            </ul>
          </ul>
        </header>


      </div>

    );
  }

}

function mapStateToProps(state) {
  return {
    categories: state.categories.allCategories,
    ingredients: state.ingredients.allIngredients,
    currentUser: state.users.currentUser
  };
}

export default withRouter(connect(mapStateToProps, { getCategories, getIngredients, getUser, postUserIngredient, deleteUserIngredient })(SideNav));