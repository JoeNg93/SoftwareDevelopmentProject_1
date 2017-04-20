import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class LoginModal extends Component {
  render() {
    return (
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
                  <input id="email" type="email" className="validate" />
                  <label htmlFor="email" data-error="Please use a valid email." data-success="">Email</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <input id="password" type="password" className="validate" />
                  <label htmlFor="password">Password</label>
                </div>
                <label className="forgotPass">
                  <a href='#!'><b>Forgot Password?</b></a>
                </label>
                <div className="switch">
                  <p>Remember Me?</p>
                  <label>
                    No
                                <input type="checkbox" />
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
                <a href="#!" className="modal-action modal-close waves-effect waves-default btn"
                  id="submit">Submit</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginModal;