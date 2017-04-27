import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from './../../actions/index';
import { getUser } from './../../actions/index';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  componentWillMount() {
    this.props.getUser();
  }

  onClickLogout() {
    this.props.logout().then(() => this.props.getUser());
  }

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

  render() {
    return (
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper">

            <a href="#home" className="brand-logo"><img src="http://res.cloudinary.com/rwbarker/image/upload/c_scale,h_64,w_64/v1492540669/logo_final_secondary_pages_tlz4sw.png" /></a>
            <a href="#home" className="hide-on-med-and-down" id="brandName"><h4><span id="brandNameVar">var</span><span
              id="brandNameIngredient">Ingredient</span></h4></a>
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
    currentUser: state.users.currentUser
  };
}

export default connect(mapStateToProps, { logout, getUser })(NavBar);