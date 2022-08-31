import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    artist: '',
    searchButton: true,
  };

  onInputChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      const minLength = 2;
      if (value.length >= minLength) {
        this.setState({ searchButton: false });
      } else {
        this.setState({ searchButton: true });
      }
    });
  };

  render() {
    const { artist, searchButton } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            name="artist"
            type="text"
            data-testid="search-artist-input"
            value={ artist }
            onChange={ this.onInputChange }
          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ searchButton }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
