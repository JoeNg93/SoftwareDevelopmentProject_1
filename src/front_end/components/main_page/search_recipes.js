import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getIngredients, addQueryIngredients, clearQueryIngredients } from './../../actions/index';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import Chips from 'react-chips';

class SearchRecipes extends Component {
  componentWillMount () {
    this.props.getIngredients().then(() => this.setState({ ingredientSuggestions: _.map(this.props.allIngredients, 'name') }));
  }

  constructor() {
    super();
    this.state = {
      queryIngredients: [],
      ingredientSuggestions: []
    };
  }

  submitIngredientsQuery(e) {
    this.props.clearQueryIngredients();
    this.props.addQueryIngredients(...this.state.queryIngredients);
    this.props.history.push('/result');
  }

  onChangeSearchBar(queryIngredients) {
    this.setState({ queryIngredients });
  }

  render() {
    return (
      <section id="home" className="section scrollspy">
        <div className="row">

          <div className="col s11 m6 offset-m3 element">

            <div className="input-field col s12" id="chips">
              <Chips suggestions={this.state.ingredientSuggestions} value={this.state.queryIngredients} onChange={this.onChangeSearchBar.bind(this)} fromSuggestionsOnly placeholder="What ingredients do you have?.."/>
            </div>
            <div className="col s8 offset-s2 m6 offset-m3">
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