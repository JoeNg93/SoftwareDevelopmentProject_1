import React, { Component } from 'react';

import SideNav from './side_nav';
import FavoriteRecipes from './favorite_recipes';

import { connect } from 'react-redux';
import { getUser } from './../../actions/index';

class UserPage extends Component {
  componentWillMount()  {
    this.props.getUser();
  }

  componentDidMount() {
    $('select').material_select();
    $('.button-collapse').sideNav();
    $('.scrollspy').scrollSpy();
    $('.modal').modal();
    $('.collapsible').collapsible();
  }

  render() {
    return (
      <div id="userPageHtml">
        <SideNav />
        <FavoriteRecipes />
      </div>
    );
  }
}

export default connect(null, { getUser })(UserPage);