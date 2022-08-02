import React, { Component } from 'react';
import Header from '../components/Header';

class Profile extends Component {
  render() {
    return (
      <main>
        <Header />
        <div data-testid="page-profile" value="page-profile">
          Profile
        </div>
      </main>
    );
  }
}

export default Profile;
