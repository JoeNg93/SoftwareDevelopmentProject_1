import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SideNav extends Component {
  render() {
    return (
        <header>
        <nav className="top-nav teal">
            <div className="container">
                <div className="nav-wrapper">
                    <a href="homePage.html" className="brand-logo hide-on-large-only">varIngredient</a>
                    <a href="#" data-activates="nav-mobile" className="button-collapse"><i
                            className="material-icons">menu</i></a>
                </div>
            </div>
        </nav>
        <div className="container">
            <a href="#" data-activates="nav-mobile" className="button-collapse side-nav full hide-on-med-and-up"><i
                    className="material-icons">menu</i></a>
        </div>
        <ul id="nav-mobile" className="side-nav fixed">
            <li className="logo fill"><a id="logo-container" href="homePage.html"><img src="../../images/varIngredient.jpg"/></a></li>
            <li className="divider"></li>
            <li className="bold"><Link to="/" className="waves-effect waves-teal navlinks">Home</Link></li>
            <li className="bold"><a href="#!" className="waves-effect waves-teal navlinks">My Pantry</a></li>
            <li className="divider"></li>
        </ul>
    </header>
    );
  }
}

export default SideNav;