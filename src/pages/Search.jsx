import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  render() {
    return (
      <main>
        <Header />
        <div data-testid="page-search" value="page-search" />
      </main>
    );
  }
}

export default Search;
