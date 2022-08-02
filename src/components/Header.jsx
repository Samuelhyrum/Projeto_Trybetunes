import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends Component {
    state = {
      user: {},
      loading: true,
    };

    async componentDidMount() {
      this.setState({
        loading: true,
        user: await getUser(),
      }, () => {
        this.setState({
          loading: false,
        });
      });
    }

    render() {
      const { user, loading } = this.state;
      const { name } = user;
      return (
        <header data-testid="header-component">
          <h1> Welcome to the Trybetunes</h1>
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <br />
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <br />
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
          <div>
            {loading
              ? <Loading />
              : <p data-testid="header-user-name">{ `Bem-vindo Sr.${name}`}</p>}
          </div>
        </header>
      );
    }
}

export default Header;
