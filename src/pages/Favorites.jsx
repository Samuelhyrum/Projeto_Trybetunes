import React, { Component } from 'react';
import Header from '../components/Header';

class Favorites extends Component {
  render() {
    return (
      <main>
        <Header />
        <div data-testid="page-favorites" value="page-favorites">
          Favorites
        </div>
      </main>
    );
  }
}

export default Favorites;
