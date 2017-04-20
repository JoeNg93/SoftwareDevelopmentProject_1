import React, { Component } from 'react';

class NavBar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper">

            <a href="#home" className="brand-logo">Logo</a>
            <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons" id="homePageSmallNav">menu</i></a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><a href="#topRecipes">Top Recipes</a></li>
              <li><a href="#reviews">Reviews</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a className="waves-effect waves-light btn teal" href="#loginModal"><i className="material-icons left">perm_identity</i>Login</a>
              </li>
              <li><a className="waves-effect waves-light btn teal" href="#signupModal"><i
                className="material-icons left">subtitles</i>Sign-up</a></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;