import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { encodeInput, validate, renderField } from './../../utils/index';
import { postUser } from './../../actions/index';
import { connect } from 'react-redux';

class SignupModal extends Component {
  onClickSubmit(fields) {
    return this.props.postUser(encodeInput(fields)).then((response) => {
      console.log(response);
      if (response.payload.status != 200) {
        throw new SubmissionError({ _error: 'Cannot register, please try again' });
      }
      this.props.reset();
      $('#signupModal').modal('close');
      $('#verificationEmailModal').modal('open');
    });
  }

  render() {
    const { error, handleSubmit, submitting } = this.props;
    return (
      <div>

        <form onSubmit={handleSubmit(this.onClickSubmit.bind(this))}>
          <div id="signupModal" className="modal">
            <div className="modal-content">
              <div className="row">
                <div className="col s6 offset-s3">
                  <h3>Sign-up</h3>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col s12">
                  <div className="row">
                    <div className="input-field col s12">
                      <Field id="email2" type="email" name="email" label="Email" component={renderField} />
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s12">
                      <Field id="password2" type="password" name="password" label="Password" component={renderField} />
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s12">
                      <Field id="passwordValidate" type="password" name="confirmPassword" label="Confirm Password" component={renderField} />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col s12">
                      { error && <span style={{ color: 'red' }}>{error}</span> }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer" id="signupModalFooter">
              <div className="row">
                <div className="col s12">
                  <div className="col s4 offset-s4">
                    <button type="submit" className="modal-action waves-effect waves-default btn"
                      id="submit2" disabled={submitting}>Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        <div id="verificationEmailModal" className="modal">
          <div className="modal-content">
            <div className="row">
              <div className="col s6 offset-s3">
                <h3>NOTICE</h3>
              </div>
            </div>
            <hr />
            <div className="row">
              <p>Register successfully. However, your account won't be actived unless you go to your email to verify it!</p>
              <p>Please go to your email to verify your account</p>
            </div>
          </div>
          <div className="modal-footer">
            <button className="modal-action modal-close waves-effect waves-default btn"
              id="submit2">OK</button>
          </div>
        </div>
      </div>
    );
  }
};

SignupModal = reduxForm({
  form: 'signupForm',
  validate
})(SignupModal);

export default connect(null, { postUser })(SignupModal);

