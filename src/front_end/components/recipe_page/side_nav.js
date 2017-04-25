import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

class SideNav extends Component {

  onClickMyPantry(e) {
    if (this.props.currentUser) {
      this.props.history.push(`/user/${this.props.currentUser._id}`);
      return;
    } else {
      $('#myPantryModalRecipePage').modal('open');
    }
  }

  render() {
    return (
      <div>

        <header>
          <nav className="top-nav teal hide-on-large-only">
            <div className="container">
              <div className="nav-wrapper">
                <Link to="/" className="brand-logo">
                  <span className="topNavBrandNameVar">var</span>
                  <span className="topNavBrandNameIngredient">Ingredient</span>
                </Link>
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
            <li className="logo fill"><Link id="logo-container" to="/"><img src="http://res.cloudinary.com/rwbarker/image/upload/c_scale,h_300,w_300/v1492503178/logo_final_bxjwsl.png" /></Link></li>
            <li className="bold"><Link to="/" className="waves-effect waves-orange navlinks">Home</Link></li>
            <li className="bold"><a href="#!" className="waves-effect waves-orange navlinks" onClick={this.onClickMyPantry.bind(this)}>My Pantry</a></li>
          </ul>
        </header>

        <div id="myPantryModalRecipePage" className="modal">
          <div className="modal-content center">
            <div className="row">
              <div className="col s6 offset-s3">
                <h3>Warning</h3>
              </div>
            </div>
            <hr />
            <div className="row">
              <p>Please back to home page and login to check your Pantry</p>
            </div>
          </div>
          <div className="modal-footer center">
            <div className="row">
              <div className="col s6 offset-s3">
                <a href="/" class="modal-action modal-close waves-effect waves-default btn">Back To Homepage</a>
              </div>
            </div>
          </div>
        </div>

      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.users.currentUser
  };
}

export default withRouter(connect(mapStateToProps)(SideNav));