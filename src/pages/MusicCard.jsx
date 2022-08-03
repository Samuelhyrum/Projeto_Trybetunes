import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
    state = {
      favoritesSongs: [],
      loading: false,
      favorite: false,
    }

    myFavoriteSong = ({ target }) => {
      const { name, checked } = target;
      const { music } = this.props;
      this.setState({
        [name]: checked,
        loading: true,
      }, async () => {
        this.setState({
          favoritesSongs: await addSong(music),
          loading: false,
        });
      });
    }

    render() {
      const { music } = this.props;
      const { trackName, previewUrl, trackId } = music;
      const { loading, favorite, favoritesSongs } = this.state;

      return (
        <div>

          <p>{`Música: ${trackName}`}</p>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
          <p>{favoritesSongs}</p>

          <label
            htmlFor="checkbox"
          >
            Favorita
            <input
              type="checkbox"
              data-testid={ `checkbox-music-${trackId}` }
              name="favorite"
              onChange={ this.myFavoriteSong }
              checked={ favorite }
            />
            {loading && <Loading />}
          </label>
        </div>
      );
    }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
};

export default MusicCard;
