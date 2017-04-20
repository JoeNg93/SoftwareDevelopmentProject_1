import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class SignupModal extends Component {
  render() {
    return (
      <div id="signupModal" className="modal">
        <div className="modal-content">
            <div className="row">
                <div className="col s6 offset-s3">
                    <h3>Sign-up</h3>
                </div>
            </div>
            <hr/>
            <div className="row">
                <div className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="email2" type="email" className="validate"/>
                            <label htmlFor="email" data-error="Please use a valid email" data-success="">Email</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s12">
                            <input id="password2" type="password" className="validate"/>
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s12">
                            <input id="passwordValidate" type="password" className="validate"/>
                            <label htmlFor="password">Confirm Password</label>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div className="modal-footer" id="signupModalFooter">
            <div className="row">
                <div className="col s12">
                    <div className="col s4 offset-s4">
                        <a href="#!" className="modal-action modal-close waves-effect waves-default btn"
                           id="submit2">Submit</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }
};

export default SignupModal;

