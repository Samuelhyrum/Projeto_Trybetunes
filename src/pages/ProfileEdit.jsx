import React, { Component } from 'react';
import Header from '../components/Header';

class ProfileEdit extends Component {
  render() {
    return (
      <main>
        <Header />
        <div data-testid="page-profile-edit" value="page-profile-edit">
          ProfileEdit
        </div>
      </main>
    );
  }
}

export default ProfileEdit;
