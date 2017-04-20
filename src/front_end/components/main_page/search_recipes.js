import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getIngredients, addQueryIngredients, clearQueryIngredients } from './../../actions/index';
import { withRouter } from 'react-router-dom';

class SearchRecipes extends Component {
  componentDidMount() {


    this.props.getIngredients().then(() => {
      const ingredientNames = this.props.allIngredients.map(ingredient => ingredient.name);
      var ingredients = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.whitespace,
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        // `states` is an array of state names defined in "The Basics"
        local: ingredientNames
      });

      $('#tags').materialtags({
        freeInput: false,
        typeaheadjs: {
          source: ingredients,
        }
      });
    });
  }

  submitIngredientsQuery(e) {
    let ingredients = $('#tags').materialtags('items');
    this.props.clearQueryIngredients();
    this.props.addQueryIngredients(...ingredients);
    this.props.history.push('/result');
  }

  render() {
    return (
      <section id="home" className="section scrollspy">
        <div className="row">

          <div className="col s6 offset-s3 element">

            <div className="input-field col s12">
              <input type="text" name="tags" id="tags" value="" data-role="materialtags" />
            </div>
            <div className="col s6 offset-s3">
              <button className="waves-effect waves-light btn teal" id="homeSearch" onClick={this.submitIngredientsQuery.bind(this)}>Search</button>
            </div>

          </div>

        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    allIngredients: state.ingredients.allIngredients
  };
}

export default withRouter(connect(mapStateToProps, { getIngredients, addQueryIngredients, clearQueryIngredients })(SearchRecipes));