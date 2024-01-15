import { useEffect, useState } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import { SongType } from '../types';
import Loading from '../components/loading/Loading';
import MusicCard from '../components/musicCard/MusicCard';

function Favorites() {
  const [favorites, setFavorites] = useState<SongType[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getFavorites() {
      const favSongs = await getFavoriteSongs();
      setFavorites(favSongs);
    }

    getFavorites();
    setLoading(false);
  }, [favorites]);

  return (
    loading
      ? <Loading />
      : (
        <section>
          { favorites?.map(({ trackId, trackName, previewUrl }) => (
            <MusicCard
              key={ trackId }
              trackName={ trackName }
              previewUrl={ previewUrl }
              trackId={ trackId }
              favorite
            />
          ))}
        </section>
      )
  );
}

export default Favorites;
