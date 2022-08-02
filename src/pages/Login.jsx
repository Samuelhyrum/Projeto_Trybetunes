import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
state = {
  buttonDisable: true,
  user: '',
  loading: false,
};

handleChange = ({ target }) => {
  const { name, value } = target;
  this.setState({
    [name]: value,
  }, () => {
    const { user } = this.state;
    const minLength = 3;
    if (user.length >= minLength) {
      this.setState({ buttonDisable: false });
    } else { this.setState({ buttonDisable: true }); }
  });
};

initInput = async () => {
  const { history } = this.props;
  this.setState({ loading: true });
  const { user } = this.state;
  await createUser({ name: user });
  history.push('/search');
}

render() {
  const { buttonDisable, user, loading } = this.state;

  return (
    <div data-testid="page-login" value="page-login">
      <h1>
        Login
      </h1>
      <form>
        <input
          data-testid="login-name-input"
          type="text"
          name="user"
          value={ user }
          onChange={ this.handleChange }
        />
        <br />
        <button
          data-testid="login-submit-button"
          name="Entrar"
          type="button"
          disabled={ buttonDisable }
          onClick={ this.initInput }
        >
          Entrar

        </button>
        {loading && <Loading />}

      </form>
    </div>

  );
}
}
Login.propTypes = {
  history: PropTypes.objectOf({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
