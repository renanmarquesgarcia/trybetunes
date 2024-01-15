import { useEffect, useState } from 'react';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import { SongType } from '../../types';
import Loading from '../../components/loading/Loading';
import MusicCard from '../../components/musicCard/MusicCard';
import './Favorites.css';

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
    <section className="favorites__page__container">
      <div className="favorites__title__container">
        <h1 className="favorites__title">Músicas Favoritas</h1>
      </div>
      { loading
        ? <Loading />
        : (
          <section className="favorites__music__card_container">
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
        )}
    </section>
  );
}

export default Favorites;
