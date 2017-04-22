import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from './../../actions/index';
import { checkSessionKey } from './../../actions/index';

class NavBar extends Component {
  onClickLogout() {
    this.props.logout().then(() => this.props.checkSessionKey());
  }
  
  renderUserPermissionButtons() {
    if (this.props.isSessionKeyExist) {
      return (
        <span>
          <li><a className="waves-effect waves-light btn teal" href="#!" onClick={this.onClickLogout.bind(this)}><i className="material-icons left">thumb_down</i>Logout</a>
          </li>
          <li><a className="waves-effect waves-light btn teal" href="userPage.html"><i
            className="material-icons left">shopping_basket</i>My Pantry</a></li>
        </span>
      );
    } else {
      return (
        <span>
          <li><a className="waves-effect waves-light btn teal" href="#loginModal"><i className="material-icons left">perm_identity</i>Login</a>
          </li>
          <li><a className="waves-effect waves-light btn teal" href="#signupModal"><i
            className="material-icons left">subtitles</i>Sign-up</a></li>
        </span>
      );
    }
  }

  render() {
    return (
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper">

            <a href="#home" className="brand-logo"><img src="http://res.cloudinary.com/rwbarker/image/upload/c_scale,h_64,w_64/v1492540669/logo_final_secondary_pages_tlz4sw.png" /></a>
            <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons" id="homePageSmallNav">menu</i></a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><a href="#topRecipes">Top Recipes</a></li>
              <li><a href="#reviews">Reviews</a></li>
              <li><a href="#contact">Contact</a></li>
              {this.renderUserPermissionButtons()}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isSessionKeyExist: state.users.isSessionKeyExist
  };
}

export default connect(mapStateToProps, { logout, checkSessionKey })(NavBar);