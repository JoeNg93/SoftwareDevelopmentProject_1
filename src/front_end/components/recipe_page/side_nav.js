import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SideNav extends Component {
    render() {
        return (
            <header>
                <nav className="top-nav teal hide-on-large-only">
                    <div className="container">
                        <div className="nav-wrapper">
                            <a href="/" className="brand-logo">
                                <span className="topNavBrandNameVar">var</span>
                                <span className="topNavBrandNameIngredient">Ingredient</span>
                            </a>
                            <a href="#" data-activates="nav-mobile" className="button-collapse"><i
                                className="material-icons" id="smallNavMenuRecipe">menu</i></a>
                        </div>
                    </div>
                </nav>
                <div className="container">
                    <a href="#" data-activates="nav-mobile" className="button-collapse side-nav full hide-on-large-only"><i
                        className="material-icons">menu</i></a>
                </div>
                <ul id="nav-mobile" className="side-nav fixed">
                    <li className="logo fill"><a id="logo-container" href="homePage.html"><img src="http://res.cloudinary.com/rwbarker/image/upload/c_scale,h_300,w_300/v1492503178/logo_final_bxjwsl.png" /></a></li>
                    <li className="bold"><Link to="/" className="waves-effect waves-orange navlinks">Home</Link></li>
                    <li className="bold"><a href="#!" className="waves-effect waves-orange navlinks">My Pantry</a></li>
                </ul>
            </header>
        );
    }
}

export default SideNav;