import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SideNav extends Component {

  render() {
    return (
      <header>
        <nav className="top-nav teal hide-on-med-and-up">
          <div className="container">
            <div className="nav-wrapper">
              <Link to="/" className="brand-logo hide-on-large-only"><span className="topNavBrandNameVar">var</span><span className="topNavBrandNameIngredient">Ingredient</span></Link>
              <a href="#" data-activates="nav-mobile" className="button-collapse"><i className="material-icons" id="smallNavMenuAdmin">menu</i></a>
            </div>
          </div>
        </nav>
        <ul id="nav-mobile" className="side-nav fixed">
          <li className="logo fill"><Link id="logo-container" to="/"><img src="http://res.cloudinary.com/rwbarker/image/upload/c_scale,h_300,w_300/v1492503178/logo_final_bxjwsl.png" /></Link></li>
          <li className="divider"></li>
          <li className="bold"><Link to="/" className="btn waves-effect waves-teal navlinks">Home</Link></li>
          <li className="divider"></li>

          <li className="bold center"><Link className="btn" to="/admin/get/users">Users</Link></li>
          <li className="bold center"><Link className="btn" to="/admin/post/recipe">Add Recipe</Link></li>
          <li className="bold center"><Link className="btn" to="/admin/post/ingredient">Add Ingredient</Link></li>
          <li className="bold center"><Link className="btn" to="/admin/post/category">Add Category</Link></li>

        </ul>
      </header>

    );
  } // end render()

} // end SideNav()

export default SideNav;