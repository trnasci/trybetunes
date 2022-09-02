import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state = {
    trackList: [],
    albumDescription: {},
    loading: false,
  };

  componentDidMount() {
    this.getAlbum();
    this.favoriteList();
  }

  getAlbum = async () => {
    const { match: { params: { id } } } = this.props;
    this.setState({ loading: true });
    const tracks = await getMusics(id);
    this.setState({ trackList: [...tracks.filter((e) => e.kind === 'song')],
      albumDescription: tracks[0],
      loading: false });
  };

  favoriteList = async () => {
    this.setState({ loading: true });
    const myFavoriteSongs = await getFavoriteSongs();
    this.setState({ loading: false, myFavoriteList: myFavoriteSongs });
  };

  render() {
    const { trackList, loading, albumDescription, myFavoriteList } = this.state;
    console.log(myFavoriteList);
    return (
      <div data-testid="page-album">
        <Header />
        { loading ? <Loading /> : (
          <div>
            <img
              src={ albumDescription.artworkUrl100 }
              alt={ albumDescription.collectionName }
            />
            <h2 data-testid="album-name">
              {albumDescription.collectionName}
            </h2>
            <h3 data-testid="artist-name">
              {albumDescription.artistName}
            </h3>
            <div>
              {trackList.map((item) => (<MusicCard
                previewUrl={ item.previewUrl }
                key={ item.trackId }
                name={ item.trackName }
                id={ item.trackId }
                trackList={ trackList }
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
