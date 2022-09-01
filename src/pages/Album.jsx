import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    trackList: [],
    albumDescription: {},
    loading: false,
  };

  componentDidMount() {
    this.getAlbum();
  }

  getAlbum = async () => {
    const { match: { params: { id } } } = this.props;
    this.setState({ loading: true });
    const tracks = await getMusics(id);
    this.setState({ trackList: [...tracks.slice(1)],
      albumDescription: tracks.shift(),
      loading: false });
  };

  render() {
    const { trackList, loading, albumDescription } = this.state;
    console.log(albumDescription);
    console.log(trackList);

    return (
      <div data-testid="page-album">
        <Header />
        { loading ? <Loading /> : (
          <div>
            <img
              src={ albumDescription.artworkUrl100 }
              alt={ albumDescription.collectionName }
            />
            <div data-testid="artist-name">
              {albumDescription.artistName}
            </div>
            <div data-testid="album-name">
              {albumDescription.collectionName}
            </div>
            <div>
              {trackList.map((item) => (<MusicCard
                previewUrl={ item.previewUrl }
                key={ item.trackId }
                name={ item.trackName }
              />))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.object,
  params: PropTypes.object,
  id: PropTypes.string,
}.isRequired;

export default Album;
