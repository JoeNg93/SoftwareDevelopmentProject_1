import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkSessionKey } from './../../actions/index';

import NavBar from './nav_bar';
import LoginModal from './login_modal';
import SignupModal from './signup_modal';
import SideNav from './side_nav';
import SearchRecipes from './search_recipes';
import TopRecipes from './top_recipes';
import Reviews from './reviews';
import Contact from './contact';
import Footer from './footer';

class MainPage extends Component {
 componentWillMount()  {
   this.props.checkSessionKey();
 }

  componentDidMount() {
    $('select').material_select();
    $('.button-collapse').sideNav();
    $('.scrollspy').scrollSpy();
    $('.modal').modal();
  }

  render() {
    return (
      <div>
        <NavBar />
        <div id="homePageHtml">
          <LoginModal />
          <SignupModal />
          <SideNav />
          <div id="content">
            <SearchRecipes />
            <TopRecipes />
            <Reviews />
            <Contact />
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { checkSessionKey })(MainPage);