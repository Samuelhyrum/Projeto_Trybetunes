import React, { Component } from 'react';
import Header from '../components/Header';

class Album extends Component {
  render() {
    return (
      <main>
        <Header />
        <div data-testid="page-album" value="page-album">
          Album
        </div>
      </main>
    );
  }
}

export default Album;
