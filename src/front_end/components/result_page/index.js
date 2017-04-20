import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SideNav from './side_nav';
import Result from './result';

class ResultPage extends Component {
  componentDidMount() {
    $('select').material_select();
    $('.button-collapse').sideNav();
    $('.scrollspy').scrollSpy();
    $('.modal').modal();
    $('.collapsible').collapsible();
  }

  render() {
    return (
      <div id="searchResultsHtml">
        <SideNav />
        <Result />
      </div>
    )
  }
}

export default ResultPage;