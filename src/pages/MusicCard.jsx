import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
    state = {
      favoritesSongs: [],
      loading: false,

    }

    async componentDidMount() {
      this.setState({
        loading: true,
        favoritesSongs: await getFavoriteSongs() }, () => {
        this.setState({
          loading: false,
        });
      });
    }

    myFavoriteSong = ({ target }) => {
      const { name, checked } = target;
      const { music } = this.props;
      this.setState({
        [name]: checked,
        loading: true,
      }, async () => {
        if (checked) {
          await addSong(music);
        } else await removeSong(music);
        this.setState({
          favoritesSongs: await getFavoriteSongs(),
          loading: false,
        });
      });
    }

    render() {
      const { music } = this.props;
      const { trackName, previewUrl, trackId } = music;
      const { loading, favoritesSongs } = this.state;

      const filtro = favoritesSongs.some((favorite) => (
        favorite.trackId === music.trackId
      ));

      return (
        <div>

          <p>{trackName}</p>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>

          <label
            htmlFor="checkbox"
          >
            Favorita
            <input
              type="checkbox"
              data-testid={ `checkbox-music-${trackId}` }
              name="favorite"
              onChange={ this.myFavoriteSong }
              checked={ filtro }
            />
          </label>
          {loading && <Loading />}
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
