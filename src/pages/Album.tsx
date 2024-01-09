import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AlbumType, SongType } from '../types';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

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
    <section>
      { loading && <Loading /> }
      { Array.isArray(musics) && (
        <>
          <div>
            <img src={ album!.artworkUrl100 } alt="capa do albúm" />
            <h3 data-testid="album-name">{album!.collectionName}</h3>
            <span data-testid="artist-name">{album!.artistName}</span>
          </div>
          <div>
            { musics.map(({ trackId, trackName, previewUrl }) => (
              <MusicCard
                key={ trackId }
                trackName={ trackName }
                previewUrl={ previewUrl }
                trackId={ trackId }
                favorite={ favorites!.some((fav) => fav.trackId === trackId) }
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default Album;
