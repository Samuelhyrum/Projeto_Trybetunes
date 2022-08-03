import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends Component {
  state = {
    buttonDisable: true,
    band: '',
    artists: '',
    albums: [],
    loading: false,
  };

  handleChangeBand = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { band } = this.state;
      console.log(band);
      const minLength = 2;
      if (band.length >= minLength) {
        this.setState({ buttonDisable: false });
      } else { this.setState({ buttonDisable: true }); }
    });
  };

 searchBand = async () => {
   const { band } = this.state;
   this.setState({
     artists: band,
     loading: true,
     albums: await searchAlbumsAPI(band) }, () => {
     this.setState({
       loading: false,
       band: '',
     });
   });
 }

 render() {
   const { buttonDisable, band, albums, loading, artists } = this.state;
   let vazia = '';
   if (albums.length > 0) {
     vazia = (
       <p>
         {`Resultado de álbuns de: ${artists}`}
       </p>);
   } else if (albums.length === 0) {
     vazia = (
       <p>Nenhum álbum foi encontrado</p>
     );
   }
   return (
     <div data-testid="page-search" value="page-search">
       <Header />
       <form>
         <div>
           <input
             data-testid="search-artist-input"
             type="text"
             name="band"
             value={ band }
             placeholder="Digite o nome da banda"
             onChange={ this.handleChangeBand }
           />
         </div>
         <button
           data-testid="search-artist-button"
           name="Pesquisar"
           value="Pesquisar"
           type="button"
           disabled={ buttonDisable }
           onClick={ this.searchBand }
         >
           Pesquisar
         </button>
       </form>
       {loading ? <Loading /> : vazia }
       {albums.map((album) => (
         <div
           key={ album.collectionId }
         >
           <Link
             to={ `/album/${album.collectionId}` }
             data-testid={ `link-to-album-${album.collectionId}` }
           >
             <img src={ album.artworkUrl100 } alt="ARTISTA" />
             <p>{album.collectionName}</p>
             <p>{album.artistName}</p>
           </Link>
         </div>
       ))}
     </div>
   );
 }
}

export default Search;
