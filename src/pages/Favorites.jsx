import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from './MusicCard';
import Loading from './Loading';

class Favorites extends Component {
  state= {
    myFavoritesMusics: [],
    loading: false,
  }

  async componentDidMount() {
    this.setState({
      loading: true,
      myFavoritesMusics: await getFavoriteSongs(),
    }, () => {
      this.setState({
        loading: false,
      });
    });
  }

  render() {
    const { myFavoritesMusics, loading } = this.state;
    return (
      <main>
        <Header />
        <div data-testid="page-favorites" value="page-favorites">
          Favorites
          {myFavoritesMusics.map((favorites) => (
            <div
              key={ favorites.trackId }
            >
              {favorites.previewUrl
                && <MusicCard
                  trackName={ favorites.trackName }
                  previewUrl={ favorites.previewUrl }
                  trackId={ favorites.trackId }
                  music={ favorites }
                />}

            </div>
          ))}
          {loading && <Loading />}
        </div>
      </main>
    );
  }
}

export default Favorites;
