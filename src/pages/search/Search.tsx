import { useState } from 'react';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import Loading from '../../components/loading/Loading';
import { AlbumType } from '../../types';
import AlbumCard from '../../components/albumCard/AlbumCard';
import errorIcon from '../../images/circle_error_icon.png';
import './Search.css';

type SearchProps = {
  saveAlbums: (content: AlbumType[] | []) => void,
  albums: AlbumType[] | [] | null,
};

function Search({ saveAlbums, albums }: SearchProps) {
  const [artist, setArtist] = useState('');
  const [loading, setLoading] = useState(false);

  const isDisabled = artist.length < 2;

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    const artistAlbums = await searchAlbumsAPI(artist);
    saveAlbums(artistAlbums);
    setArtist('');
    setLoading(false);
  };

  return (
    <section className="search__page__container">
      { loading
        ? <Loading />
        : (
          <form className="search__form__container">
            <input
              type="text"
              data-testid="search-artist-input"
              className="search__artist__input"
              placeholder="DIGITE A SUA PESQUISA"
              value={ artist }
              onChange={ ({ target }) => setArtist(target.value) }
            />
            <button
              data-testid="search-artist-button"
              className="search__btn"
              disabled={ isDisabled }
              onClick={ (e) => handleSubmit(e) }
            >
              PROCURAR
            </button>
          </form>
        )}
      <section className="albums__container">
        {
          Array.isArray(albums) && albums.length === 0
          && (
            <div className="album__not__found__container">
              <img
                src={ errorIcon }
                alt="ícone de erro"
                className="circle__error__icon"
              />
              <h1 className="album__not__found">Nenhum álbum foi encontrado</h1>
            </div>
          )
        }
        { Array.isArray(albums) && albums.length > 0
          && (
            <section>
              <h2
                className="albums__from__text"
              >
                {`Resultado de álbuns de: ${albums[0].artistName}`}
              </h2>
              <section className="albums__list__container">
                {albums?.map((album) => (
                  <AlbumCard
                    key={ album.collectionId }
                    collectionId={ album.collectionId }
                    collectionName={ album.collectionName }
                    collectionImage={ album.artworkUrl100 }
                    artistName={ album.artistName }

                  />
                ))}
              </section>
            </section>
          )}
      </section>
    </section>
  );
}

export default Search;
