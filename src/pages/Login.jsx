import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  state = {
    redirect: false,
    loading: false,
  };

  buttonLoginClick = async () => {
    const { name } = this.props;
    const loginName = name;
    this.setState({ loading: true });
    await createUser({ name: loginName });
    this.setState({ redirect: true });
  };

  render() {
    const { name, onInputChange, loginButtonDisable } = this.props;
    const { redirect, loading } = this.state;

    return (
      redirect ? <Redirect to="/search" /> : (
        <div data-testid="page-login">
          { loading ? <Loading /> : (
            <section>
              <img
                src="src/pages/images/Sem título.png"
                alt="logo"
              />
              <form>
                <label htmlFor="name">
                  <input
                    name="name"
                    type="text"
                    data-testid="login-name-input"
                    value={ name }
                    onChange={ onInputChange }
                  />
                </label>
                <button
                  data-testid="login-submit-button"
                  type="button"
                  disabled={ loginButtonDisable }
                  onClick={ this.buttonLoginClick }
                >
                  Entrar
                </button>
              </form>
            </section>)}
        </div>)
    );
  }
}

Login.propTypes = {
  name: PropTypes.string.isRequired,
  loginButtonDisable: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default Login;
