import React from 'react';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  state = {
    artist: '',
    searchButton: true,
    albums: [],
    artistSearch: '',
    searchState: true,
    loading: false,
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

  getAlbumFilter = async () => {
    const { artist } = this.state;
    this.setState({ artistSearch: artist, loading: true });
    const result = await searchAlbumsAPI(artist);
    this.setState({ albums: [...result], searchState: false }, () => {
      this.setState({ artist: '', loading: false });
    });
  };

  render() {
    const { artist, searchButton, albums,
      artistSearch, loading, searchState } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? <Loading /> : (
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
              onClick={ this.getAlbumFilter }
            >
              Pesquisar
            </button>
          </form>)}
        {searchState ? <div /> : (
          <section>
            <h2>
              { albums.length === 0 ? 'Nenhum álbum foi encontrado'
                : `Resultado de álbuns de: ${artistSearch}`}
            </h2>
            <div>
              { albums.map((element) => (<AlbumCard
                src={ element.artworkUrl100 }
                key={ element.collectionId }
                id={ element.collectionId }
                name={ element.artistName }
                albumname={ element.collectionName }
              />)) }
            </div>
          </section>
        )}

      </div>
    );
  }
}

export default Search;
