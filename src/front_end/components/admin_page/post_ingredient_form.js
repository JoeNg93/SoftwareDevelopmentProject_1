import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { renderField, encodeInput } from './../../utils/index';
import { postIngredient, getCategories } from './../../actions/index';

class PostIngredientForm extends Component {

  componentWillMount() {
    this.props.getCategories();
  }

  componentDidMount() {
    $('.modal').modal();
  }

  componentDidUpdate() {
    $('select').material_select();
  }

  onClickSubmitIngredient(props) {
    const categoryName = $('input.select-dropdown')[0].value;
    const categoryId = this.props.categories.find(category => category.name === categoryName)._id;
    this.props.postIngredient(encodeInput(props).name, categoryId)
      .then(() => {
        $('#submitIngredientModal').modal('open');
        setTimeout(() => {
          $('#submitIngredientModal').modal('close');
          this.props.reset();
        }, 1000);
      });
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    const categories = this.props.categories;
    return (
      <div>

        <div className="container">
          <div className="row">
            <div className="col s12">
              <h1 className="center">Add Ingredient</h1>
            </div>
          </div>

          <div className="row">

            <form className="col s12" onSubmit={handleSubmit(this.onClickSubmitIngredient.bind(this))}>
              <div className="row">
                <div className="input-field col s12">
                  <Field name="name" type="text" label="Ingredient Name" component={renderField} />
                </div>
              </div>

              <div className="row">
                <div className="col s12">
                  <div className="input-field col s12" id="addCategory">
                    <Field name="category" component="select">
                      <option value="" disabled selected>Choose your option</option>
                      {categories.length && categories.map(category => (<option>{category.name}</option>))}
                    </Field>
                    <label htmlFor="addCategory">Category</label>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col s6 offset-s3">
                  <button id="adminSubmitItem" type="submit" className="waves-effect waves-default btn btn-primary" disabled={submitting}>Submit</button>
                </div>
              </div>
            </form>

          </div>
        </div>

        <div id="submitIngredientModal" className="modal">
          <div className="modal-content center">
            <div className="row">
              <div className="col s6 offset-s3">
                <h3>Success</h3>
              </div>
            </div>
            <hr />
            <div className="row">
              <i className="material-icons large">done</i>
              <h5>Submit ingredient successfully</h5>
            </div>
          </div>
        </div>

      </div>

    );
  } // end render()
} // end PostIngredientForm

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'This field is required';
  }
  return errors;
};

PostIngredientForm = reduxForm({
  form: 'PostIngredientForm',
  validate
})(PostIngredientForm);

function mapStateToProps(state) {
  return {
    categories: state.categories.allCategories
  };
}

export default connect(mapStateToProps, { postIngredient, getCategories })(PostIngredientForm);