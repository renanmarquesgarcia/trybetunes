import { useState } from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import { AlbumType } from '../types';
import AlbumCard from '../components/AlbumCard';

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
    <>
      { loading
        ? <Loading />
        : (
          <form>
            <input
              type="text"
              data-testid="search-artist-input"
              value={ artist }
              onChange={ ({ target }) => setArtist(target.value) }
            />
            <button
              data-testid="search-artist-button"
              disabled={ isDisabled }
              onClick={ (e) => handleSubmit(e) }
            >
              Procurar
            </button>
          </form>
        )}
      {
        Array.isArray(albums) && albums.length === 0
        && <h1>Nenhum álbum foi encontrado</h1>
      }
      { Array.isArray(albums) && albums.length > 0
        && (
          <section>
            <h2>{`Resultado de álbuns de: ${albums[0].artistName}`}</h2>
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
        )}
    </>
  );
}

export default Search;
