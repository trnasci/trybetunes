import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  state = {
    name: '',
    loginButtonDisable: true,
  };

  onInputChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      const minLength = 3;
      if (value.length >= minLength) {
        this.setState({ loginButtonDisable: false });
      } else {
        this.setState({ loginButtonDisable: true });
      }
    });
  };

  render() {
    const { name, loginButtonDisable } = this.state;
    return (
      <div>
        <Switch>
          <Route exact path="/">
            <Login
              name={ name }
              onInputChange={ this.onInputChange }
              loginButtonDisable={ loginButtonDisable }
            />
          </Route>
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </div>
    );
  }
}

export default App;
