import React, { Component } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'lodash';

import { postRecipe, getIngredients } from './../../actions/index';

import { renderField, encodeInput } from './../../utils/index';

class PostRecipeForm extends Component {

  componentWillMount() {
    this.props.getIngredients().then(() => {
      this.setState({ ingredientSuggestions: _.map(this.props.allIngredients, 'name').reduce((arr, cur) => Object.assign(arr, { [cur]: null }), {}) })
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      ingredientSuggestions: {}
    };
  }

  componentDidUpdate() {
    $('input.autocomplete').autocomplete({
      data: this.state.ingredientSuggestions,
    });
  }

  renderInstructions({ fields, meta: { error } }) {

    return (
      <div>

        <div className="row">
          <div className="col s12">
            <h5 style={{ display: 'inline' }}>Instructions   </h5>
            <button type="button" className="btn-floating waves-effect waves-light indigo darken-2" style={{ marginTop: '-0.5%' }} onClick={() => fields.push()}>
              <i className="material-icons">add</i>
            </button>
          </div>
        </div>

        {fields.map((instruction, index) =>
          <div className="row">
            <div className="input-field col s10">
              <Field name={`${instruction}`} type="text" label={`Instruction #${index + 1}`} component={renderField} />
            </div>
            <div className="input-field col s2">
              <button type="button" className="btn-floating waves-effect waves-light red" onClick={() => fields.remove(index)}>
                <i className="material-icons">remove</i>
              </button>
            </div>
          </div>
        )}

      </div>
    );

  } // end renderInstruction()

  renderIngredients({ fields, meta: { error } }) {
    return (
      <div>

        <div className="row">
          <div className="col s12">
            <h5 style={{ display: 'inline' }}>Ingredients   </h5>
            <button type="button" className="btn-floating waves-effect waves-light indigo darken-2" style={{ marginTop: '-0.5%' }} onClick={() => { fields.push(); this.forceUpdate() }}>
              <i className="material-icons">add</i>
            </button>
          </div>
        </div>

        <div className="row">
          <div className="input-field col s6">
            <h6>Name</h6>
          </div>
          <div className="input-field col s4">
            <h6>Amount</h6>
          </div>
        </div>

        {fields.map((ingredient, index) =>
          <div className="row">
            <div className="input-field col s6">
              <Field name={`${ingredient}.name`} type="text" component={renderField} className="autocomplete" />
            </div>
            <div className="input-field col s4">
              <Field name={`${ingredient}.quantity`} type="text" component={renderField} />
            </div>
            <div className="input-field col s2">
              <button type="button" className="btn-floating waves-effect waves-light red" onClick={() => fields.remove(index)}>
                <i className="material-icons">remove</i>
              </button>
            </div>
          </div>
        )}

      </div>
    );
  }

  renderFileField({ input, label, type, meta: { touched, error } }) {
    return (
      <div>
        <h5>{label}</h5>
        <div className="file-field">
          <div className="btn indigo darken-1">
            <span>Browse</span>
            <input type={type} { ...input } />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" { ...input } />
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    $('.modal').modal();
  }


  onClickSubmitRecipe({ images, ...recipeData }) {
    Object.assign(recipeData, { ingredients: recipeData.ingredients.map(ingredient => Object.assign(ingredient, { _id: this.props.allIngredients.find(e => e.name == ingredient.name)._id })) });
    this.props.postRecipe(images && images[0], recipeData).then(() => {
      $('#submitRecipeModal').modal('open');
      setTimeout(function() {
        this.props.reset();
        $('#submitRecipeModal').modal('close');
      }, 1000);
    });
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <div>

        <div className="container">

          <div className="row">
            <div className="col s12">
              <h1 className="center">Add Recipe</h1>
            </div>
          </div>

          <div className="row">
            <form className="col s12" onSubmit={handleSubmit(this.onClickSubmitRecipe.bind(this))}>

              <div className="row">
                <div className="input-field col s12">
                  <Field name="name" type="text" label="Recipe Name" component={renderField} />
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <Field name="description" component="textarea" id="description" className="materialize-textarea" />
                  <label htmlFor="description">Description</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <Field name="images" type="file" label="Image" component={this.renderFileField} />
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <Field name="cookingTime" type="text" label="Cook Time" component={renderField} />
                </div>
              </div>


              <FieldArray name="instructions" component={this.renderInstructions} />

              <div className="row"></div>

              <FieldArray name="ingredients" component={this.renderIngredients.bind(this)} />

              <div className="row">
                <div className="col s6 offset-s3">
                  <button type="submit" id="adminSubmitItem" className="waves-effect waves-default btn btn-primary" disabled={submitting}>Submit</button>
                </div>
              </div>

            </form>
          </div>
        </div>

        <div id="submitRecipeModal" className="modal">
          <div className="modal-content center">
            <div className="row">
              <div className="col s6 offset-s3">
                <h3>Success</h3>
              </div>
            </div>
            <hr />
            <div className="row">
              <i className="material-icons large">done</i>
              <h5>Submit recipe successfully</h5>
            </div>
          </div>
        </div>
        
      </div>

    );
  }

} // end PostRecipeForm

PostRecipeForm = reduxForm({
  form: 'PostRecipeForm'
})(PostRecipeForm);

function mapStateToProps(state) {
  return {
    allIngredients: state.ingredients.allIngredients
  };
}

export default connect(mapStateToProps, { postRecipe, getIngredients })(PostRecipeForm);