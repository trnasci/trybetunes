import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumCard extends React.Component {
  render() {
    const { src, name, albumname, id } = this.props;
    return (
      <Link data-testid={ `link-to-album-${id}` } to={ `/album/${id}` }>
        <div>
          <img src={ src } alt={ name } />
          <p>{ albumname }</p>
          <p>{ name }</p>
        </div>
      </Link>
    );
  }
}

AlbumCard.propTypes = {
  src: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  albumname: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default AlbumCard;
