import React, { Component } from 'react';

import SideNav from './side_nav';

class UserPage extends Component {
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
      </div>
    );
  }
}

export default UserPage;