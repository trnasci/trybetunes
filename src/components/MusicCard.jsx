import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../pages/Loading';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    loading: false,
    checked: false,
  };

  componentDidMount() {
    this.isFavorite();
  }

  onInputChange = async (event) => {
    const { target } = event;
    const { id } = target;
    const { trackList } = this.props;
    const { checked } = this.state;
    const trackfav = trackList.filter((e) => e.trackId === Number(id));
    if (checked === false) {
      this.setState({ loading: true });
      await addSong(trackfav[0]);
      this.setState({ loading: false, checked: true });
    } else {
      this.setState({ loading: true });
      await removeSong(trackfav[0]);
      this.setState({ loading: false, checked: false });
    }
  };

  isFavorite = () => {
    const { id, myFavoriteSongs } = this.props;
    const favorite = myFavoriteSongs.filter((e) => e.trackId === Number(id));
    if (favorite.length > 0) {
      this.setState({ checked: true });
    } else {
      this.setState({ checked: false });
    }
  };

  render() {
    const { previewUrl, name, id, myFavoriteSongs } = this.props;
    const { loading, checked } = this.state;
    console.log(myFavoriteSongs);
    return (
      <div>
        <div>
          <h3>
            { name }
          </h3>
          <label htmlFor="name">
            <input
              name="favorite"
              type="checkbox"
              data-testid={ `checkbox-music-${id}` }
              id={ id }
              onChange={ this.onInputChange }
              checked={ checked }
            />
          </label>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
        </div>
        <span>{ loading && <Loading /> }</span>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.number,
  trackList: PropTypes.object,
}.isRequired;

export default MusicCard;
