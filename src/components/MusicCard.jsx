import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../pages/Loading';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    loading: false,
  };

  onInputChange = async (event) => {
    const { target } = event;
    const { id, checked } = target;
    const { trackList } = this.props;
    if (checked === true) {
      this.setState({ loading: true });
      await addSong(trackList.filter((el) => el.trackId === Number(id)));
      this.setState({ loading: false });
    } else {
      this.setState({ loading: true });
      await removeSong(trackList.filter((e) => e.trackId === Number(id)));
      this.setState({ loading: false });
    }
  };

  render() {
    const { previewUrl, name, id } = this.props;
    const { loading } = this.state;
    return (
      <div>
        { loading && <Loading /> }
        <div>
          <h3>
            { name }
          </h3>
          <label htmlFor="name">
            <input
              name="checked"
              type="checkbox"
              data-testid={ `checkbox-music-${id}` }
              id={ id }
              onChange={ this.onInputChange }
            />
          </label>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
        </div>
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
