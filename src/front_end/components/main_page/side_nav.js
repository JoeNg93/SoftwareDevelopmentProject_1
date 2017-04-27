import React, { Component } from 'react';
import { logout, getUser } from './../../actions/index';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class SideNav extends Component {

  renderUserPermissionButtons() {
    if (this.props.currentUser) {
      return (
        <span>
          <li><a className="waves-effect waves-light btn teal" href="#!" onClick={this.onClickLogout.bind(this)}><i className="material-icons left">thumb_down</i>Logout</a>
          </li>
          <li><Link className="waves-effect waves-light btn teal" to={`/user/${this.props.currentUser._id}`}><i
            className="material-icons left">shopping_basket</i>My Pantry</Link></li>
          {this.props.currentUser.isAdmin && (
            <li><a className="waves-effect waves-light btn teal" href="/admin"><i
              className="material-icons left">assignment_ind</i>Admin Panel</a></li>
          )}
        </span>
      );
    } else {
      return (
        <span>
          <li><a className="waves-effect waves-light btn teal" href="#loginModal"><i className="material-icons left">perm_identity</i>Login</a>
          </li>
          <li><a className="waves-effect waves-light btn teal" href="/auth/facebook"><i className="material-icons left">perm_identity</i>Facebook Login</a>
          </li>
          <li><a className="waves-effect waves-light btn teal" href="#signupModal"><i
            className="material-icons left">subtitles</i>Sign-up</a></li>
        </span>
      );
    }
  }

  onClickLogout() {
    this.props.logout().then(() => this.props.getUser());
  }

  render() {
    return (
      <div className="sideNav">
        <ul id="mobile-demo" className="side-nav">
          <li><a href="#topRecipes">Top Recipes</a></li>
          <li><a href="#reviews">Reviews</a></li>
          <li className="hide-on-small-only"><a href="#contact">Contact</a></li>
          {this.renderUserPermissionButtons()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.users.currentUser
  };
}

export default connect(mapStateToProps, { logout, getUser })(SideNav);