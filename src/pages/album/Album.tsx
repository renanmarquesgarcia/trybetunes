import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AlbumType, SongType } from '../../types';
import getMusics from '../../services/musicsAPI';
import Loading from '../../components/loading/Loading';
import MusicCard from '../../components/musicCard/MusicCard';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import './Album.css';

function Album() {
  const [musics, setMusics] = useState<SongType[] | null>(null);
  const [album, setAlbum] = useState<AlbumType | null>(null);
  const [favorites, setFavorites] = useState<SongType[]>();

  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    async function fetchMusics() {
      if (id) {
        const favSongs = await getFavoriteSongs();
        setFavorites(favSongs);
        const results = await getMusics(id);
        const songs = results.slice(1) as unknown as SongType[];
        setAlbum(results[0]);
        setMusics(songs);
      }
    }

    fetchMusics();
    setLoading(false);
  }, []);

  return (
    <section className="album__page__container">
      { loading && <Loading /> }
      { Array.isArray(musics) && (
        <>
          <div className="album__info">
            <img
              src={ album!.artworkUrl100 }
              alt="capa do albúm"
              className="album__cover__image"
            />
            <div className="album__name__artist__name">
              <h3 data-testid="album-name">{album!.collectionName}</h3>
              <span data-testid="artist-name">{album!.artistName}</span>
            </div>
          </div>
          <section className="music__card__container">
            { musics.map(({ trackId, trackName, previewUrl }) => (
              <MusicCard
                key={ trackId }
                trackName={ trackName }
                previewUrl={ previewUrl }
                trackId={ trackId }
                favorite={ favorites!.some((fav) => fav.trackId === trackId) }
              />
            ))}
          </section>
        </>
      )}
    </section>
  );
}

export default Album;
