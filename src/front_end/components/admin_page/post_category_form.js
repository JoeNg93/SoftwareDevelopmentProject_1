import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { encodeInput, renderField } from './../../utils/index';
import { postCategory } from './../../actions/index';

class PostCategoryForm extends Component {
  componentDidMount() {
    $('.modal').modal();
  }

  onClickSubmitCategory(props) {
    this.props.postCategory(encodeInput(props).name).then((response) => {
      $('#submitCategoryModal').modal('open');
      setTimeout(() => {
        $('#submitCategoryModal').modal('close');
        this.props.reset();
      }, 1000);
    });
  }

  render() {
    const { handleSubmit, submitting } = this.props;

    return (

      <div className="container">
        <div className="row">
          <div className="col s12">
            <h1 className="center">Add Category</h1>
          </div>
        </div>

        <div className="row">
          <form className="col s12" onSubmit={handleSubmit(this.onClickSubmitCategory.bind(this))}>
            <div className="row">
              <div className="input-field col s12">
                <Field name="name" type="text" label="Category Name" component={renderField} />
              </div>
            </div>

            <div className="row">
              <div className="col s6 offset-s3">
                <button id="adminSubmitItem" type="submit" className="waves-effect waves-default btn btn-primary" disabled={submitting}>Submit</button>
              </div>
            </div>
          </form>
        </div>

        <div id="submitCategoryModal" className="modal">
          <div className="modal-content center">
            <div className="row">
              <div className="col s6 offset-s3">
                <h3>Success</h3>
              </div>
            </div>
            <hr />
            <div className="row">
              <i className="material-icons large">done</i>
              <h5>Submit category successfully</h5>
            </div>
          </div>
        </div>

      </div>




    );
  } // end render()
} // end PostCategoryForm

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = "This field is required";
  }
  return errors;
};

PostCategoryForm = reduxForm({
  form: 'PostCategoryForm',
  validate
})(PostCategoryForm);

export default connect(null, { postCategory })(PostCategoryForm);