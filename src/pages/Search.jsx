import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    buttonDisable: true,
    band: '',
  };

  handleChangeBand = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { band } = this.state;
      const minLength = 2;
      if (band.length >= minLength) {
        this.setState({ buttonDisable: false });
      } else { this.setState({ buttonDisable: true }); }
    });
  };

  render() {
    const { buttonDisable, band } = this.state;
    return (
      <main>
        <Header />
        <div data-testid="page-search" value="page-search">
          <form>
            <input
              data-testid="search-artist-input"
              type="text"
              name="band"
              value={ band }
              placeholder="Digite o nome da banda"
              onChange={ this.handleChangeBand }
            />
            <br />
            <button
              data-testid="search-artist-button"
              name="Pesquisar"
              value="Pesquisar"
              type="button"
              disabled={ buttonDisable }
            >
              Pesquisar
            </button>
          </form>
        </div>
      </main>
    );
  }
}

export default Search;
