import React, { Component } from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { login } from './../../actions/index';
import { connect } from 'react-redux';
import validator from 'validator';
import { checkSessionKey } from './../../actions/index';
import { renderField, validate, encodeInput } from './../../utils/index';

class LoginModal extends Component {
  onSubmitLogin(fields) {
    return this.props.login(encodeInput(fields)).then((response) => {
      console.log(response.payload);
      if (response.payload.status != 200) {
        throw new SubmissionError({ _error: 'Wrong username or password' });
      }
      $('#loginModal').modal('close');
      this.props.reset();
      this.props.checkSessionKey();
    });
  }


  render() {
    const { error, handleSubmit, pristine, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmitLogin.bind(this))}>
        <div id="loginModal" className="modal">
          <div className="modal-content">
            <div className="row">
              <div className="col s6 offset-s3">
                <h3>Login</h3>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col s12">
                <div className="row">
                  <div className="input-field col s12">
                    <Field id="email" type="email" component={renderField} name="email" label="Email" />
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <Field component={renderField} id="password" type="password" name="password" label="Password" />
                  </div>
                  <div className="col s12">
                    {error && <strong style={{ color: 'red' }}>{error}</strong>}
                  </div>
                  <label className="forgotPass">
                    <a href='#!'><b>Forgot Password?</b></a>
                  </label>
                  <div className="switch">
                    <p>Remember Me?</p>
                    <label>
                      No
                                <Field component="input" type="checkbox" name="rememberMe" />
                      <span className="lever"></span>
                      Yes
                            </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer" id="loginModalFooter">
            <div className="row">
              <div className="col s12">
                <div className="col s4 offset-s4">
                  <button type="submit" className="modal-action waves-effect waves-default btn"
                    id="submit" disabled={submitting}>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

LoginModal = reduxForm({
  form: 'loginForm',
  validate
})(LoginModal);

export default connect(null, { login, checkSessionKey })(LoginModal);