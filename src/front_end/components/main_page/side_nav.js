import React, { Component } from 'react';

class SideNav extends Component {
  render() {
    return (
      <div className="sideNav">
        <ul id="mobile-demo" className="side-nav">
          <li><a href="#topRecipes">Top Recipes</a></li>
          <li><a href="#reviews">Reviews</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a className="waves-effect waves-light btn teal" href="#loginModal"><i className="material-icons left">perm_identity</i>Login</a>
          </li>
          <li><a className="waves-effect waves-light btn teal" href="#signupModal"><i className="material-icons left">subtitles</i>Sign-up</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default SideNav;