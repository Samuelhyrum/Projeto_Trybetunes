import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends Component {
  state = {
    musics: [],
  }

  async componentDidMount() {
    const {
      match: { params: { id } },
    } = this.props;
    this.setState({ musics: await getMusics(id) });
  }

  render() {
    const { musics } = this.state;
    let bandAlbum = '';
    if (musics.length > 0) {
      bandAlbum = (
        <div>
          <p data-testid="artist-name">
            {`${musics[0].artistName}`}
          </p>
          <p data-testid="album-name">
            {`${musics[0].collectionName}`}
          </p>
        </div>);
    } else if (musics.length === 0) {
      bandAlbum = (
        <p>Esse álbum não possui musicas!</p>
      );
    }
    return (
      <main>
        <Header />
        <div data-testid="page-album" value="page-album">
          {bandAlbum}
          {musics.map((music) => (
            <div
              key={ music.collectionId }
            >
              {music.previewUrl
                && <MusicCard
                  trackName={ music.trackName }
                  previewUrl={ music.previewUrl }
                />}
            </div>
          ))}
        </div>
      </main>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
