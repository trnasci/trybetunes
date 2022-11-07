import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';
import './Header.css';
import logoTrn from '../pages/images/Sem título.png';

class Header extends React.Component {
  state = {
    username: '',
    loading: true,
  };

  componentDidMount() {
    this.getUserName();
  }

  getUserName = async () => {
    const { name } = await getUser();
    this.setState({ loading: false,
      username: name,
    });
  };

  render() {
    const { username, loading } = this.state;
    return (
      <header data-testid="header-component" className="header-component">
        {loading ? <Loading /> : (
          <div data-testid="header-user-name" className="header-user-name">
            <img src={ logoTrn } alt="logoTRN" />
            <h3>{ username }</h3>
          </div>)}
        <nav>
          <Link data-testid="link-to-search" to="/search">Procura</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
          <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
        </nav>
      </header>

    );
  }
}

export default Header;
