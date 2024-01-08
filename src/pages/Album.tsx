import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AlbumType, SongType } from '../types';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

function Album() {
  const [musics, setMusics] = useState<[AlbumType, ...SongType[]]>();
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    async function fetchMusics() {
      if (id) {
        const results = await getMusics(id);
        setMusics(results);
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
            <img src={ musics![0].artworkUrl100 } alt="capa do albúm" />
            <h3 data-testid="album-name">{musics![0].collectionName}</h3>
            <span data-testid="artist-name">{musics![0].artistName}</span>
          </div>
          <div>
            { musics?.slice(1).map(({ trackId, trackName, previewUrl }) => (
              <MusicCard
                key={ trackId }
                trackName={ trackName }
                previewUrl={ previewUrl }
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default Album;
