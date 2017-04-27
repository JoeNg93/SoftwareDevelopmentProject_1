import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers } from './../../actions/index';

class UserInfo extends Component {
  componentWillMount() {
    this.props.getUsers();
  }

  renderUsers() {
    return this.props.users.map((user) => {
      return (
        <tr key={ user._id }>
          <td>{ user.email ? user.email : user.facebook_id }</td>
          <td>{ user.favoriteRecipes.length }</td>
          <td>{ user.likedRecipes.length }</td>
          <td>{ user.dislikedRecipes.length }</td>
        </tr>
      );
    });
  }

  render() {
    if (this.props.users) {
      return (
        <div className="container">
          <div className="col s12">
            <div className="row">
              <div className="center">
                <h1>Users</h1>
              </div>
              <div className="col s12">
                <table className="responsive-table highlight">
                  <thead>
                    <tr>
                      <th>Email/FaceBookID</th>
                      <th># of Favorite Recipes</th>
                      <th># of Liked Recipes</th>
                      <th># of Disliked Recipes</th>
                    </tr>
                  </thead>

                  <tbody>
                    { this.renderUsers() }
                  </tbody>

                </table>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  } // end render()
} // end UserInfo

function mapStateToProps(state) {
  return {
    users: state.users.allUsers
  };
}

export default connect(mapStateToProps, { getUsers })(UserInfo);